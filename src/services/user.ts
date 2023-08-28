import request from '@/utils/request'
import type { CodeType, User } from '@/types/user'
import type { CodeTypeRules } from './types/user.d'
import type { UserInfo } from '@/types/user.d'
//登录接口/密码登录
export const loginApi = (params: any) => request.post('/login/password', params)
// 发送验证码
export const codeApi = (params: any) => request.get('/code', { params })
//个人信息
export const userApi = (params: any) => request.get('/patient/myUser', { params })
