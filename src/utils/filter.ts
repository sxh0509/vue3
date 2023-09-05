import { ConsultFlag, IllnessTime } from '@/enums'

export const getIllnessTimeText = (value: string | number) => {
  const timeOptions = [
    { lable: '一周内', value: IllnessTime.Week },
    { lable: '一月内', value: IllnessTime.Month },
    { lable: '半年内', value: IllnessTime.HalfYear },
    { lable: '半年以上', value: IllnessTime.More }
  ]
  const data = timeOptions.find((item) => item.value === value)
  return data?.lable as string
}

export const getConsultFlagText = (value: string | number) => {
  const flagOptions = [
    { lable: '就诊过', value: ConsultFlag.isFlag },
    { lable: '没就诊过', value: ConsultFlag.noFlag }
  ]
  const data = flagOptions.find((item) => item.value === value)
  return data?.lable as string
}
