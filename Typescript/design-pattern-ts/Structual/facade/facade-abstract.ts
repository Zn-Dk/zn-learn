// Showcase :
// three SubClass, each one has different method
// facade class is a wrapper of all SubClass
// to abstract those complex APIs, so that the users can omit the inner process and focus on the main method.

class SubClassA {
  methodA() {
    console.log('SubClassA methodA');
  }
}

class SubClassB {
  methodB(id: number) {
    console.log(`SubClassB methodB, id: ${id}`);
  }
}

class SubClassC {
  methodC(arr: string[]) {
    console.log(`SubClassC ${arr.join(',')}`);
  }
}

class Facade {
  private subClassA = new SubClassA();
  private subClassB = new SubClassB();
  private subClassC = new SubClassC();

  methodA() {
    this.subClassA.methodA();
  }

  methodB(id: number) {
    this.subClassB.methodB(id);
  }

  methodC(arr: string[]) {
    this.subClassC.methodC(arr);
  }
}

const api = new Facade();

api.methodA();
api.methodB(1);
api.methodC(['a', 'b', 'c']);
