import request from '@/utils/request'
import type { KnowledgeParams, PageParams } from './types/consult'

//首页 查询推荐/减脂/饮食健康...
export const getConsultList = (knowledgeParams: KnowledgeParams) => {
  return request.get('/patient/home/knowledge', knowledgeParams as any)
}
// 获取医生列表
export const getDoctorPage = (pageParams: PageParams) => {
  return request.get('/home/page/doc', pageParams)
}
