import request from '@/utils/request'
import type { KnowledgeParams, PageParams, TopDep } from './types/consult'
import type { ConsultOrderPreData, ConsultOrderPreParams } from '@/types/consult'
//首页 查询推荐/减脂/饮食健康...
export const getConsultList = (knowledgeParams: KnowledgeParams) => {
  return request.get('/patient/home/knowledge', knowledgeParams as any)
}
// 获取医生列表
export const getDoctorPage = (pageParams: PageParams) => {
  return request.get('/home/page/doc', pageParams)
}

export const getAllDep = () => request.get('/dep/all')

export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request.post('/upload', fd)
}
// 拉取预⽀付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request.get('/patient/consult/order/pre', { params })
