import type {
  MedicineOrderType,
  MedicineResponseType,
  MedicineType,
  OrderDetailResponseType,
  addressResponseType,
  OrderDetail
} from '@/types/order'

import { requests } from '@/utils/request'
// 获取收货地址
export const getAdderss = () => {
  return requests('/patient/order/address', 'GET')
}

// 获取药品信息
export const getMedicineInfo = (params: MedicineType) => {
  return requests('/patient/medicine/order/pre', 'GET', params)
}

// 生成药品订单
export const createMedicalOrder = (data: MedicineOrderType) => {
  return requests('/patient/medicine/order', 'POST', data)
}
//药品订单详情
export const getMedicalOrderDetail = (id: string) => {
  return requests(`/patient/medicine/order/detail/${id}`, 'GET')
}

export const getLogisticsDetail = (id: string) => {
  return requests(`/patient/order/${id}/logistics`, 'GET')
}
