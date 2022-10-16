const express = require("express");
const app = express();

let viewCount = 0;

app.get("/get", (req, res, next) => {
  viewCount++;
  console.log("9003服务器被访问,当前总浏览", viewCount);
  res.json({
    code: 200,
    message: "服务器端口9003",
  });
});

app.listen(9003, () => {
  console.log("server on 9003");
});
