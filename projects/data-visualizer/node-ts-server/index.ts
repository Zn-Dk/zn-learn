import express, { Express, Router } from "express";
import axios from "axios";

import cors from "cors";

const app: Express = express();
app.use(
  cors({
    origin: true, //true 设置为 req.origin.url
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
    allowedHeaders:
      "x-requested-with,Authorization,token, content-type,anonymous", //跨域请求头
    preflightContinue: false, // 是否通过next() 传递options请求 给后续中间件
    maxAge: 1728000, //options预验结果缓存时间 20天
    credentials: true, //携带cookie跨域
    optionsSuccessStatus: 200, //opt
  })
);

const router: Router = express.Router();

router.get("/list", async (req, res) => {
  const { data } = await axios.post(
    "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf"
  );

  if (data) {
    res.send({
      ...data,
    });
  }
  // const data = require("./mock/data-20220929171517.json");
  // res.send({
  //   ...data,
  // });
});

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
