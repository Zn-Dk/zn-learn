var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var CVS_WIDTH = window.innerWidth * 0.8;
var CVS_HEIGHT = window.innerHeight * 0.6;
var BRANCH_COLOR = '#533'; // 枝干颜色
var FLOWER_COLOR_SET = ['#FF1493', '#fff', 'orange', 'pink']; // 花朵颜色
var START_LEN = 100;
var START_ANGLE = 90;
var START_THICK = 50;
var LEN_CHANGE_RATE = 0.8;
var THICK_CHANGE_RATE = 0.75;
/**
 * 绘制分支主函数
 * @param startPos 起始左边
 * @param angle 相对于 x 的偏转角
 * @param thick 树枝粗细
 */
var drawBranch = function (ctx, startPos, length, angle, thick) {
    if (angle === void 0) { angle = 90; }
    if (thick === void 0) { thick = 10; }
    // 检查是否继续绘制分支
    if (!shouldBranchDraw(ctx, startPos, thick)) {
        return;
    }
    ctx.beginPath();
    // 起始坐标
    ctx.moveTo.apply(ctx, startPos);
    // 画线(计算为 x -> sin angle(角度转换弧度) * length, y -> cos angle * length)
    var nextPos = [
        startPos[0] + Math.cos(degToRad(angle)) * length,
        startPos[1] + Math.sin(degToRad(angle)) * length,
    ];
    ctx.lineTo.apply(ctx, nextPos);
    // 颜色
    ctx.strokeStyle = BRANCH_COLOR;
    // 粗细
    ctx.lineWidth = thick;
    // 线条端点设置成圆弧状
    ctx.lineCap = 'round';
    ctx.stroke();
    // 递归
    // 左分支
    drawBranch(ctx, nextPos, length * LEN_CHANGE_RATE, angle - getRandom(18, 30), thick * THICK_CHANGE_RATE);
    // 右分支
    drawBranch(ctx, nextPos, length * LEN_CHANGE_RATE, angle + getRandom(18, 30), thick * THICK_CHANGE_RATE);
};
/**
 * 递归中止条件检查
 */
var shouldBranchDraw = function (ctx, startPos, thick) {
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
var drawFlower = function (ctx, pos, radius) {
    ctx.arc.apply(ctx, __spreadArray(__spreadArray([], pos, false), [radius, 0, Math.PI * 2], false));
    ctx.fillStyle = FLOWER_COLOR_SET[getRandom(0, FLOWER_COLOR_SET.length - 1)];
    ctx.fill();
};
/** 角度转换弧度 */
var degToRad = function (deg) { return (deg * Math.PI) / 180; };
var getRandom = function (min, max) {
    return ~~Math.max(Math.min(Math.random() * (max - min) + min, max), min);
};
var initCanvas = function () {
    var canvas = document.getElementById('canvas');
    canvas.width = CVS_WIDTH;
    canvas.height = CVS_HEIGHT;
    var ctx = canvas.getContext('2d');
    // 将画布坐标系起始移动到 中央底部
    ctx.translate(CVS_WIDTH / 2, CVS_HEIGHT);
    // Y翻转 使得正Y方向是向上的(默认 canvas 以下为正)
    ctx.scale(1, -1);
    return ctx;
};
window.onload = function () {
    var ctx = initCanvas();
    drawBranch(ctx, [0, 0], START_LEN, START_ANGLE, START_THICK);
};
