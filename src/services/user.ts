import request from '@/utils/request'
import type { CodeType, User } from '@/types/user'
//登录接口/密码登录
export const loginApi = (params: any) => request.post('/login/password', params)
// 发送验证码
export const codeApi = (params: any) => request.get('/code', { params })
