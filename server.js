const Koa = require('koa'),
  app = new Koa(),
  bodyParser = require('koa-bodyparser'),
  router = require('./router'),
  // cors = require('@koa/cors'),
  serve = require('koa-static'),
  path = require('path');

const PORT = process.env.PORT || 5000;

app.proxy = true;

// middleware
app.use(bodyParser());
// app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(serve(path.join(__dirname, 'client/build')));
}

app.use(async (ctx, next) => {
  console.log('request received', { method: ctx.method, path: ctx.path });
  await next();
});

// routes
app.use(router.routes());

console.log(`Server listening on port: ${PORT}`);
const server = app.listen(PORT);
