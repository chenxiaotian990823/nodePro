const mysql = require("mysql")
const sqlQuery = require('../sql/index')
let pool = mysql.createConnection({
  host: "152.136.27.35",
  user: "root",
  password: "cxt@1qazWSX",
  database: "nodeTest",
  useConnectionPooling: true,
})
const util = require('../utils/util')
module.exports = {
  myLogin: async (name, password) => {
    let data
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM user WHERE phone = ${name}`,
        (err, data, fields) => {
          if (!name) {
            reject({
              retCode: 519,
              msg: "请输入正确的手机号",
              data: [],
            })
          } else if (err) {
            reject({
              retCode: 500,
              msg: err.sqlMessage,
              data: [],
            })
          } else if (data.length == 0) {
            reject({
              retCode: 521,
              msg: "查询不到此用户",
              data: [],
            })
          } else if (data[0].password != password) {
            reject({
              retCode: 520,
              msg: "密码不正确",
              data: [],
            })
          } else {
            resolve({
              retCode: 200,
              msg: "成功",
              data: data,
            })
          }
        }
      )
    })
  },
  queryInfo: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM user WHERE phone = ${params.name}`,
        (err, data, fields) => {
          if (err) {
            console.log("查询err", err)
            resolve({
              retCode: 500,
              msg: err.sqlMessage,
              data: [],
            })
          } else {
            console.log("data", data)
            resolve({
              retCode: 200,
              msg: "成功",
              data: data,
            })
            console.log("fields", fields)
          }
        }
      )
    })
  },
  registerSev: async (params) => {
    
  },
  menuListSev: async () => {
    return new Promise((resolve, reject) => {
      pool.query(`select * from menu`, (err, data, fields) => {
        if (err) {
          reject({
            retCode: 555,
            msg: err.sqlMessage,
            data: [],
          })
        } else if (data.length == 0) {
          resolve({
            retCode: 200,
            msg: "成功",
            data: data,
          })
        } else {
          let arr = util.recursionDataTree(data, 0)
          resolve({
            retCode: 200,
            msg: "成功",
            data: arr,
          })
        }
      })
    })
  },
  setUser: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into user (name,phone,password) values ('${params.name}', '${params.phone}', '${params.pass}')`,
        (err, data, fields) => {
          if (err) {
            reject({
              retCode: 555,
              msg: err.sqlMessage,
              data: [],
            })
          } else {
            resolve({
              retCode: 200,
              msg: "添加用户成功",
              data: data,
            })
          }
        }
      )
    })
  },
  setMenu: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into menu (title,path,parentId) values ('${params.title}','${params.path}',${params.parent})`,
        (err, data, fields) => {
          if (err) {
            reject({
              retCode: 555,
              msg: err.sqlMessage,
              data: [],
            })
          } else {
            resolve({
              retCode: 200,
              msg: "添加菜单成功",
              data: data,
            })
          }
        }
      )
    })
  },
  delMenu: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM menu WHERE id = ${params.id}`,
        (err, data, fields) => {
          if (err) {
            reject({
              retCode: 555,
              msg: err.sqlMessage,
              data: [],
            })
          } else {
            resolve({
              retCode: 200,
              msg: "删除菜单成功",
              data: data,
            })
          }
        }
      )
    })
  },
  // 条件查询user
  conditionQueryUser: async (params) => {
    return new Promise(async (resolve, reject) => {
      /**
       * 0 全部
       * 1 id
       * 2 姓名
       * 3 手机号
       */
      const filter = params.filter
      /**
       * 0 等于
       * 1 包含
       */
      const compare = params.compare
      const strkey = params.strkey
      const numkey = params.numkey
      const currentPage = params.currentPage
      const pageSize = params.pageSize
      const startNum = currentPage * pageSize
      const condition = ` order by id ASC limit ${startNum}, ${pageSize}`
      let queryStr = ``
      let countStr = ''
      if(compare == 0) {
        if(filter == 0) {
          queryStr = `select * from user`
        } else if(filter == 1) {
          queryStr = `select * from user where id = ${numkey}`
        } else if(filter == 2) {
          queryStr = `select * from user where name = '${strkey}'`
        } else if(filter == 3) {
          queryStr = `select * from user where phone = '${strkey}'`
        }
      } else {
        if(filter == 0) {
          queryStr = `select * from user`
        } else if(filter == 1) {
          queryStr = `select * from user where locate(${numkey}, id) > 0`
        } else if(filter == 2) {
          queryStr = `select * from user where locate('${strkey}', name) > 0`
        } else if(filter == 3) {
          queryStr = `select * from user where locate('${strkey}', phone) > 0`
        }
      }
      if(compare == 0) {
        if(filter == 0) {
          countStr = `select count(*) as total from user`
        } else if(filter == 1) {
          countStr = `select count(*) as total from user where id = ${numkey}`
        } else if(filter == 2) {
          countStr = `select count(*) as total from user where name = '${strkey}'`
        } else if(filter == 3) {
          countStr = `select count(*) as total from user where phone = '${strkey}'`
        }
      } else {
        if(filter == 0) {
          countStr = `select count(*) as total from user`
        } else if(filter == 1) {
          countStr = `select count(*) as total from user where locate(${numkey}, id) > 0`
        } else if(filter == 2) {
          countStr = `select count(*) as total from user where locate('${strkey}', name) > 0`
        } else if(filter == 3) {
          countStr = `select count(*) as total from user where locate('${strkey}', phone) > 0`
        }
      }
      try {
        let res = await sqlQuery.queryApi(queryStr + condition)
        let total = await sqlQuery.queryApi(countStr)
        resolve({
          retCode: 200,
          msg: '成功',
          data: res,
          totalCount: total[0].total,
          currentPage: currentPage,
          pageSize: pageSize
        })
      } catch (error) {
        reject({
          msg: error,
          retCode: 555,
          data: [],
          totalCount: 0,
          currentPage: currentPage,
          pageSize: pageSize
        })
      }
    })
  },
  // 删除用户
  delUserService: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `delete from user where id = ${params.id}`,
        (err, data, fields) => {
          if (err) {
            reject({
              retCode: 555,
              msg: err.sqlMessage,
              data: [],
            })
          } else {
            resolve({
              retCode: 200,
              msg: "成功",
              data: data,
            })
          }
        }
      )
    })
  },
  // 扁平化菜单列表
  flatMenuService: async () => {
    return new Promise( async (resolve, reject) => {
      let sqlStr = `select * from menu`
      try {
        let res = await sqlQuery.queryApi(sqlStr)
        resolve({
          msg: '成功',
          data: res,
          retCode: 200
        })
      } catch (error) {
        reject({
          msg: error,
          retCode: 500,
          data: []
        })
      }
    })
  },
  // 修改密码
  modifyInfoService: async (params) => {
    return new Promise( async (resolve, reject) => {
      let sqlStr = `update user set password = ${params.newPass}, phone = ${params.newPhone}, name = ${params.newName} where id = ${params.id}`
      try {
        let res = await sqlQuery.queryApi(sqlStr)
        resolve({
          msg: '成功',
          data: res,
          retCode: 200
        })
      } catch (error) {
        reject({
          msg: error,
          retCode: 500,
          data: []
        })
      }
    })
  },
}
