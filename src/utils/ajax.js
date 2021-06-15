import axios from 'axios'
import qs from 'qs'

export const ajax = axios.create({
  headers: {
    source: 'html5',
    icode: 'abcd',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // 对请求的参数做格式化处理
  transformRequest: function (data, headers) {
    return qs.stringify(data)
  },
  // 携带cookie
  withCredentials: true
})

ajax.interceptors.response.use(function (response) {
  // 对响应数据做些什么
  return response
}, function (error) {
  // 对响应错误做些什么
  if (error.response) {
    if (error.response.status === 401) {
      window.app.$message({
        message: '未登录，即将跳转到登录页面',
        type: 'danger'
      })
      window.app.$router.replace({ name: 'Login' })
    } else if (error.response.status === 500) {
      window.app.$message({
        message: '服务器正忙，请稍后再试',
        type: 'danger'
      })
    } else if (error.response.status === 400) {
      const data = error.response.data
      let msg = data.error_msg ? data.error_msg : '参数错误'
      if (data.error_list) {
        const keys = Object.keys(data.error_list)
        const errObj = data.error_list[keys[0]][0]
        msg = `${errObj.message}, ${errObj.code}`
        window.app.$message(msg)
      }
    }
  }
  return Promise.reject(error)
})
