import request, { requests } from '@/utils/request'
import type { CodeType, User, PatientType } from '@/types/user'
import type { CodeTypeRules } from './types/user.d'
import type { UserInfo } from '@/types/user'
//登录接口/密码登录
export const loginApi = (params: any) => request.post('/login/password', params)
// 发送验证码
export const codeApi = (params: any) => request.get('/code', { params })
//个人信息
export const userApi = (params: any) => request.get('/patient/myUser', { params })
//家庭档案信息
export const getPatientApi = (params: any) => request.get('/patient/mylist', { params })
//添加
export const addApi = (patient: PatientType) => {
  return request.post('/patient/add', patient)
}
//编辑
export const editApi = (patient: PatientType) => {
  return request.put('/patient/update', patient)
}
// 查询患者详情
export const getPatientDetail = (id: string) => request.get(`/patient/info/${id}`)
//短信登录
export const loginByMobile = (mobile: string, code: string) =>
  requests('/login', 'POST', { mobile, code })
