interface IRequest {
  fetchData(): Promise<any>;
}

class RealRequest implements IRequest {
  async fetchData() {
    const rsp = await new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        resolve([1, 2, 3, 4, 5, 6]);
      }, 2000);
    });
    return rsp;
  }
}

class ProxyCacheRequest implements IRequest {
  private cacheData: any;
  private realRequest: RealRequest;

  constructor() {
    this.realRequest = new RealRequest();
  }

  async fetchData() {
    // 代理原类 实现缓存
    if (!this.cacheData) {
      console.log('We need to fetch data');
      const rspData = await this.realRequest.fetchData();
      this.cacheData = rspData;
      return this.cacheData;
    }
    console.log('We have cache data!');

    return this.cacheData;
  }
}

const proxy = new ProxyCacheRequest();

// Client

const getData = async () => {
  const data = await proxy.fetchData();
  console.log(data);
  const data2 = await proxy.fetchData();
  console.log(data2);
};

getData();
