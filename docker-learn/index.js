const koa = require("koa");
const app = new koa();

app.use(async (ctx) => {
  console.log(`User from ${ctx.request.host}`);
  ctx.body = "Great, you access the docker-image!";
});

app.listen(80, () => {
  console.log("server started on localhost");
});
