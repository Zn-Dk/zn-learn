import { tool } from '@langchain/core/tools';
import * as fs from 'node:fs';
import z from 'zod';
import { unknown } from 'zod/v4';

export enum Tools {
  readFile = 'read_file',
}

// #region ---------------------------- TOOLS FUNCTIONS  ----------------------------
const readFile = ({path}: {path: string}) => {
  console.log("🚀 ~ readFile ~ path:", path);
  return fs.readFileSync(path, 'utf-8');
}

const TOOLS_FN_MAP: Record<Tools, (...args: any[]) => any> = {
  [Tools.readFile]: readFile,
}
// #endregion ---------------------------- TOOLS FUNCTIONS  ----------------------------

const errorHandleWrap = async (fn: (...args: any[]) => any, ...args: any[]) => {
  try {
    return await fn(...args)
  } catch (error) {
    return error instanceof Error
    ? error.message
    : String(error);
  }
}

export const runTools = async (toolName: string, ...args: any[]) => {
  if (!(toolName in TOOLS_FN_MAP)) {
    return `工具 ${toolName} 不存在`;
  }
  const fn = TOOLS_FN_MAP[toolName as keyof typeof TOOLS_FN_MAP];
  return await errorHandleWrap(fn, ...args);
}

// #region ---------------------------- TOOLS DEF ----------------------------

export const TOOLS = [
  tool(
    inputs => runTools(Tools.readFile, inputs),
    {
      name: Tools.readFile,
      description: '读取文件，返回全部内容，路径相对于当前工作目录（process.cwd()）',
      schema: z.object({ path: z.string() }),
    }
  )
]
// #endregion ---------------------------- TOOLS DEF ----------------------------
