class Receiver {
  commandA() {
    console.log('commandA executed');
  }

  commandB() {
    console.log('commandB executed');
  }
}

interface ICommand {
  execute: () => void;
}

class CommandA implements ICommand {
  receiver: Receiver;

  constructor(receiver: Receiver) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.commandA();
  }
}
class CommandB implements ICommand {
  receiver: Receiver;

  constructor(receiver: Receiver) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.commandB();
  }
}

class Invoker {
  commands: { [x: string]: ICommand };
  history: [number, string][]; // 历史记录

  constructor() {
    this.commands = {};
    this.history = [];
  }

  register(command: ICommand, commandStr: string) {
    this.commands[commandStr] = command;
  }

  execute(commandStr: string) {
    if (!this.commands[commandStr]) {
      console.error('command not recognized');
      return;
    }

    this.commands[commandStr].execute();
    this.history.push([Date.now(), commandStr]); // 写入历史记录
  }

  showHistory() {
    const logStr =
      'HISTORY: \n' +
      this.history.map(([time, commandStr]) => `TIMESTAMP: ${time} CMD: ${commandStr}`).join('\n');
    console.log(logStr);
  }

  // 重播操作 last 为重播的范围
  playbackRecent(last: number = 1) {
    const commands = this.history.slice(-last);
    console.log(`Playing back recent ${last} commands: \n`);

    commands.forEach(([_t, commandStr]) => {
      this.execute(commandStr);
    });
  }
}

// client

const invoker = new Invoker();

const receiver = new Receiver();
const commandA = new CommandA(receiver);
const commandB = new CommandB(receiver);

// 注册指令
invoker.register(commandA, 'a');
invoker.register(commandB, 'b');

// 执行
invoker.execute('a');
invoker.execute('b');
invoker.execute('b');
invoker.execute('c');
invoker.execute('b');
invoker.execute('a');

console.log('\n-------------\n');

// 读取历史记录
invoker.showHistory();

console.log('\n-------------\n');

// 重播最近 2 次操作
invoker.playbackRecent(2);
