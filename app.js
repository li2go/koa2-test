const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const middleware = require('./lib/middleware');

const router = require('./routes');

const modelSync = require('./lib/common/modelSync');

modelSync(); // 生成数据库表

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(middleware.cors); // 设置跨域访问

app.use(router.routes(), router.allowedMethods());

// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;