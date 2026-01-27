type EvtMap = {
  [key: string]: (...args: any[]) => unknown;
};

class EvtEmitter<T extends EvtMap> {
  private events: Map<keyof T, Set<T[keyof T]>> = new Map();

  on<K extends keyof T>(eventName: K, listener: T[K]): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }
    this.events.get(eventName)!.add(listener);
  }

  off<K extends keyof T>(eventName: K, listener: T[K]): void {
    const listeners = this.events.get(eventName);
    if (!listeners) return;
    listeners.delete(listener);
  }

  emit<K extends keyof T>(eventName: K, ...args: Parameters<T[K]>): void {
    const listeners = this.events.get(eventName);
    if (!listeners) return;
    listeners.forEach((listener) => {
      listener(...args);
    });
  }

  once<K extends keyof T>(eventName: K, listener: T[K]): void {
    const onceListener = ((...args: Parameters<T[K]>) => {
      listener(...args);
      this.off(eventName, onceListener);
    }) as T[K];
    this.on(eventName, onceListener);
  }
}

const emitter = new EvtEmitter<{
  greet: (name: string, foo: number) => void;
  farewell: (name: string) => void;
}>();

emitter.on('greet', (name, foo) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit('greet', 'Alice', 42); // Output: Hello, Alice!

emitter.once('farewell', (name) => {
  console.log(`Goodbye, ${name}!`);
});