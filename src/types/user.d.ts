export type User =
  | {
      id: number | string
      token: string
      account: string
      mobile: string | number
      avatar: string
    }
  | undefined
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

type OmitUser = Omit<User, 'token'>

export type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

// 家庭档案列表类型
export type PatientType = {
  // 患者姓名
  name: string
  // 患者身份证号
  idCard: string
  // 是否设置为默认患者 0不是默认 1是默认患者
  defaultFlag: 0 | 1
  // 性别 1男 0女
  gender?: 0 | 1
  // 性别值
  genderValue?: number
  // 年龄
  age?: number
  // id
  id?: string
}

export type PatientList = PatientType[]
