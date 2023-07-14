class SubjectA {
  method1() {
    return 'subjectA data';
  }
}

class SubjectB {
  method2() {
    return 'subjectB data';
  }
}

class Mediator {
  subjectA: SubjectA;
  subjectB: SubjectB;

  constructor() {
    this.subjectA = new SubjectA();
    this.subjectB = new SubjectB();
  }

  getSubjectAData() {
    return this.subjectA.method1();
  }

  getSubjectBData() {
    return this.subjectB.method2();
  }
}

const mediator = new Mediator();

const dataFromSubjectA = mediator.getSubjectAData();
console.log('Subject B wanted data: ', dataFromSubjectA);

const dataFromSubjectB = mediator.getSubjectBData();
console.log('Subject A wanted data: ', dataFromSubjectB);
