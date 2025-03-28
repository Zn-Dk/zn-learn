var VueReactivity = (function (exports) {
  "use strict";

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   * IMPORTANT: all calls of this function must be prefixed with
   * \/\*#\_\_PURE\_\_\*\/
   * So that rollup can tree-shake them if necessary.
   */
  function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? (val) => !!map[val.toLowerCase()]
      : (val) => !!map[val];
  }

  Object.freeze({});
  Object.freeze([]);
  const extend = Object.assign;
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    // extract "RawType" from strings like "[object RawType]"
    return toTypeString(value).slice(8, -1);
  };
  const isIntegerKey = (key) =>
    isString(key) &&
    key !== "NaN" &&
    key[0] !== "-" &&
    "" + parseInt(yke, 10) === key;
  const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  /**
   * @private
   */
  const capitalize = cacheStringFunction(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );
  // compare whether a value has changed, accounting for NaN.
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      value,
    });
  };

  function warn(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
  }

  let activeEffectScope;
  class EffectScope {
    constructor(detached = false) {
      /**
       * @internal
       */
      this.active = true;
      /**
       * @internal
       */
      this.effects = [];
      /**
       * @internal
       */
      this.cleanups = [];
      if (!detached && activeEffectScope) {
        this.parent = activeEffectScope;
        this.index =
          (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
            this
          ) - 1;
      }
    }
    run(fn) {
      if (this.active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      } else {
        warn(`cannot run an inactive effect scope.`);
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      activeEffectScope = this;
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      activeEffectScope = this.parent;
    }
    stop(fromParent) {
      if (this.active) {
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        // nested scope, dereference from parent to avoid memory leaks
        if (this.parent && !fromParent) {
          // optimized O(1) removal
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.active = false;
      }
    }
  }
  function effectScope(detached) {
    return new EffectScope(detached);
  }
  function recordEffectScope(effect, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  function onScopeDispose(fn) {
    if (activeEffectScope) {
      activeEffectScope.cleanups.push(fn);
    } else {
      warn(
        `onScopeDispose() is called when there is no active effect scope` +
          ` to be associated with.`
      );
    }
  }

  // 创建 dep 依赖 (new Set effects 为副作用, 如果单纯新建 ref 变量则没有这个) 的
  // 每次副作用函数执行，都需要先执行 cleanup 清除依赖，然后在副作用函数执行的过程中重新收集依赖
  // 集合 dep 添加两个属性： w 表示是否已经被收集，n 表示是否新收集。
  const createDep = (effects) => {
    const dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
  };
  const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
  const newTracked = (dep) => (dep.n & trackOpBit) > 0;
  // 执行副作用函数前，给 ReactiveEffect 依赖的响应式变量，加上 w(was的意思) 标记。
  const initDepMarkers = ({ deps }) => {
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].w |= trackOpBit; // set was tracked
      }
    }
  };
  const finalizeDepMarkers = (effect) => {
    const { deps } = effect;
    if (deps.length) {
      let ptr = 0;
      for (let i = 0; i < deps.length; i++) {
        const dep = deps[i];
        if (wasTracked(dep) && !newTracked(dep)) {
          dep.delete(effect);
        } else {
          deps[ptr++] = dep;
        }
        // clear bits
        dep.w &= ~trackOpBit;
        dep.n &= ~trackOpBit;
      }
      deps.length = ptr;
    }
  };

  const targetMap = new WeakMap();
  // The number of effects currently being tracked recursively.
  let effectTrackDepth = 0;
  let trackOpBit = 1;
  /**
   * The bitwise track markers support at most 30 levels of recursion.
   * This value is chosen to enable modern JS engines to use a SMI on all platforms.
   * When recursion depth is greater, fall back to using a full cleanup.
   */
  const maxMarkerBits = 30;
  let activeEffect;
  const ITERATE_KEY = Symbol("iterate");
  const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
  class ReactiveEffect {
    constructor(fn, scheduler = null, scope) {
      // 传入一个副作用函数
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      // 存储 Dep 对象，如 ref.dep
      // 用于在触发依赖后， ref.dep.delete(effect)，双向删除依赖）
      this.deps = [];
      this.parent = undefined;
      recordEffectScope(this, scope);
    }
    run() {
      // 如果当前effect已经被stop
      if (!this.active) {
        return this.fn();
      }
      let parent = activeEffect;
      let lastShouldTrack = shouldTrack;
      while (parent) {
        if (parent === this) {
          return;
        }
        parent = parent.parent;
      }
      try {
        // 保存上一个 activeEffect
        this.parent = activeEffect;
        activeEffect = this;
        shouldTrack = true;
        // trackOpBit: 根据深度生成 trackOpBit
        trackOpBit = 1 << ++effectTrackDepth;
        // 如果不超过最大嵌套深度 30 层，使用优化方案
        // 为什么Vue3中嵌套深度最大是 30 ？
        // 因为js中位运算是以32位带符号的整数进行运算的，最左边一位是符号位，所以可用的正数最多只能到30位。
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this); // 标记所有 dep 为 was
        } else {
          cleanupEffect(this); // 否则使用降级方案
        }
        return this.fn(); // 执行过程中重新收集依赖标记新的 dep 为 new
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this); // 针对优化方案 删除失效依赖
        }
        // 重置操作的位数
        trackOpBit = 1 << --effectTrackDepth;
        // 恢复上一个 activeEffect
        activeEffect = this.parent;
        shouldTrack = lastShouldTrack;
        this.parent = undefined;
        if (this.deferStop) {
          this.stop();
        }
      }
    }
    stop() {
      // stopped while running itself - defer the cleanup
      if (activeEffect === this) {
        this.deferStop = true;
      } else if (this.active) {
        // 正在激活中 下一步清除副作用
        cleanupEffect(this);
        if (this.onStop) {
          this.onStop();
        }
        this.active = false;
      }
    }
  }
  // 降级方案:
  // 在各个 dep 中，删除该 ReactiveEffect 对象，
  // 然后执行 this.fn()(副作用函数) 时，当获取响应式变量触发 getter 时，又会重新收集依赖。
  // 之所以要先删除然后重新收集，是因为随着响应式变量的变化，收集到的依赖前后可能不一样。
  function cleanupEffect(effect) {
    const { deps } = effect;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect);
      }
      deps.length = 0;
    }
  }
  function effect(fn, options) {
    if (fn.effect) {
      fn = fn.effect.fn;
    }
    const _effect = new ReactiveEffect(fn);
    if (options) {
      extend(_effect, options);
      if (options.scope) recordEffectScope(_effect, options.scope);
    }
    if (!options || !options.lazy) {
      _effect.run();
    }
    const runner = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
  }
  function stop(runner) {
    runner.effect.stop();
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === undefined ? true : last;
  }
  // track 跟踪函数
  function track(target, type, key) {
    if (shouldTrack && activeEffect) {
      // 从 targetMap(WeakMap) 得到 dep 依赖
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        // target 对应一个 depsMap 对象 如果没有则新建一个
        targetMap.set(target, (depsMap = new Map()));
      }
      // 获取 target 对象需要追踪的 key 的依赖
      let dep = depsMap.get(key);
      if (!dep) {
        // key 对应一个 dep 集合
        depsMap.set(key, (dep = createDep()));
      }
      // 事件的相关信息 传入 trackEffects
      const eventInfo = { effect: activeEffect, target, type, key };
      trackEffects(dep, eventInfo);
    }
  }
  // 跟踪副作用
  function trackEffects(dep, debuggerEventExtraInfo) {
    let shouldTrack = false;
    if (effectTrackDepth <= maxMarkerBits) {
      if (!newTracked(dep)) {
        dep.n |= trackOpBit; // set newly tracked || =
        shouldTrack = !wasTracked(dep);
      }
    } else {
      // Full cleanup mode.
      shouldTrack = !dep.has(activeEffect);
    }
    if (shouldTrack) {
      // 如果存在激活的副作用
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (activeEffect.onTrack) {
        activeEffect.onTrack(
          Object.assign({ effect: activeEffect }, debuggerEventExtraInfo)
        );
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      // never been tracked
      return;
    }
    let deps = [];
    if (type === "clear" /* TriggerOpTypes.CLEAR */) {
      // collection being cleared
      // trigger all effects for target
      deps = [...depsMap.values()];
    } else if (key === "length" && isArray(target)) {
      depsMap.forEach((dep, key) => {
        if (key === "length" || key >= newValue) {
          deps.push(dep);
        }
      });
    } else {
      // schedule runs for SET | ADD | DELETE
      if (key !== void 0) {
        deps.push(depsMap.get(key));
      }
      // also run for iteration key on ADD | DELETE | Map.SET
      switch (type) {
        case "add" /* TriggerOpTypes.ADD */:
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            // new index added to array -> length changes
            deps.push(depsMap.get("length"));
          }
          break;
        case "delete" /* TriggerOpTypes.DELETE */:
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set" /* TriggerOpTypes.SET */:
          if (isMap(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
    if (deps.length === 1) {
      if (deps[0]) {
        {
          triggerEffects(deps[0], eventInfo);
        }
      }
    } else {
      const effects = [];
      for (const dep of deps) {
        if (dep) {
          effects.push(...dep);
        }
      }
      {
        triggerEffects(createDep(effects), eventInfo);
      }
    }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
    // spread into array for stabilization
    const effects = isArray(dep) ? dep : [...dep];
    for (const effect of effects) {
      if (effect.computed) {
        triggerEffect(effect, debuggerEventExtraInfo);
      }
    }
    for (const effect of effects) {
      if (!effect.computed) {
        triggerEffect(effect, debuggerEventExtraInfo);
      }
    }
  }
  function triggerEffect(effect, debuggerEventExtraInfo) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
      }
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }

  const isNonTrackableKeys = /*#__PURE__*/ makeMap(
    `__proto__,__v_isRef,__isVue`
  );
  const builtInSymbols = new Set(
    /*#__PURE__*/
    Object.getOwnPropertyNames(Symbol)
      // ios10.x Object.getOwnPropertyNames(Symbol) can enumerate 'arguments' and 'caller'
      // but accessing them on Symbol leads to TypeError because Symbol is a strict mode
      // function
      .filter((key) => key !== "arguments" && key !== "caller")
      .map((key) => Symbol[key])
      .filter(isSymbol)
  );
  const get = /*#__PURE__*/ createGetter();
  const shallowGet = /*#__PURE__*/ createGetter(false, true);
  const readonlyGet = /*#__PURE__*/ createGetter(true);
  const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
  const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function (...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get" /* TrackOpTypes.GET */, i + "");
        }
        // we run the method using the original args first (which may be reactive)
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          // if that didn't work, run it again using raw values.
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function (...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
      if (key === "__v_isReactive" /* ReactiveFlags.IS_REACTIVE */) {
        return !isReadonly;
      } else if (key === "__v_isReadonly" /* ReactiveFlags.IS_READONLY */) {
        return isReadonly;
      } else if (key === "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */) {
        return shallow;
      } else if (
        key === "__v_raw" /* ReactiveFlags.RAW */ &&
        receiver ===
          (isReadonly
            ? shallow
              ? shallowReadonlyMap
              : readonlyMap
            : shallow
            ? shallowReactiveMap
            : reactiveMap
          ).get(target)
      ) {
        return target;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly) {
        track(target, "get" /* TrackOpTypes.GET */, key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        // ref unwrapping - skip unwrap for Array + integer key.
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject(res)) {
        // Convert returned value into a proxy as well. we do the isObject check
        // here to avoid invalid value warning. Also need to lazy access readonly
        // and reactive here to avoid circular dependency.
        return isReadonly ? readonly(res) : reactive(res);
      }
      return res;
    };
  }
  const set = /*#__PURE__*/ createSetter();
  const shallowSet = /*#__PURE__*/ createSetter(true);
  function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
      let oldValue = target[key];
      if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
        return false;
      }
      if (!shallow) {
        if (!isShallow(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey =
        isArray(target) && isIntegerKey(key)
          ? Number(key) < target.length
          : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      // don't trigger if target is something up in the prototype chain of original
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add" /* TriggerOpTypes.ADD */, key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set" /* TriggerOpTypes.SET */, key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(
        target,
        "delete" /* TriggerOpTypes.DELETE */,
        key,
        undefined,
        oldValue
      );
    }
    return result;
  }
  function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has" /* TrackOpTypes.HAS */, key);
    }
    return result;
  }
  function ownKeys(target) {
    track(
      target,
      "iterate" /* TrackOpTypes.ITERATE */,
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
  const mutableHandlers = {
    get,
    set,
    deleteProperty,
    has,
    ownKeys,
  };
  const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      {
        warn(
          `Set operation on key "${String(key)}" failed: target is readonly.`,
          target
        );
      }
      return true;
    },
    deleteProperty(target, key) {
      {
        warn(
          `Delete operation on key "${String(
            key
          )}" failed: target is readonly.`,
          target
        );
      }
      return true;
    },
  };
  const shallowReactiveHandlers = /*#__PURE__*/ extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet,
  });
  // Props handlers are special in the sense that it should not unwrap top-level
  // refs (in order to allow refs to be explicitly passed down), but should
  // retain the reactivity of the normal readonly object.
  const shallowReadonlyHandlers = /*#__PURE__*/ extend({}, readonlyHandlers, {
    get: shallowReadonlyGet,
  });

  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly = false, isShallow = false) {
    // #1772: readonly(reactive(Map)) should return readonly + reactive version
    // of the value
    target = target["__v_raw" /* ReactiveFlags.RAW */];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly) {
      if (key !== rawKey) {
        track(rawTarget, "get" /* TrackOpTypes.GET */, key);
      }
      track(rawTarget, "get" /* TrackOpTypes.GET */, rawKey);
    }
    const { has } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      // #3602 readonly(reactive(Map))
      // ensure that the nested reactive `Map` can do tracking for itself
      target.get(key);
    }
  }
  function has$1(key, isReadonly = false) {
    const target = this["__v_raw" /* ReactiveFlags.RAW */];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly) {
      if (key !== rawKey) {
        track(rawTarget, "has" /* TrackOpTypes.HAS */, key);
      }
      track(rawTarget, "has" /* TrackOpTypes.HAS */, rawKey);
    }
    return key === rawKey
      ? target.has(key)
      : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly = false) {
    target = target["__v_raw" /* ReactiveFlags.RAW */];
    !isReadonly &&
      track(toRaw(target), "iterate" /* TrackOpTypes.ITERATE */, ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add" /* TriggerOpTypes.ADD */, value, value);
    }
    return this;
  }
  function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has, get } = getProto(target);
    let hadKey = has.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has.call(target, key);
    } else {
      checkIdentityKeys(target, has, key);
    }
    const oldValue = get.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add" /* TriggerOpTypes.ADD */, key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set" /* TriggerOpTypes.SET */, key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has, get } = getProto(target);
    let hadKey = has.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has.call(target, key);
    } else {
      checkIdentityKeys(target, has, key);
    }
    const oldValue = get ? get.call(target, key) : undefined;
    // forward the operation before queueing reactions
    const result = target.delete(key);
    if (hadKey) {
      trigger(
        target,
        "delete" /* TriggerOpTypes.DELETE */,
        key,
        undefined,
        oldValue
      );
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = isMap(target) ? new Map(target) : new Set(target);
    // forward the operation before queueing reactions
    const result = target.clear();
    if (hadItems) {
      trigger(
        target,
        "clear" /* TriggerOpTypes.CLEAR */,
        undefined,
        undefined,
        oldTarget
      );
    }
    return result;
  }
  function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw" /* ReactiveFlags.RAW */];
      const rawTarget = toRaw(target);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly &&
        track(rawTarget, "iterate" /* TrackOpTypes.ITERATE */, ITERATE_KEY);
      return target.forEach((value, key) => {
        // important: make sure the callback is
        // 1. invoked with the reactive map as `this` and 3rd arg
        // 2. the value received should be a corresponding reactive/readonly.
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
    return function (...args) {
      const target = this["__v_raw" /* ReactiveFlags.RAW */];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair =
        method === "entries" || (method === Symbol.iterator && targetIsMap);
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly &&
        track(
          rawTarget,
          "iterate" /* TrackOpTypes.ITERATE */,
          isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
        );
      // return a wrapped iterator which returns observed versions of the
      // values emitted from the real iterator
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done
            ? { value, done }
            : {
                value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                done,
              };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        },
      };
    };
  }
  function createReadonlyMethod(type) {
    return function (...args) {
      {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        console.warn(
          `${capitalize(type)} operation ${key}failed: target is readonly.`,
          toRaw(this)
        );
      }
      return type === "delete" /* TriggerOpTypes.DELETE */ ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false),
    };
    const shallowInstrumentations = {
      get(key) {
        return get$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true),
    };
    const readonlyInstrumentations = {
      get(key) {
        return get$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add" /* TriggerOpTypes.ADD */),
      set: createReadonlyMethod("set" /* TriggerOpTypes.SET */),
      delete: createReadonlyMethod("delete" /* TriggerOpTypes.DELETE */),
      clear: createReadonlyMethod("clear" /* TriggerOpTypes.CLEAR */),
      forEach: createForEach(true, false),
    };
    const shallowReadonlyInstrumentations = {
      get(key) {
        return get$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add" /* TriggerOpTypes.ADD */),
      set: createReadonlyMethod("set" /* TriggerOpTypes.SET */),
      delete: createReadonlyMethod("delete" /* TriggerOpTypes.DELETE */),
      clear: createReadonlyMethod("clear" /* TriggerOpTypes.CLEAR */),
      forEach: createForEach(true, true),
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations[method] = createIterableMethod(
        method,
        false,
        false
      );
      readonlyInstrumentations[method] = createIterableMethod(
        method,
        true,
        false
      );
      shallowInstrumentations[method] = createIterableMethod(
        method,
        false,
        true
      );
      shallowReadonlyInstrumentations[method] = createIterableMethod(
        method,
        true,
        true
      );
    });
    return [
      mutableInstrumentations,
      readonlyInstrumentations,
      shallowInstrumentations,
      shallowReadonlyInstrumentations,
    ];
  }
  const [
    mutableInstrumentations,
    readonlyInstrumentations,
    shallowInstrumentations,
    shallowReadonlyInstrumentations,
  ] = /* #__PURE__*/ createInstrumentations();
  function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow
      ? isReadonly
        ? shallowReadonlyInstrumentations
        : shallowInstrumentations
      : isReadonly
      ? readonlyInstrumentations
      : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive" /* ReactiveFlags.IS_REACTIVE */) {
        return !isReadonly;
      } else if (key === "__v_isReadonly" /* ReactiveFlags.IS_READONLY */) {
        return isReadonly;
      } else if (key === "__v_raw" /* ReactiveFlags.RAW */) {
        return target;
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target
          ? instrumentations
          : target,
        key,
        receiver
      );
    };
  }
  const mutableCollectionHandlers = {
    get: /*#__PURE__*/ createInstrumentationGetter(false, false),
  };
  const shallowCollectionHandlers = {
    get: /*#__PURE__*/ createInstrumentationGetter(false, true),
  };
  const readonlyCollectionHandlers = {
    get: /*#__PURE__*/ createInstrumentationGetter(true, false),
  };
  const shallowReadonlyCollectionHandlers = {
    get: /*#__PURE__*/ createInstrumentationGetter(true, true),
  };
  function checkIdentityKeys(target, has, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has.call(target, rawKey)) {
      const type = toRawType(target);
      console.warn(
        `Reactive ${type} contains both the raw and reactive ` +
          `versions of the same object${type === `Map` ? ` as keys` : ``}, ` +
          `which can lead to inconsistencies. ` +
          `Avoid differentiating between the raw and reactive versions ` +
          `of an object and only use the reactive version if possible.`
      );
    }
  }

  const reactiveMap = new WeakMap();
  const shallowReactiveMap = new WeakMap();
  const readonlyMap = new WeakMap();
  const shallowReadonlyMap = new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1 /* TargetType.COMMON */;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2 /* TargetType.COLLECTION */;
      default:
        return 0 /* TargetType.INVALID */;
    }
  }
  function getTargetType(value) {
    return value["__v_skip" /* ReactiveFlags.SKIP */] ||
      !Object.isExtensible(value)
      ? 0 /* TargetType.INVALID */
      : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    // if trying to observe a readonly proxy, return the readonly version.
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  /**
   * Return a shallowly-reactive copy of the original object, where only the root
   * level properties are reactive. It also does not auto-unwrap refs (even at the
   * root level).
   */
  function shallowReactive(target) {
    return createReactiveObject(
      target,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  /**
   * Creates a readonly copy of the original object. Note the returned copy is not
   * made reactive, but `readonly` can be called on an already reactive object.
   */
  function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  /**
   * Returns a reactive-copy of the original object, where only the root level
   * properties are readonly, and does NOT unwrap refs nor recursively convert
   * returned properties.
   * This is used for creating the props proxy object for stateful components.
   */
  function shallowReadonly(target) {
    return createReactiveObject(
      target,
      true,
      shallowReadonlyHandlers,
      shallowReadonlyCollectionHandlers,
      shallowReadonlyMap
    );
  }
  function createReactiveObject(
    target,
    isReadonly,
    baseHandlers,
    collectionHandlers,
    proxyMap
  ) {
    if (!isObject(target)) {
      {
        console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
    }
    // target is already a Proxy, return it.
    // exception: calling readonly() on a reactive object
    if (
      target["__v_raw" /* ReactiveFlags.RAW */] &&
      !(isReadonly && target["__v_isReactive" /* ReactiveFlags.IS_REACTIVE */])
    ) {
      return target;
    }
    // target already has corresponding Proxy
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    // only specific value types can be observed.
    const targetType = getTargetType(target);
    if (targetType === 0 /* TargetType.INVALID */) {
      return target;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 /* TargetType.COLLECTION */
        ? collectionHandlers
        : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw" /* ReactiveFlags.RAW */]);
    }
    return !!(value && value["__v_isReactive" /* ReactiveFlags.IS_REACTIVE */]);
  }
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly" /* ReactiveFlags.IS_READONLY */]);
  }
  function isShallow(value) {
    return !!(value && value["__v_isShallow" /* ReactiveFlags.IS_SHALLOW */]);
  }
  function isProxy(value) {
    return isReactive(value) || isReadonly(value);
  }
  // observed 观察这个 ref 对象 =>
  // 如果 __v_raw 标记不存在(基础数据类型/未被跟踪的引用类型)的返回原始值
  function toRaw(observed) {
    const raw = observed && observed["__v_raw" /* ReactiveFlags.RAW */];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    def(value, "__v_skip" /* ReactiveFlags.SKIP */, true);
    return value;
  }
  const toReactive = (value) => (isObject(value) ? reactive(value) : value);
  const toReadonly = (value) => (isObject(value) ? readonly(value) : value);

  // trackRefValue 跟踪 RefImpl 的 get
  function trackRefValue(ref) {
    // shouldTrack 全局变量，代表当前是否需要 track 收集依赖
    // activeEffect 全局变量，代表当前的副作用对象 ReactiveEffect

    // 为什么要判断 shouldTrack 和 activeEffect，因为在Vue3中有些时候不需要收集依赖：

    // - 当没有 effect 包裹时，比如定义了一个ref变量，但没有任何地方使用到，这时候就没有依赖，activeEffect 为 undefined，就不需要收集依赖了
    // - 比如在数组的一些会改变自身长度的方法里，也不应该收集依赖，容易造成死循环，此时 shouldTrack 为 false
    if (shouldTrack && activeEffect) {
      ref = toRaw(ref);
      {
        // ref 实例 =>
        // 1. ref.dep 存在, 则使用原有的
        // 2. ref.dep 为 undefined => createDep 新建 dep 依赖对象
        // target 模板 type 类型 key (是 ref.value)
        trackEffects(ref.dep || (ref.dep = createDep()), {
          target: ref,
          type: "get" /* TrackOpTypes.GET */,
          key: "value",
        });
      }
    }
  }
  // trackRefValue 跟踪 RefImpl 的 set
  function triggerRefValue(ref, newVal) {
    ref = toRaw(ref);
    if (ref.dep) {
      {
        triggerEffects(ref.dep, {
          target: ref,
          type: "set" /* TriggerOpTypes.SET */,
          key: "value",
          newValue: newVal,
        });
      }
    }
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  // 创建 ref 的时候调用 createRef 并标记 shallow 为 false
  function ref(value) {
    return createRef(value, false);
  }
  // shallowRef 标记值为 shallow
  // 值只会进行 ref 第一层包装(往下看) 而不触发 toReactive (浅层响应式)
  function shallowRef(value) {
    return createRef(value, true);
  }
  // createRef
  // 1.如果传入的就是一个 ref，那么返回自身即可，处理嵌套 ref 的情况。
  // 2.如果不是就 new 一个 RefImpl(implement) 实例(往下看)
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  // ES6 Class 的 get、set，其实就是 Object.defineProperty
  // 也就是说 基本数据类型通过 RefImpl 包装后 追踪的依赖底层还是 Vue2 的实现
  // 但是对于引用类型 则会被递归处理成新的 Reactive 对象 => 使用 Proxy 的追踪
  class RefImpl {
    constructor(value, __v_isShallow) {
      this.__v_isShallow = __v_isShallow; // 是否是 shallow 系的值
      this.dep = undefined; // dep 用于收集依赖 (先声明, 后续在 trackRefValue 里 实例化 dep)
      this.__v_isRef = true; // 标记这个对象为 ref
      this._rawValue = __v_isShallow ? value : toRaw(value); // toRaw 拿到value的原始值
      this._value = __v_isShallow ? value : toReactive(value);
      // 如果传入的值没有被 shallow 修饰 就会通过 toReactive 函数 (判断是否是 Object 如果是, 给这个value进行 reactive 包装)
      // 那么基本数据类型在 toReactive 的时候就会直接返回 value 本身
      // 那么如果它的值是对象或者数组，则递归Reactive
    }
    // 给 value 属性添加 getter，并做依赖收集
    get value() {
      // trackRefValue 跟踪
      trackRefValue(this);
      return this._value;
    }
    // 给 value 属性添加 setter
    set value(newVal) {
      const useDirectValue =
        this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
      newVal = useDirectValue ? newVal : toRaw(newVal); // 判断新值的类型
      // hasChanged 用了 Object.is 方法判断两个value 是否相等, 如果跟原始值不相同就触发更新
      if (hasChanged(newVal, this._rawValue)) {
        this._rawValue = newVal;
        this._value = useDirectValue ? newVal : toReactive(newVal); // 如果不是基本类型就递归Reactive
        triggerRefValue(this, newVal); // 派发通知 (也就是发布订阅)
      }
    }
  }
  function triggerRef(ref) {
    triggerRefValue(ref, ref.value);
  }
  function unref(ref) {
    return isRef(ref) ? ref.value : ref;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    },
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs)
      ? objectWithRefs
      : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class CustomRefImpl {
    constructor(factory) {
      this.dep = undefined;
      this.__v_isRef = true;
      // 一个 factory 配置函数 用户接收原 ref 实现的 trackRefValue triggerRefValue 函数(等待执行)
      // 用户实现 CustomRef 需要将 track() trigger() 手动执行
      const { get, set } = factory(
        () => trackRefValue(this),
        () => triggerRefValue(this)
      );
      this._get = get;
      this._set = set;
    }
    // 使用用户自定义的函数
    get value() {
      return this._get();
    }
    // 使用用户自定义的函数 传入 newVal
    set value(newVal) {
      this._set(newVal);
    }
  }
  function customRef(factory) {
    return new CustomRefImpl(factory);
  }
  function toRefs(object) {
    // 检查是否为 reactiveProxy 对象
    if (!isProxy(object)) {
      console.warn(
        `toRefs() expects a reactive object but received a plain one.`
      );
    }
    // object是否为数组 是数组的建立一个同源对象长度的数组以便存取 ref 对象
    const ret = isArray(object) ? new Array(object.length) : {};
    for (const key in object) {
      // 遍历并将对象内的所有 key 包装成 ref
      // 注意这里把源 object 也一并传入了 因此两者的引用关系还会保留
      // 这就是为什么 toRefs 能保持原对象的响应式关系
      ret[key] = toRef(object, key);
    }
    return ret; // 返回这个新对象/数组
  }
  // Object { a:1, b:2 } => { a: ref(1), b: ref(2) }
  class ObjectRefImpl {
    constructor(_object, _key, _defaultValue) {
      this._object = _object;
      this._key = _key;
      this._defaultValue = _defaultValue;
      this.__v_isRef = true;
    }
    get value() {
      const val = this._object[this._key];
      return val === undefined ? this._defaultValue : val;
    }
    set value(newVal) {
      this._object[this._key] = newVal;
    }
  }
  // defaultValue 这个函数被允许传入 默认值
  function toRef(object, key, defaultValue) {
    const val = object[key]; // 取出对象的键
    // 判断是否是 ref 否则 进行包装
    return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
  }

  var _a;
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly, isSSR) {
      this._setter = _setter;
      this.dep = undefined;
      this.__v_isRef = true;
      this[_a] = false;
      this._dirty = true;
      this.effect = new ReactiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerRefValue(this);
        }
      });
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly" /* ReactiveFlags.IS_READONLY */] = isReadonly;
    }
    get value() {
      // the computed ref may get wrapped by other proxies e.g. readonly() #3376
      const self = toRaw(this);
      trackRefValue(self);
      if (self._dirty || !self._cacheable) {
        self._dirty = false;
        self._value = self.effect.run();
      }
      return self._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
  }
  _a = "__v_isReadonly" /* ReactiveFlags.IS_READONLY */;
  function computed(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = () => {
        console.warn("Write operation failed: computed value is readonly");
      };
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(
      getter,
      setter,
      onlyGetter || !setter,
      isSSR
    );
    if (debugOptions && !isSSR) {
      cRef.effect.onTrack = debugOptions.onTrack;
      cRef.effect.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
  }

  var _a$1;
  const tick = /*#__PURE__*/ Promise.resolve();
  const queue = [];
  let queued = false;
  const scheduler = (fn) => {
    queue.push(fn);
    if (!queued) {
      queued = true;
      tick.then(flush);
    }
  };
  const flush = () => {
    for (let i = 0; i < queue.length; i++) {
      queue[i]();
    }
    queue.length = 0;
    queued = false;
  };
  class DeferredComputedRefImpl {
    constructor(getter) {
      this.dep = undefined;
      this._dirty = true;
      this.__v_isRef = true;
      this[_a$1] = true;
      let compareTarget;
      let hasCompareTarget = false;
      let scheduled = false;
      this.effect = new ReactiveEffect(getter, (computedTrigger) => {
        if (this.dep) {
          if (computedTrigger) {
            compareTarget = this._value;
            hasCompareTarget = true;
          } else if (!scheduled) {
            const valueToCompare = hasCompareTarget
              ? compareTarget
              : this._value;
            scheduled = true;
            hasCompareTarget = false;
            scheduler(() => {
              if (this.effect.active && this._get() !== valueToCompare) {
                triggerRefValue(this);
              }
              scheduled = false;
            });
          }
          // chained upstream computeds are notified synchronously to ensure
          // value invalidation in case of sync access; normal effects are
          // deferred to be triggered in scheduler.
          for (const e of this.dep) {
            if (e.computed instanceof DeferredComputedRefImpl) {
              e.scheduler(true /* computedTrigger */);
            }
          }
        }
        this._dirty = true;
      });
      this.effect.computed = this;
    }
    _get() {
      if (this._dirty) {
        this._dirty = false;
        return (this._value = this.effect.run());
      }
      return this._value;
    }
    get value() {
      trackRefValue(this);
      // the computed ref may get wrapped by other proxies e.g. readonly() #3376
      return toRaw(this)._get();
    }
  }
  _a$1 = "__v_isReadonly" /* ReactiveFlags.IS_READONLY */;
  function deferredComputed(getter) {
    return new DeferredComputedRefImpl(getter);
  }

  exports.EffectScope = EffectScope;
  exports.ITERATE_KEY = ITERATE_KEY;
  exports.ReactiveEffect = ReactiveEffect;
  exports.computed = computed;
  exports.customRef = customRef;
  exports.deferredComputed = deferredComputed;
  exports.effect = effect;
  exports.effectScope = effectScope;
  exports.enableTracking = enableTracking;
  exports.getCurrentScope = getCurrentScope;
  exports.isProxy = isProxy;
  exports.isReactive = isReactive;
  exports.isReadonly = isReadonly;
  exports.isRef = isRef;
  exports.isShallow = isShallow;
  exports.markRaw = markRaw;
  exports.onScopeDispose = onScopeDispose;
  exports.pauseTracking = pauseTracking;
  exports.proxyRefs = proxyRefs;
  exports.reactive = reactive;
  exports.readonly = readonly;
  exports.ref = ref;
  exports.resetTracking = resetTracking;
  exports.shallowReactive = shallowReactive;
  exports.shallowReadonly = shallowReadonly;
  exports.shallowRef = shallowRef;
  exports.stop = stop;
  exports.toRaw = toRaw;
  exports.toRef = toRef;
  exports.toRefs = toRefs;
  exports.track = track;
  exports.trigger = trigger;
  exports.triggerRef = triggerRef;
  exports.unref = unref;

  Object.defineProperty(exports, "__esModule", { value: true });

  return exports;
})({});
