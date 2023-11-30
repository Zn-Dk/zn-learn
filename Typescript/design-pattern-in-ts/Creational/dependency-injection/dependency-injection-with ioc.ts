// 定义一个 Logger 接口
interface Logger {
  log(message: string): void;
}

// 实现一个 ConsoleLogger 类，它实现了 Logger 接口
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

// 实现一个 FileLogger 类，它实现了 Logger 接口
class FileLogger implements Logger {
  log(message: string): void {
    // 假设这里将日志写入文件
    console.log(`Write to file: ${message}`);
  }
}

// 定义一个 UserService 类，它依赖于 Logger 接口
class UserService {
  // 将来我们如果需要拓展 就可以在构造函数处增加新的模块功能
  constructor(private logger: Logger) {}

  createUser(username: string): void {
    // 创建用户的逻辑
    this.logger.log(`User created: ${username}`);
  }
}

// 使用依赖注入创建 UserService 实例
const consoleLogger = new ConsoleLogger();
const userServiceWithConsoleLogger = new UserService(consoleLogger);
userServiceWithConsoleLogger.createUser('John Doe'); // [LOG] User created: John Doe

const fileLogger = new FileLogger();
const userServiceWithFileLogger = new UserService(fileLogger);
userServiceWithFileLogger.createUser('Jane Doe'); // [LOG] Write to file: User created: Jane Doe

// 定义一个简单的 IoC 容器
class IoCContainer {
  private services: Map<string, any> = new Map();

  register(name: string, implementation: any): void {
    this.services.set(name, implementation);
  }

  resolve(name: string): any {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found.`);
    }
    return service;
  }
}

// 使用 IoC 容器注册服务
const container = new IoCContainer();
container.register('consoleLogger', consoleLogger);
container.register('fileLogger', fileLogger);

// 使用 IoC 容器解析依赖并创建 UserService 实例
const consoleLoggerInIoc = container.resolve('consoleLogger');
const userService = new UserService(consoleLoggerInIoc);
userService.createUser('Alice'); // [LOG] User created: Alice

/*

在这个示例中，我们创建了一个简单的IoC容器，它使用`register`方法注册服务，并使用`resolve`方法解析服务。
我们将`Logger`接口的实现（如`ConsoleLogger`和`FileLogger`）注册到容器中，然后在创建`UserService`实例时，
从容器中解析`Logger`实现并将其作为依赖项传递给`UserService`。

这样，我们可以在不修改`UserService`代码的情况下轻松地切换`Logger`实现。
此外，通过将依赖关系管理集中在IoC容器中，我们可以更好地控制和配置整个应用程序的依赖关系。

需要注意的是，这个示例中的IoC容器非常简单，仅用于演示目的。
在实际项目中，您可能需要使用更强大的IoC容器库，如InversifyJS、Angular的依赖注入系统或Spring框架等。
这些库提供了更多高级功能，如自动解析依赖关系、生命周期管理和作用域等。

*/
