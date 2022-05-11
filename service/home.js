module.exports = {
  register: async function(name, pwd) {
    let data 
    if(name == 'ikcamp' && pwd == '123456'){
      data = {
        status: 0,
        data: {
          title: "个人中心",
          content: "欢迎进入个人中心"
        }
      }
    }else{
      data = {
        status: -1,
        data: {
          title: '登录失败',
          content: "请输入正确的账号信息"
        }
      }
    }
    return data
  },
  testPost: async (param) => {
    let data
    if(param.name == '陈啸天') {
      data = {
        status: 200,
        data: '成功'
      }
    }else {
      data = {
        status: 500,
        data: '失败'
      }
    }
    return data
  },
  login: async (params) => {
    console.log(params.id, typeof(params.id))
    let data
    if(params.id == '12') {
      data = {
        status: 200,
        msg: '成功',
        list: [
          {id: 1, name: '陈啸天'},
          {id: 2, name: '陈啸天'},
          {id: 3, name: '陈啸天'},
          {id: 4, name: '陈啸天'},
          {id: 5, name: '陈啸天'}
        ]
      }
    }else {
      data = {
        status: 500,
        msg: '失败'
      }
    }
    return data
  }
}