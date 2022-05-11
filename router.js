const koaRouter = require('koa-router')
const router = new koaRouter()
const routerMine = new koaRouter({
  prefix: '/mine'
})
const HomeController = require('./controller/home')
const separateController = require('./controller/separate')
module.exports = (app) => {
  router
    .get( '/', HomeController.index )
    .get('/home', HomeController.home)
    .get('/home/:id/:name', HomeController.homeParams)
    .get('/user', HomeController.login)
    .get('/test', HomeController.test)
    .post('/testPost', HomeController.testPost)
    .post('/bd/testPost', HomeController.testPost)
    .post('/user/register', HomeController.register)
    .post('/loginMobile', HomeController.loginMobile)
    .get('/login', HomeController.login)
    .get('/v3login', HomeController.v3Login)
  /*分离接口 */
  routerMine
    .get('/getInfo', separateController.getUserInfo)
    .post('/login', separateController.myLogin)
    .post('/queryInfo', separateController.queryInfo)
    .post('/register', separateController.register)
    .get('/menuList', separateController.menuList)
    .post('/setUser', separateController.setUser)
    .post('/setMenu', separateController.setMenu)
    .post('/delMenu', separateController.delMenu)
    .post('/conditionQueryUser', separateController.conditionQueryUser)
    .post('/delUser', separateController.delUserControl)
    .post('/modifyInfo', separateController.modifyInfoControl)
    .get('/flatMenu', separateController.flatMenuControl)
  app
    .use(router.routes())
    .use(routerMine.routes())
    .use(router.allowedMethods())
    .use(routerMine.allowedMethods())
}