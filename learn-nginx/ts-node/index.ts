import express, { Router } from "express";
const app = express();

app.get("/portal/msg", (req, res, next) => {
  res.json({
    code: 200,
    message: "恭喜你通过 Nginx 反向代理获得这条信息!",
  });
});

app.listen(3001, () => {
  console.log("server on 3001");
});
