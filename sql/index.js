const mysql = require("mysql")
let pool = mysql.createConnection({
  host: "152.136.27.35",
  user: "root",
  password: "cxt@1qazWSX",
  database: "nodeTest",
  useConnectionPooling: true,
})
module.exports = {
  queryApi: async (sql) => {
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, data, fields) => {
          if (err) {
            reject(err.sqlMessage)
          } else {
            resolve(data)
          }
        }
      )
    })
  }
}