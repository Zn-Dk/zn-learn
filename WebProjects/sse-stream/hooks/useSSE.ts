import { computed, ref } from 'vue';

// #region ---------------------------- 学习版最小工具实现 ----------------------------
// 以下 5 个函数在原业务代码中来自公共 utils / UI 组件库，
// 这里给出最小实现保证 hook 可独立运行；接入真实项目时可替换为业务版本。

/** JSON.parse 的安全包装：解析失败返回 undefined 而不抛错 */
const jsonParse = <T = any>(text: string): T | undefined => {
  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined;
  }
};

/** 轻提示：学习版用 console 代替，业务侧通常替换为 UI 组件库的 toast */
const message = (type: 'warning' | 'error', text: string) => {
  if (type === 'warning') console.warn(text);
  else console.error(text);
};

/** 是否生产环境：学习版固定为非生产，业务侧替换为实际环境判断（如 import.meta.env.PROD） */
const getIsProd = () => false;

/** 非生产环境请求头 envname 的兜底值 */
const BASELINE_ENV = 'development';

/** 统一错误处理：打印日志并按需 toast */
const handleRequestError = (error: unknown, prefix: string, show: boolean) => {
  const msg = error instanceof Error ? error.message : String(error);
  console.error(`${prefix}: ${msg}`);
  if (show) message('error', `${prefix}: ${msg}`);
};

// #endregion ---------------------------- 学习版最小工具实现 ----------------------------

/**
 * SSE 事件结构，分为两类：
 * - data：正常的 SSE 数据事件，payload 由业务泛型 T 描述
 * - non-sse-error：后端未返回标准 SSE 格式时（如直接返回 JSON 错误），由 hook 内部构造
 */
export type SSEEvent<T = unknown> =
  | { type: 'data'; data: T }
  | { type: 'non-sse-error'; message: string };

export type SSEMethod = 'GET' | 'POST' | 'get' | 'post';

/**
 * useSSE 实例配置：与 SSE 连接绑定的参数。
 *
 * 一旦实例化即固定下来，意味着同一个 useSSE() 实例只为一个接口服务，
 * 后续可多次调用 start() 复用同一通道（变化的只是 data / params）。
 */
export interface SSEOptions {
  /** 接口路径 */
  url: string;
  /** 请求方法 */
  method: SSEMethod;
  /** 错误提示前缀，默认 "请求错误"。最终展示形如 "${errorMessage}: ${err.message}" */
  errorMessage?: string;
  /** 是否在错误时自动 toast，默认 true。abort 永远不会触发 toast */
  isShowError?: boolean;
}

/**
 * 单次 start 调用的可变参数。
 *
 * - POST：JSON.stringify 后放入 body
 * - GET ：encodeURIComponent 后拼到 url 上
 */
export type SSEPayload = Record<string, unknown>;


export function useSSE<T = unknown>(options: SSEOptions) {
  const {
    url, method, errorMessage = '请求错误', isShowError = true,
  } = options;
  const isPost = String(method).toUpperCase() === 'POST';

  // 内部可写状态；对外只暴露 computed 只读包装，避免业务侧误改导致并发锁失效
  const _isActive = ref(false);
  const isActive = computed(() => _isActive.value);
  let controller: AbortController | null = null;

  // 把单条 SSE 消息块（已按 \n\n 切分）解析为 { data }，无效消息返回 null
  const parseEventBlock = (block: string): SSEEvent<T> | null => {
    const dataLines: string[] = [];

    for (const rawLine of block.split('\n')) {
      // 目前只处理 data 字段，后续需要区分 event/id 等类型再完善
      if (!rawLine.startsWith('data:')) continue;
      dataLines.push(rawLine.replace('data: ', ''));
    }

    // 没 data 行视为无效（如纯注释心跳块）
    if (dataLines.length === 0) return null;

    // 多行 data 按规范用 \n 拼接；业务多为 JSON，尝试 parse，失败则原样返回字符串
    const rawData = dataLines.join('\n');
    const parsed = jsonParse(rawData);
    const value = (parsed === undefined ? rawData : parsed) as T;

    return { type: 'data' as const, data: value };
  };

  // 把 params 拼到 url 的 query string（GET 用），保留 url 上已有的参数
  const buildGetUrl = (basePath: string, query: Record<string, unknown>): string => {
    const search = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      search.append(k, String(v));
    });
    const qs = search.toString();
    if (!qs) return basePath;
    return basePath.includes('?') ? `${basePath}&${qs}` : `${basePath}?${qs}`;
  };

  const start = async (
    payload: SSEPayload,
    onMessage: (event: SSEEvent<T>) => void,
  ) => {
    if (_isActive.value) {
      message('warning', '当前 SSE 请求正在进行中，请先结束后再试');
      return;
    }

    const headers: Record<string, string> = {
      Accept: 'text/event-stream',
      rsp_type: 'sse',
    };
    if (!getIsProd()) {
      headers.envname = localStorage.getItem('envName') || BASELINE_ENV;
    }

    const finalUrl = isPost ? url : buildGetUrl(url, payload ?? {});
    controller = new AbortController();
    const fetchInit: RequestInit = {
      method: isPost ? 'POST' : 'GET',
      headers,
      signal: controller.signal,
    };
    if (isPost) {
      headers['Content-Type'] = 'application/json';
      fetchInit.body = JSON.stringify(payload ?? {});
    }

    _isActive.value = true;

    try {
      const response = await fetch(finalUrl, fetchInit);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法获取响应流读取器');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      let hasValidEvent = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const blocks = buffer.split('\n\n');
        buffer = blocks.pop() ?? '';

        for (const block of blocks) {
          const evt = parseEventBlock(block);
          if (evt) {
            hasValidEvent = true;
            onMessage(evt);
          }
        }
      }

      // 流正常结束但从未产生有效 SSE 事件时，尝试把残留 buffer 当业务错误解析
      // 典型场景：后端直接返回 JSON 错误（如 Token 未配置），而非标准 SSE 格式
      const remaining = buffer.trim();
      if (!hasValidEvent && remaining) {
        const parsed = jsonParse<{ message?: string }>(remaining);
        const errMsg: string = parsed?.message || remaining;
        onMessage({ type: 'non-sse-error', message: errMsg });
      }
    } catch (error: any) {
      // abort 是业务主动行为，不算错误：静默吞掉，不 toast、不 rethrow
      if (error?.name === 'AbortError') return;

      handleRequestError(error, errorMessage, isShowError);
      throw error;
    } finally {
      _isActive.value = false;
      controller = null;
    }
  };

  const abort = () => {
    controller?.abort();
  };

  return { start, abort, isActive };
}
