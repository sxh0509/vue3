import request from '@/utils/request'
import { requests } from '@/utils/request'
import type { KnowledgeParams, PageParams } from './types/consult'
import type {
  ConsultOrderPreData,
  ConsultOrderPreParams,
  PartialConsult,
  ConsultOrderListParams,
  ConsultOrderPage,
  ConsultOrderItem
} from '@/types/consult'
import { OrderType } from '@/enums'
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

//生成订单
export const createConsultOrder = (data: PartialConsult) =>
  request.post('/patient/consult/order', data)
//生成支付的api函数
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request.post('/patient/consult/pay', params)
//查询api
export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request.get('/patient/consult/order/list', { params })
//取消订单
export const cancelOrder = (id: string) => request.put(`/patient/order/cancel/${id}`)
//删除订单
export const deleteOrder = (id: string) => request.delete(`/patient/order/${id}`)
// 查看处方
export const getPrescriptionPic = (id: string | number) => {
  return request.get<{ id: string; url: string }>(`patient/consult/prescription/${id}`)
}
//订单详情
export const getConsultOrderDetail = (orderId: string) => {
  return requests('/patient/consult/order/detail', 'GET', { orderId })
}
