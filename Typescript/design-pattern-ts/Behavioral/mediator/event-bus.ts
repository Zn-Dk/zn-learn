type EventCallBack = (...args: any[]) => void;

interface IEventBus {
  add(eventName: string, callback: EventCallBack): void;
  remove(eventName: string, callback: EventCallBack): void;
  emit(eventName: string, ...args: any[]): void;
}

class EventBus {
  events: {
    [eventName: string]: EventCallBack[];
  };

  constructor() {
    this.events = {};
  }

  add(eventName: string, callback: EventCallBack): void {
    const events = this.events[eventName];
    if (events) {
      events.push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  emit(eventName: string, ...args: any[]): void {
    const events = this.events[eventName];
    events.forEach(callback => {
      callback(...args);
    });
  }

  remove(eventName: string, callback: EventCallBack): void {
    const events = this.events[eventName];
    if (events) {
      this.events[eventName] = events.filter(cb => cb !== callback);
    }
  }
}

const bus = new EventBus();

const clickEvt = (...args: any[]) => {
  console.log('clickEvt', args);
};
const touchEvt = (...args: any[]) => {
  console.log('touchEvt', args);
};
const closeEvt = (...args: any[]) => {
  console.log('closeEvt', args);
};

bus.add('click', clickEvt);
bus.add('touch', touchEvt);
bus.add('close', closeEvt);

bus.emit('click', 'hello', 'world');

bus.emit('touch', 'device name iPhone');

const a = () => {
  console.log('a');
  bus.add('evtB', (msg: string) => {
    console.log(`received from B: ${msg}`);
  });
};

const b = () => {
  console.log('b');
  bus.add('evtA', (msg: string) => {
    console.log(`received from A: ${msg}`);
  });
};

a();
b();

bus.emit('evtB', 'hello from B');
bus.emit('evtA', 'hello from A');
