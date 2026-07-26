/**
 *  依赖倒置原则 (DIP) 与 控制翻转 (IOC)
 *
*/

class EmailSender {
  send(email: string, content: string) {
    console.log(`[邮件] 发送给 ${email}: ${content}`);
  }
}

class SmsSender {
  send(phone: string, content: string) {
    console.log(`[短信] 发送给 ${phone}: ${content}`);
  }
}

// ================ 反模式：直接依赖低层模块

class UserServiceBad {
  // 1. 直接依赖 EmailSender（低层模块）
  private emailSender = new EmailSender()

  notify(email: string, content: string) {
    // 只实现了 email 通知, 如果要改为短信
    // 违反了开闭原则  - 对扩展开放，对修改关闭
    this.emailSender.send(email, content)
  }
}

// ================ 改造 1: DIP 依赖倒置原则

// 1. 需要抽象接口, 不依赖细节
interface ISender {
  send(target: string, content: string): void;
}

// 抽象实现, 低层模块
class EmailSenderV2 implements ISender {
  send(target: string, content: string) {
    console.log(`[EMAIL] to ${target}: ${content}`);
  }
}
class SmsSenderV2 implements ISender {
  send(target: string, content: string) {
    console.log(`[SMS] to ${target}: ${content}`);
  }
}

// 完成了 DIP, 高层模块现在不关心具体实现,
// 只需在使用处声明需要的低层模块就行了
// 两者都依赖于抽象接口(ISender)
// 如果要新增微信通知只需实现 ISender，无需修改 UserServiceGood
class UserServiceV2 {
  private sender: ISender;
  constructor(sender: ISender) {
    this.sender = sender;
  }
  notify(target: string, content: string) {
    this.sender.send(target, content)
  }
}
console.log('=============== DIP ===========');
const emailService = new UserServiceV2(new EmailSenderV2())
emailService.notify('test@example.com', 'DIP 测试')
const smsService = new UserServiceV2(new SmsSenderV2())
smsService.notify('1300000000', 'DIP 测试2')

// ================ 改造 2: IOC 控制翻转 + DI 依赖注入

interface Registration<T> {
  inst: T | null;
  singleton: boolean;
  factory: () => T;
}

class IocContainer {
  // private deps: Map<string, unknown> = new Map()
  private deps: Map<string, Registration<unknown>> = new Map()

  // 简单实现, 不支持工厂模式
  // register<T>(key: string, value: T) {
  //   this.deps.set(key, value)
  // }

  registerSingleton<T>(key: string, factory: () => T) {
    this.deps.set(key, {
      inst: null, // 等到第一次解析再调用, 优化资源消耗
      singleton: true,
      factory,
    })
  }

  registerFactory<T>(key: string, factory: () => T) {
    this.deps.set(key, {
      inst: null,
      singleton: false,
      factory,
    })
  }

  resolve<T>(key: string): T {
    const value = this.deps.get(key)
    if (!value) {
      throw new Error(`依赖 ${key} 未注册`)
    }
    // return value as T

    // 更高级的, 支持单例+工厂模式
    if (value.singleton) {
      if (!value.inst) value.inst = value.factory()
      return value.inst as T
    } else {
      return value.factory() as T
    }
  }
}

console.log('=============== IOC ===========');
// IOC 的优势:

// 1. 集中管理依赖的注册与解析，切换实现只改注册处

// 纯 DIP：调用方需要自己知道依赖关系
// const emailService = new UserServiceV2(new EmailSenderV2())
// const smsService = new UserServiceV2(new SmsSenderV2())
// 如果有 10 个地方都用到 EmailSender，改一次就要改 10 处
// IOC 容器将依赖的注册和解析集中到一个地方，调用方只需要通过 key 去取，
// 在 container 的 reigister 逻辑修改即可

// 2. 天然单例, 使得后面不需要多次实例化
// (当然, 如果有需求, 这个容器可以每次 resolve 都返回新的实例)

// 3. 控制翻转: 控制权从"调用方手动 new"反转为"容器自动提供"。
// 调用方不再需要知道具体实现类，只通过 key 获取
// | 纯 DIP |	IOC |
// | 依赖由谁创建？ |	调用方（上层代码）|	容器（第三方）|
// | 调用方需要知道什么？|	具体实现类 |	只需要一个 key |

const container = new IocContainer()
container.registerSingleton('EmailSender', () => new EmailSenderV2())
container.registerFactory('SmsSender', () => new SmsSenderV2())

const emailSender = container.resolve<ISender>('EmailSender')
const emailSender2 = container.resolve<ISender>('EmailSender')
console.log('🚀 ~ emailSender === emailSender2:', emailSender === emailSender2)
const emailServiceIoc = new UserServiceV2(emailSender)
emailServiceIoc.notify('test@example.com', 'IOC 测试')


const smsSender = container.resolve<ISender>('SmsSender')
const smsSender2 = container.resolve<ISender>('SmsSender')
console.log('🚀 ~ smsSender === smsSender2:', smsSender === smsSender2)
const smsServiceIoc = new UserServiceV2(smsSender)
smsServiceIoc.notify('1300000000', 'IOC 测试2')

/*
更进一步...

  自动解析依赖链：当 UserServiceV2 本身也注册到容器中时，容器能自动解析它的构造函数参数并注入 ISender

  Scoped 作用域模式：介于 Singleton 和 Transient 之间，同一个作用域内共享实例

  装饰器模式：类似 NestJS 的 @Injectable()，用 TypeScript 装饰器自动注册
*/