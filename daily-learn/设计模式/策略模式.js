/**
 * 用户名、密码登录策略
 */
function LocalStragegy() {
  this.login = ({ username, password }) => {
    console.log(username, password);
    // authenticating with username and password...
  };
}

/**
 * 手机号、验证码登录策略
 */
function PhoneStragety() {
  this.login = ({ phone, verifyCode }) => {
    console.log(phone, verifyCode);
    // authenticating with hone and verifyCode...
  };
}

/**
 * 第三方社交登录策略
 */
function SocialStragety() {
  this.login = ({ id, secret }) => {
    console.log(id, secret);
    // authenticating with id and secret...
  };
}

/**
 * 登录控制器
 */
function LoginController() {
  this.strategy = undefined;
  this.setStrategy = function (strategy) {
    this.strategy = strategy;
    this.login = this.strategy.login;
  };
}

const loginController = new LoginController();

loginController.setStrategy(new LocalStragegy());
loginController.login({ username: "aa", password: "123" });

// // 调用用户名、密码登录接口，使用LocalStrategy
// app.use("/login/local", function (req, res) {
//   loginController.setStrategy(new LocalStragegy());
//   loginController.login(req.body);
// });

// // 调用手机、验证码登录接口，使用PhoneStrategy
// app.use("/login/phone", function (req, res) {
//   loginController.setStrategy(new PhoneStragety());
//   loginController.login(req.body);
// });

// // 调用社交登录接口，使用SocialStrategy
// app.use("/login/social", function (req, res) {
//   loginController.setStrategy(new SocialStragety());
//   loginController.login(req.body);
// });
