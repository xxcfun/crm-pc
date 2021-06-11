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
