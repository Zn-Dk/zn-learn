var DataBinder = /** @class */ (function () {
    function DataBinder(data, attachDom) {
        if (attachDom === void 0) { attachDom = document.body; }
        this.data = this.createProxy(data);
        this.domEle = attachDom;
        this.updateDOM();
    }
    // 创建双向绑定
    DataBinder.prototype.createProxy = function (data) {
        var _this = this;
        var handler = {
            set: function (target, key, value) {
                target[key] = value;
                _this.updateDOM();
                return true;
            },
        };
        return new Proxy(data, handler);
    };
    DataBinder.prototype.formatData = function (data) {
        return ('<ul>' +
            Object.keys(data)
                .map(function (key) { return "<li>".concat(key, ": ").concat(data[key].toString(), "</li>"); })
                .join('') +
            '</ul>');
    };
    DataBinder.prototype.updateDOM = function () {
        this.domEle.innerHTML = this.formatData(this.data);
    };
    DataBinder.prototype.setData = function (cb) {
        return cb(this.data);
    };
    return DataBinder;
}());
var appContent = document.querySelector('#app .content');
var iptKey = document.querySelector('#app #key');
var iptValue = document.querySelector('#app #value');
var addBtn = document.querySelector('#app #add-btn');
var USER_DATA = {
    a: 1,
    b: 2,
};
var dataBinder = new DataBinder(USER_DATA, appContent);
dataBinder.setData(function (data) {
    data.c = 3;
    data.d = 4;
});
var handlerAdd = function () {
    var key = iptKey.value;
    var value = iptValue.value;
    dataBinder.setData(function (data) {
        data[key] = value;
    });
    iptKey.value = '';
    iptValue.value = '';
};
addBtn.addEventListener('click', handlerAdd);
