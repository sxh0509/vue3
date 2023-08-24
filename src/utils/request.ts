import type { InternalAxiosRequestConfig, AxiosResponse, Method } from 'axios'
import axios from 'axios'
import { useUserStore } from '../stores/user'
import { showToast } from 'vant'
import router from '../router'

// console.log('axios', axios)
const instance = axios.create({
  baseURL: '/dev-api',
  timeout: 1000
})
// console.log('instance', instance)

//请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //通过请求头发送token
    const store = useUserStore()
    if (store.user?.token) {
      config.headers.Authorization = 'Bearer' + store.user.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//响应拦截器
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data.code !== 10000) {
      showToast(res.data.message)
      //错误的业务码返回出去
      return Promise.reject(res.data)
    }
    return res.data
  },
  (error) => {
    //token过期处理
    if (error.response.status == 401) {
      //1.清空本地的用户信息/token pinia用户信息/token
      const store = useUserStore()
      store.delUser()
      //2.回到登录页
      router.push(`/login?${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(error)
  }
)

const request = (url: string, method: Method, submitData?: object) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

// instance.get
// instance.post
// instance({
//   url: '',
//   method: '',
//   data: {}
// })
export default instance
