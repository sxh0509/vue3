import { ConsultType } from '@/enums'
import type { PartialConsult, ConsultIllness } from '@/types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import persist from 'pinia-plugin-persistedstate'
export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    const consult = ref<PartialConsult>({})
    //设置问诊类型
    const setType = (type: ConsultType) => (consult.value.type = type)
    //设置极速问诊类型
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    //设置科室
    const setDepId = (depId: string) => {
      console.log(depId)

      consult.value.depId = depId
    }
    //设置病情描述
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    //设置患者
    const setPatient = (id: string) => (consult.value.patientId = id)
    //设置优惠券
    const setCoupon = (id?: string) => (consult.value.couponId = id)
    //清空记录
    const clear = () => (consult.value = {})
    return { consult, setType, setIllnessType, setDepId, setIllness, setPatient, setCoupon, clear }
  },
  { persist: true }
)
