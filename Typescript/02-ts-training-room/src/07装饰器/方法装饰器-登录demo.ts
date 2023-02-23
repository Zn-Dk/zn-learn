const user = {
  name: "Bleak",
  isLogin: false,
};

const AccessDecorator: MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const method = descriptor.value;
  descriptor.value = () => {
    if (user.isLogin === true) {
      return method();
    } else {
      alert("请登陆后操作");
      location.href = "login.html";
    }
  };
};

class Article {
  show() {
    console.log("显示文章");
  }
  @AccessDecorator
  store() {
    console.log("保存文章");
  }
}

new Article().store(); // 跳转到登录页面

// 数据权限控制访问方法
// type userType = {
//   name: string;
//   isLogin: boolean;
//   permissions: string[];
// };
// const user: userType = {
//   name: "Bleak",
//   isLogin: true,
//   permissions: ["store"],
// };

// const AccessDecoratorFactory = (keys: string[]): MethodDecorator => {
//   return (
//     target: Object,
//     propertyKey: string | symbol,
//     descriptor: PropertyDescriptor
//   ) => {
//     const method = descriptor.value;

//     // 定义一个方法来检测有效性
//     const validate = () =>
//       keys.every((k) => {
//         return user.permissions.includes(k);
//       });

//     descriptor.value = () => {
//       if (user.isLogin === true && validate()) {
//         alert("验证通过");
//         method();
//       } else {
//         alert("验证失败");
//       }
//     };
//   };
// };

// class Article {
//   show() {
//     console.log("显示文章");
//   }
//   @AccessDecoratorFactory(["store"])
//   store() {
//     console.log("保存文章");
//   }
// }

// new Article().store();
