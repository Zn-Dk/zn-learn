const MusicDecoratorFactory = (type: string): ClassDecorator => {
  const fnToMount = (msg: string) => (target: Function) => {
    target.prototype.playMusic = () => {
      console.log(msg);
    };
  };
  switch (type) {
    case "Tank":
      return fnToMount("播放战争音乐");
    default:
      return fnToMount("播放电音");
  }
};

@MusicDecoratorFactory("Tank")
class Tank {}

const t = new Tank();
(t as any).playMusic(); // 播放战争音乐

@MusicDecoratorFactory("Player")
class Player {}

(new Player() as any).playMusic(); // 播放电音
