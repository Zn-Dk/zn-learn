// 观察者
interface IObserver {
  notify(args: unknown[]): void;
}

// 管理订阅者/消息发布者 Punisher
interface IObservable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  broadcast(args: unknown[]): void;
}

let COUNTER = 1;

class Observer implements IObserver {
  #id: number;

  constructor(observable: Observable) {
    this.#id = COUNTER++;
    observable.subscribe(this);
  }

  notify(args: unknown[]): void {
    console.log(`Observer ${this.#id} notified`);
    console.log(JSON.stringify(args));
  }
}

class Observable implements IObservable {
  #subscriber: Set<Observer>;

  constructor() {
    this.#subscriber = new Set();
  }

  subscribe(observer: Observer): void {
    this.#subscriber.add(observer);
  }

  unsubscribe(observer: Observer): void {
    this.#subscriber.delete(observer);
  }

  broadcast(args: unknown[]): void {
    console.log('Broadcasted to Observer');
    console.log('====================================');
    this.#subscriber.forEach(observer => {
      observer.notify(args);
    });
  }
}

const observable = new Observable();

const observer1 = new Observer(observable);
const observer2 = new Observer(observable);

observable.broadcast(['First Notification', 'hello']);
/*
  Broadcasted to Observer
  ====================================
  Observer 1 notified
  ["First Notification","hello"]
  Observer 2 notified
  ["First Notification","hello"]
*/
observable.unsubscribe(observer2);

console.log('\n---------------------------------\n');
observable.broadcast(['Second Notification', [1, 2, 3]]);
/*
  Broadcasted to Observer
  ====================================
  Observer 1 notified
  ["Second Notification",[1,2,3]]
*/
