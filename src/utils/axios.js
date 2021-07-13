import axios from 'axios'
import store from '../store/index'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在，则每个HTTP header都加上token
    if (store.state.userInfo.token) {
      config.headers.Authorization = `JWT ${store.state.userInfo.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  undefined,
  error => {
    let res = error.response
    switch (res.status) {
      case 401:
        console.log('未登录，或者token过期')
        window.app.$router.replace({ name: 'Login' })
      case 403:
        console.log('您没有该操作权限')
        window.app.$router.replace({ name: 'Login' })
      case 500:
        console.log('服务器错误')
        window.app.$router.replace({ name: 'Login' })
    }
    // 返回接口返回的错误信息
    return Promise.reject(error.response.data)
  }
)
