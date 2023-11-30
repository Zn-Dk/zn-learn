class DataBinder {
  private data: any;
  private domEle: HTMLElement;

  constructor(data: any[], attachDom: HTMLElement = document.body) {
    this.data = this.createProxy(data);
    this.domEle = attachDom;
    this.updateDOM();
  }

  // 创建双向绑定
  private createProxy(data: any[]) {
    const handler: ProxyHandler<any[]> = {
      set: (target, key, value) => {
        target[key] = value;
        this.updateDOM();
        return true;
      },
    };
    return new Proxy(data, handler);
  }

  formatData(data: any[]) {
    return (
      '<ul>' +
      Object.keys(data)
        .map(key => `<li>${key}: ${data[key].toString()}</li>`)
        .join('') +
      '</ul>'
    );
  }

  updateDOM() {
    this.domEle.innerHTML = this.formatData(this.data);
  }

  setData(cb: (data: any) => void) {
    return cb(this.data);
  }
}

const appContent = document.querySelector('#app .content') as HTMLElement;

const iptKey = document.querySelector('#app #key') as HTMLInputElement;
const iptValue = document.querySelector('#app #value') as HTMLInputElement;
const addBtn = document.querySelector('#app #add-btn') as HTMLButtonElement;
const USER_DATA: any = {
  a: 1,
  b: 2,
};

const dataBinder = new DataBinder(USER_DATA, appContent);
dataBinder.setData(data => {
  data.c = 3;
  data.d = 4;
});

const handlerAdd = () => {
  const key = iptKey.value;
  const value = iptValue.value;

  dataBinder.setData(data => {
    data[key] = value;
  });

  iptKey.value = '';
  iptValue.value = '';
};

addBtn.addEventListener('click', handlerAdd);
