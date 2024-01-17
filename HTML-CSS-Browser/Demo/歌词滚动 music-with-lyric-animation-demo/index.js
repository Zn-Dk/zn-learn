const lineClass = 'lyric-line'; // 歌词行
const activeClass = 'current';

const lyricContentDiv = document.querySelector('.lyric-content');
let allLyricDom;
const audio = document.querySelector('audio');

// 页面歌词最顶部距离页面的高度
let lyricWrapOffsetTop;
// 页面高度
let windowHeight;

const bindEvents = () => {

  audio.addEventListener('timeupdate', ev => {
    const currentTime = audio.currentTime;
    // 找到第一个比当前时间大的歌词然后减去 1 即为当前歌词索引
    const currentIdx = lyric.findIndex(line => line.time > currentTime) - 1;
    [...allLyricDom].forEach(line => line.classList.remove(activeClass))

    const currentLyricDom = allLyricDom[currentIdx];
    const currentLyricOffsetTop = currentLyricDom.offsetTop;
    const currentLyricOffsetHeight = currentLyricDom.offsetHeight;
    const halfWindowHeight = windowHeight / 2;
    // 添加激活样式
    currentLyricDom.classList.add(activeClass);

    // 是否跨过屏幕中部
    // 歌词相对页面顶部的距离 = 自身offsetTop(相对于content) + contentWrapTop, 大于屏幕高度一半即成立
    const isContentBelowPageMid = (currentLyricOffsetTop + lyricWrapOffsetTop) > halfWindowHeight

    // 如果跨过中部, 则 content 需要向上偏移
    if(isContentBelowPageMid) {
      // 当前歌词offsetTop + 高度 + 50 padding + 10歌词变大缩放系数 - 一半页面高度
      lyricContentDiv.style.transform = `translateY(-${
        ((currentLyricOffsetTop + currentLyricOffsetHeight + 50 + 10) - halfWindowHeight)
      }px)`;
    } else {
      lyricContentDiv.style.transform = 'translateY(0)';
    }
  });
};

/** 处理原始歌词 */
const processLyric = rawLyric => {
  const lines = rawLyric.split('\n');
  return lines.map(line => {
    const splitLine = line.split(']');
    const content = splitLine[1];
    const time = splitLine[0].replace('[', '').split(':');
    const timeInSec = time[0] * 60 + time[1] * 1;

    return {
      time: timeInSec,
      content,
    };
  });
};

const createLyricLine = ({ content }) => {
  const line = document.createElement('div');
  line.classList.add(lineClass);
  line.textContent = content;
  return line;
};

/** 渲染歌词至页面 */
const renderLyric = lyric => {
  const frag = document.createDocumentFragment();
  lyric.forEach(line => {
    return frag.appendChild(createLyricLine(line));
  });

  lyricContentDiv.appendChild(frag);
  allLyricDom = lyricContentDiv.querySelectorAll('.lyric-line');
  // 获得页面歌词距离页面顶部的高度以及本身页面高度
  lyricWrapOffsetTop = document.querySelector('.lyric-wrap').offsetTop;
  windowHeight = window.innerHeight;
};

const init = async () => {
  const rsp = await fetch('./assets/demo.lrc');
  const blob = await rsp.blob();
  const reader = new FileReader();

  bindEvents();

  reader.readAsText(blob);
  reader.onload = function (e) {
    lyric = processLyric(e.target.result);
    renderLyric(lyric);
  };
};

init();

