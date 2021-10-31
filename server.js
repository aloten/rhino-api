const Koa = require('koa'),
  app = new Koa(),
  bodyParser = require('koa-bodyparser'),
  router = require('./router'),
  cors = require('@koa/cors');

const PORT = process.env.PORT || 5000;

app.proxy = true;

app.use(bodyParser());
app.use(cors());

app.use(async (ctx, next) => {
  console.log('request received', { method: ctx.method, path: ctx.path });
  await next();
});

app.use(router.routes());

console.log(`Server listening on port: ${PORT}`);
const server = app.listen(PORT);
