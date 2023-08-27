import request from '@/utils/request'

//登录接口/密码登录
export const loginApi = (params: any) => request.post('/login/password', params)
