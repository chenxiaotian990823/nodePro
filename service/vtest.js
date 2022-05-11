const request = require('request')
module.exports = {
  loginMobile: async (name, pwd) => {
    let requestData = {
      mobile: name,
      password: pwd
    }
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: "https://test.power-www.com/qld2/user/loginMobile",
          method: "POST",
          json: true,
          headers: {
            "content-type": "application/json",
          },
          body: requestData
        },
        (error, response, body) => {
          if (!error && response.statusCode == 200) {
            resolve(body)
          } else {
            reject(body)
          }
        }
      )
    })
  },
}
