const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')

const miSend = require('./mi-send')
// 引入日志中间件
const miLog = require('./mi-log')
// 引入异常处理中间件
// const miHttpError = require('./mi-http-error')
module.exports = (app) => {
  // 注册中间件
  app.use(miLog())
  // app.use(miHttpError())
  app.use(staticFiles(path.resolve(__dirname, "../public")))
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }));
  app.use(bodyParser())
  app.use(miSend())
}