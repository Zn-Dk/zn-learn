class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    if (sub && typeof sub?.update === "function") {
      this.subs.push(sub);
    }
  }

  removeSub(sub) {
    this.subs = this.subs.filter((item) => item !== sub);
  }

  notify(...args) {
    this.subs.forEach((sub) => sub.update(...args));
  }
}

class Watcher {
  constructor(name) {
    this.name = name;
  }
  update(...args) {
    console.log(`Update messages for ${this.name}: `, ...args);
  }
}

let dep = new Dep();

let watcher1 = new Watcher("watcher1");
let watcher2 = new Watcher("watcher2");

[watcher1, watcher2].forEach((s) => dep.addSub(s));

dep.notify("Hello");

dep.removeSub(watcher2);

dep.notify("Goodbye");
