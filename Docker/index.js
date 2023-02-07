const koa = require("koa");
const app = new koa();

app.use(async (ctx) => {
  console.log(`User from: ${ctx.request.origin}`);
  console.log(`User requesting: ${ctx.request.host}`);
  ctx.body = "Great, you access the docker-image!";
  ctx.status = 200;
});

app.listen(80, () => {
  console.log("server started on localhost");
});
