const CVS_WIDTH = window.innerWidth * 0.8;
const CVS_HEIGHT = window.innerHeight * 0.6;
const BRANCH_COLOR = '#533'; // 枝干颜色
const FLOWER_COLOR_SET = ['#FF1493', '#fff', 'orange', 'pink']; // 花朵颜色
const START_LEN = 100;
const START_ANGLE = 90;
const START_THICK = 50;
const LEN_CHANGE_RATE = 0.8;
const THICK_CHANGE_RATE = 0.75;

/**
 * 绘制分支主函数
 * @param startPos 起始左边
 * @param angle 相对于 x 的偏转角
 * @param thick 树枝粗细
 */
const drawBranch = (
  ctx: CanvasRenderingContext2D,
  startPos: [number, number],
  length: number,
  angle = 90,
  thick = 10
) => {
  // 检查是否继续绘制分支
  if (!shouldBranchDraw(ctx, startPos, thick)) {
    return;
  }

  ctx.beginPath();
  // 起始坐标
  ctx.moveTo(...startPos);
  // 画线(计算为 x -> sin angle(角度转换弧度) * length, y -> cos angle * length)
  const nextPos: [number, number] = [
    startPos[0] + Math.cos(degToRad(angle)) * length,
    startPos[1] + Math.sin(degToRad(angle)) * length,
  ];
  ctx.lineTo(...nextPos);
  // 颜色
  ctx.strokeStyle = BRANCH_COLOR;
  // 粗细
  ctx.lineWidth = thick;
  // 线条端点设置成圆弧状
  ctx.lineCap = 'round';

  ctx.stroke();

  // 递归

  // 左分支
  drawBranch(
    ctx,
    nextPos,
    length * LEN_CHANGE_RATE,
    angle - getRandom(18, 30),
    thick * THICK_CHANGE_RATE
  );
  // 右分支
  drawBranch(
    ctx,
    nextPos,
    length * LEN_CHANGE_RATE,
    angle + getRandom(18, 30),
    thick * THICK_CHANGE_RATE
  );
};

/**
 * 递归中止条件检查
 */
const shouldBranchDraw = (
  ctx: CanvasRenderingContext2D,
  startPos: [number, number],
  thick: number
) => {
  // 极限生成中止(视为有开花的枝条)
  if (thick < 0.5) {
    drawFlower(ctx, startPos, getRandom(1, 5));
    return false;
  }

  // 随机生成中止(无花) 让树干更真实
  if (thick < 10 && Math.random() > 0.8) {
    return false;
  }
  if (thick < 5 && Math.random() < 0.2) {
    return false;
  }

  return true;
};

/** 绘制小花(简易圆) */
const drawFlower = (ctx: CanvasRenderingContext2D, pos: [number, number], radius: number) => {
  ctx.arc(...pos, radius, 0, Math.PI * 2);
  ctx.fillStyle = FLOWER_COLOR_SET[getRandom(0, FLOWER_COLOR_SET.length - 1)];
  ctx.fill();
};

/** 角度转换弧度 */
const degToRad = (deg: number) => (deg * Math.PI) / 180;

const getRandom = (min: number, max: number) =>
  ~~Math.max(Math.min(Math.random() * (max - min) + min, max), min);

const initCanvas = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = CVS_WIDTH;
  canvas.height = CVS_HEIGHT;
  const ctx = canvas.getContext('2d')!;

  // 将画布坐标系起始移动到 中央底部
  ctx.translate(CVS_WIDTH / 2, CVS_HEIGHT);
  // Y翻转 使得正Y方向是向上的(默认 canvas 以下为正)
  ctx.scale(1, -1);

  return ctx;
};

window.onload = () => {
  const ctx = initCanvas();
  drawBranch(ctx, [0, 0], START_LEN, START_ANGLE, START_THICK);
};
