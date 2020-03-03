import baseURL from "./config.js"

function request(option){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + option.url,
      data: option.data,
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  })
}

export default request;