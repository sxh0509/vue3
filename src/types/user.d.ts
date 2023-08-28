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
