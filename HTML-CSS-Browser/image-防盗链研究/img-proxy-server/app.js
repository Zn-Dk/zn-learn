import express from "express";
import https from "https";
import { writeFileSync } from "fs";
import { join, resolve } from "path";
const app = express();

app.use(
  express.static("./img/", {
    cacheControl: true,
    maxAge: 1000 * 60 * 60 * 24 * 3,
  })
);

// 实现代理 帮助前端获取防盗链图片
// img?url=xxxxx.png
let isProcessing = false; // 防止重复请求
app.get("/img", (req, res) => {
  const url = req.query.url;
  if (url) {
    const fileName = parseFileName(url);
    const imgPath = join("./img/", fileName);
    if (!isProcessing) {
      isProcessing = true;
      fetchImg(url, imgPath, () => {
        res.setHeader("Location", fileName);
        res.sendStatus(301);
        isProcessing = false;
      });
    }
  }
});

app.listen(3333, () => {
  console.log("server started: http://localhost:3333");
});

/**
 *
 * @param {string} url query 中的 url 地址
 * @returns {string} 解析完成的 filename 如果非图片扩展名 生成随机名.png
 */
function parseFileName(url) {
  const filenameMatch = url.match(
    /^https?:\/\/.*\/.*\/([\w\d]+\.(jpe?g|png|gif|webp)).*/
  );
  return filenameMatch ? filenameMatch[1] : genRandomName();
}

/**
 * @param {string} url 远程图片地址
 * @param {string} savePath 存储路径
 * @param {Function} callback
 */
async function fetchImg(url, savePath, callback) {
  const raw = [];
  https.get(url, (res) => {
    res.on("data", (chunk) => {
      raw.push(chunk);
    });
    res.on("end", () => {
      const buffer = Buffer.concat(raw);
      writeFileSync(savePath, buffer);
      callback();
    });
  });
}

function genRandomName() {
  return Math.random().toString(36).slice(-8) + ".png";
}
