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
userServiceWithConsoleLogger.createUser('John Doe');

const fileLogger = new FileLogger();
const userServiceWithFileLogger = new UserService(fileLogger);
userServiceWithFileLogger.createUser('Jane Doe');

/*

在这个示例中，我们首先定义了一个Logger接口，然后创建了两个实现了该接口的类：ConsoleLogger和FileLogger。
这两个类分别使用不同的方式记录日志（控制台和文件）。

接下来，我们定义了一个UserService类，它依赖于Logger接口。
通过将Logger作为构造函数参数传递给UserService，我们可以在运行时动态地为UserService提供不同的日志记录实现。

最后，我们创建了两个UserService实例，分别使用ConsoleLogger和FileLogger作为依赖项。
这样，我们可以轻松地在不修改UserService代码的情况下切换日志记录实现。

*/
