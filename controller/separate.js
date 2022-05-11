const separateServer = require('../service/separateServer')
module.exports = {
  getUserInfo: async(ctx, next) => {
    let res = {
      retCode: 200,
      data: {
        name: '陈啸天',
        phone: '15254118769'
      },
      msg: "成功"
    }
    ctx.send(res)
  },
  myLogin: async(ctx, next) => {
    let params = ctx.request.body
    let name = params.name
    let password = params.password
    try {
      let res = await separateServer.myLogin(name, password)
      ctx.send(res)
    } catch (error) {
      console.log(error)
      ctx.send(error)
    }
  },
  queryInfo: async (ctx, next) => {
    let params = ctx.request.body
    let res = await separateServer.queryInfo(params)
    ctx.send(res)
  },
  register: async (ctx, next) => {
    let params = ctx.request.body
    let res = await separateServer.registerSev(params)
    ctx.send(res)
  },
  menuList: async (ctx, next) => {
    try {
      let res = await separateServer.menuListSev()
      ctx.send(res)
    } catch (error) {
      ctx.send(error)
    }
  },
  setUser: async (ctx, next) => {
    try {
      const params = ctx.request.body
      let res = await separateServer.setUser(params)
      ctx.send(res)
    } catch (error) {
      ctx.send(error)
    }
  },
  setMenu: async (ctx, next) => {
    try {
      const params = ctx.request.body
      let res = await separateServer.setMenu(params)
      ctx.send(res)
    } catch (error) {
      ctx.send(error)
    }
  },
  delMenu: async (ctx, next) => {
    try {
      const params = ctx.request.body
      let res = await separateServer.delMenu(params)
      ctx.send(res)
    } catch (error) {
      ctx.send(error)
    }
  },
  conditionQueryUser: async (ctx, next) => {
    try {
      const params = ctx.request.body
      let res = await separateServer.conditionQueryUser(params)
      ctx.send(res)
    } catch (error) {
      ctx.send(error)
    }
  },
  delUserControl: async (ctx, next) => {
    try {
      const params = ctx.request.body
      let res = await separateServer.delUserService(params)
      ctx.send(res)
    } catch (error) {
      ctx.send(error)
    }
  },
  // 扁平化菜单
  flatMenuControl: async (ctx, next) => {
    try {
      let res = await separateServer.flatMenuService()
      ctx.send(res)
    } catch (error) {
      ctx.send(error)
    }
  },
  // 修改密码
  modifyInfoControl: async (ctx, next) => {
    try {
      const params = ctx.request.body
      let res = await separateServer.modifyInfoService(params)
      ctx.send(res)
    } catch (error) {
      ctx.send(error)
    }
  },
}