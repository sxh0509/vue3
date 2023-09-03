export type KnowledgeType = 'recommend' | 'fatReduction' | 'food' | 'like'
import { ConsultType, IllnessTime } from '@/enums'
export type Knowledge = {
  // 文章id
  id: string
  // 文章标题
  title: string
  // 封面地址
  coverUrl: string[]
  // 百科关联的话题
  topics: string[]
  // 收藏数量
  collectionNumber: number
  // 评论数量
  commentNumber: number
  // 创建人姓名
  creatorName: string
  // 创建人头像
  creatorAvatar: string
  // 创建人医院
  creatorHospatalName: string
  // 是否关注0未关注1关注
  likeFlag: 0 | 1
  // 内容详情
  content: string
  // 创建人科室
  creatorDep: string
  // 创建人职称
  creatorTitles: string
  // 创建人id
  creatorId: string
}

export type KnowledgeList = Knowledge[]

export type KnowledgePage = {
  // 总页数
  pageTotal: number
  // 总条数
  total: number
  // 数据
  rows: KnowledgeList
}

//通用的分页查询参数
export type PageParams = {
  // 页码
  current: number
  // 条数
  pageSize: number
}

export type Doctor = {
  /**
   * 医生头像
   */
  avatar: string
  consultationNum: number
  /**
   * 科室名称
   */
  depName: string
  /**
   * 医院等级-名称简写
   */
  gradeName: string
  /**
   * 医院名称
   */
  hospitalName: string
  /**
   * 医生id
   */
  id: string
  /**
   * 未登录用户默认返回0，登录用户实际判断是否关注的标志1已关注0未关注
   */
  likeFlag: 0 | 1
  major: string
  /**
   * 医生姓名
   */
  name: string
  /**
   * 职称
   */
  positionalTitles: string
  score: number
  /**
   * 接诊费用
   */
  serviceFee: number
}

export type DoctorList = Doctor[]

export type DoctorPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}

export type LikeParams = {
  /**
   * 对应的id
   */
  id: string
  /**
   * topic百科话题,knowledge百科文章,doc医生,disease疾病
   */
  type: string
}
export type FollowType = 'topic' | 'knowledge' | 'doc' | 'disease'
// 图⽚列表
export type Image = {
  // 图⽚ID
  id: string
  // 图⽚地址
  url: string
}
// 问诊记录
export type Consult = {
  // 问诊记录ID
  id: string
  // 问诊类型
  type: ConsultType
  // 快速问诊类型，0 普通 1 三甲
  illnessType: 0 | 1
  // 科室ID
  depId: string
  // 疾病描述
  illnessDesc: string
  // 疾病持续时间
  illnessTime: IllnessTime
  // 是否就诊过，0 未就诊过 1 就诊过
  consultFlag: 0 | 1
  // 图⽚数组
  pictures: Image[]
  // 患者ID
  patientId: string
  // 优惠券ID
  couponId: string
}
// 问诊记录-全部可选
export type PartialConsult = Partial<Consult>
// Required 转换为全部必须 Partial 转换问全部可选 两个内置的泛型类型

//科室
export type SubDep = {
  //科室id
  id: String
  //科室名称
  name: string
}
export type TopDep = SubDep & {
  //二级科室数组
  child: SubDep[]
}

export type DepList = TopDep[]

//表单数据
export type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>
// 问诊订单预⽀付传参
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>
// 问诊订单预⽀付信息
export type ConsultOrderPreData = {
  // 积分抵扣
  pointDeduction: number
  // 优惠券抵扣
  couponDeduction: number
  // 优惠券ID
  couponId: string
  // 需付款
  payment: number
  // 实付款
  actualPayment: number
}
