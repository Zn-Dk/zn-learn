o = {
  GOO: "$2441",
  APPL: "$441",
  AMZO: "$233",
};
function apiStock() {
  this.getPrice = (stock) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(stock in o ? o[stock] : "");
      }, 2000);
    });
}

function getStockProxy() {
  this.cache = {};
  this.expire = 5000;
  this.realApi = new apiStock();
  this.getPrice = async (stock, callback) => {
    const cache = this.cache[stock];
    if (cache) {
      console.log("get from cache");
      callback(cache.data);
    } else {
      console.log("get from realApi");
      const res = await this.realApi.getPrice(stock);
      this.cache[stock] = { data: res, time: Date.now() };
      callback(res);
    }
  };
  // 启动轮询定时删除
  this.checkExpire = (interval) => {
    setInterval(() => {
      for (const key in this.cache) {
        if (Date.now() - this.cache[key].time >= this.expire) {
          delete this.cache[key];
        }
      }
    }, interval);
  };

  this.checkExpire(1000);
}

let p = new getStockProxy();

p.getPrice("GOO", (price) => console.log("Price is " + price));
setTimeout(() => {
  p.getPrice("GOO", (price) => console.log("Price is " + price));
}, 3000);

setTimeout(() => {
  p.getPrice("GOO", (price) => console.log("Price is " + price));
}, 8000);
