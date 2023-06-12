"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var ApiController = exports.ApiController = function () {
    var _classDecorators = [(0, common_1.Controller)({
            path: 'api',
            version: '1',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _test_decorators;
    var _testPost_decorators;
    var _getCaptcha_decorators;
    var _login_decorators;
    var ApiController = _classThis = /** @class */ (function () {
        function ApiController_1(apiService) {
            this.apiService = (__runInitializers(this, _instanceExtraInitializers), apiService);
        }
        ApiController_1.prototype.findOne = function (id) {
            return this.apiService.findOne(+id);
        };
        ApiController_1.prototype.update = function (id, updateApiDto) {
            return this.apiService.update(+id, updateApiDto);
        };
        ApiController_1.prototype.remove = function (id) {
            return this.apiService.remove(+id);
        };
        // 控制器常用修饰器
        // GET Example
        // @Query === @Request('query')
        ApiController_1.prototype.test = function (req, headers, res, query, id) {
            console.log(headers.cookie);
            console.log(query, id); // 通过 query 修饰器直接取值
            res.send('test');
            res.type('');
        };
        // POST Example
        ApiController_1.prototype.testPost = function (body, file) {
            console.log(body, file);
        };
        // login-session demo 登录 验证码 session demo
        /** 创建验证码 */
        ApiController_1.prototype.getCaptcha = function (req, res) {
            // 应符合的验证码 text - 验证码内容 data - 图片
            var _a = this.apiService.createCaptcha(), text = _a.text, data = _a.data;
            req.session.captcha = text; // 存储验证码到请求 session
            // 实际的业务应存储到数据库内根据 sid 查找
            res.type('image/svg+xml');
            res.send(data);
        };
        /** 登录 */
        ApiController_1.prototype.login = function (body, session, res) {
            var _a, _b;
            console.log(body, session);
            var data = {
                code: 0,
                text: '登录成功',
            };
            // 验证 session 的验证码
            if (((_a = body.captcha) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === ((_b = session.captcha) === null || _b === void 0 ? void 0 : _b.toUpperCase())) {
            }
            else {
                data.code = 10002;
                data.text = '验证码错误';
            }
            res.send(data);
        };
        return ApiController_1;
    }());
    __setFunctionName(_classThis, "ApiController");
    (function () {
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, common_1.Version)('2')];
        _update_decorators = [(0, common_1.Patch)(':id')];
        _remove_decorators = [(0, common_1.Delete)(':id')];
        _test_decorators = [(0, common_1.HttpCode)(200), (0, common_1.Header)('Cache-Control', 'none'), (0, common_1.Header)('token', 'my-token'), (0, common_1.Get)('test')];
        _testPost_decorators = [(0, common_1.Post)('test-post'), (0, common_1.HttpCode)(200), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'))];
        _getCaptcha_decorators = [(0, common_1.Get)('captcha'), (0, common_1.Header)('Access-Control-Allow-Origin', '*')];
        _login_decorators = [(0, common_1.HttpCode)(200), (0, common_1.Post)('login'), (0, common_1.Header)('Access-Control-Allow-Origin', '*')];
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _test_decorators, { kind: "method", name: "test", static: false, private: false, access: { has: function (obj) { return "test" in obj; }, get: function (obj) { return obj.test; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _testPost_decorators, { kind: "method", name: "testPost", static: false, private: false, access: { has: function (obj) { return "testPost" in obj; }, get: function (obj) { return obj.testPost; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCaptcha_decorators, { kind: "method", name: "getCaptcha", static: false, private: false, access: { has: function (obj) { return "getCaptcha" in obj; }, get: function (obj) { return obj.getCaptcha; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } } }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        ApiController = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApiController = _classThis;
}();
