// 引入 service 文件
const HomeService = require('../service/home')
const vtestService = require('../service/vtest')
module.exports = {
  home: async(ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    ctx.response.body = '<h1>HOME page</h1>'
  },
  homeParams: async(ctx, next) => {
    console.log(ctx.params)
    ctx.response.body = '<h1>HOME page /:id/:name</h1>'
  },
  login: async(ctx, next) => {
    await ctx.render('home/login',{
      btnName: '登录'
    })
  },
  // 修改 index 方法
  index: async function (ctx, next) {
    await ctx.render("myPro/index", {title: "欢迎您"})
  },
  // 修改 register 方法
  register: async function (ctx, next){
    let params = ctx.request.body
    let name = params.name
    let password = params.password
    let res = await HomeService.register(name,password)
    if(res.status == "-1"){
      await ctx.render("home/login", res.data)
    }else{
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  },
  test: async (ctx, next) => {
    await ctx.render('test/index', {title: "测试界面"})
  },
  testPost: async (ctx, next) => {
    // ctx.set("Content-Type", "application/json")
    // ctx.body = JSON.stringify(json)
    // ctx.send({
    //   status: 'success',
    //   data: 'hello ikcmap'
    // })
    let params = ctx.request.body
    let res = await HomeService.testPost(params)
    console.log(res)
    ctx.send(res)
  },
  login: async (ctx, next) => {
    let params = ctx.request.query
    let res = await HomeService.login(params)
    ctx.send(res)
  },
  loginMobile: async (ctx, next) => {
    let params = ctx.request.body
    let name = params.name
    let password = params.pad
    let res = await vtestService.loginMobile(name, password)
    ctx.send(res)
  },
  v3Login: async (ctx, next) => {
    await ctx.render('v3test/index', {title: "vue3测试登录界面"})
  },
}