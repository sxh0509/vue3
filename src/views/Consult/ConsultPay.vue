<script setup lang="ts">
import type { PatientType } from '@/types/user'
import { getPatientDetail } from '@/services/user'
import { ref, onMounted } from 'vue'
import { useConsultStore } from '@/stores/consult'
import type { ConsultOrderPreData } from '@/types/consult'
import { getConsultOrderPre, createConsultOrder, getConsultOrderPayUrl } from '@/services/consult'
import { showToast } from 'vant'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { Dialog, showConfirmDialog } from 'vant'
const store = useConsultStore()
const agree = ref(false)
const show = ref(false)
const paymentMethod = ref<0 | 1>()
const loading = ref(false)
const orderId = ref('')
const router = useRouter()
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})
// 获取预支付信息
const payInfo = ref<ConsultOrderPreData>()
// const initPayInfo = async () => {
//   const payInfoRes = await getConsultOrderPre({
//     type: store.consult.type,
//     illnessType: store.consult.illnessType
//   })
//   store.setCouponId(payInfoRes.data.couponId as string)
//   console.log('payInfoRes', payInfoRes)
//   payInfo.value = payInfoRes.data
// }
// initPayInfo()
const loadData = async () => {
  const res = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  console.log(store.consult.type)

  // console.log(res)

  payInfo.value = res.data
  // // 设置默认优惠券
  store.setCoupon(payInfo.value?.couponId)
}
// loadData()
const patient = ref<PatientType>()
const loadPatient = async () => {
  if (!store.consult.patientId) return
  const res = await getPatientDetail(store.consult.patientId)
  patient.value = res.data
}
onMounted(() => {
  // if (
  //   !store.consult.type ||
  //   !store.consult.illnessType ||
  //   !store.consult.depId ||
  //   !store.consult.patientId
  // ) {
  //   return Dialog.alert({
  //     title: '温馨提示',
  //     message: '问诊信息不完整请重新填写，如有未⽀付的问诊订单可在问诊记录中继续⽀付',
  //     closeOnPopstate: false
  //   }).then(() => {
  //     router.push('/')
  //   })
  // }
  loadData()
  loadPatient()
})
//立即支付事件
const submit = async () => {
  if (!agree.value) return showToast('请勾选我已同意支付协议')
  // console.log(111)
  //打开弹框
  try {
    show.value = true
    loading.value = true
    const res = await createConsultOrder(store.consult)
    console.log(res)
    orderId.value = res.data.id
    store.clear()
    loading.value = false
    // store.clear()
  } finally {
    loading.value = false
  }
}
const pay = async () => {
  if (!paymentMethod.value) return showToast('请选择支付方式')

  const res = await getConsultOrderPayUrl({
    orderId: orderId.value,
    paymentMethod: paymentMethod.value,
    payCallback: 'http://localhost:5173/#/room'
  })
  window.location.href = res.data.payUrl
}
const onClose = () => {
  return showConfirmDialog({
    title: '关闭⽀付',
    message: '取消⽀付将⽆法获得医⽣回复，医⽣接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续⽀付',
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then((res) => {
      // on confirm
      return false
    })
    .catch(() => {
      // on cancel
      orderId.value = ''
    })
}
</script>
<template>
  <div class="consult-pay-page">
    <cp-nav-bar title="支付" />
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payInfo?.payment }} 元</p>
      <img src="@/assets/avatar-doctor.svg" alt="" class="img" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <!--  -->
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo?.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo?.pointDeduction}`" />
      <van-cell title="实付款" :value="`¥${payInfo?.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <!-- 患者信息 -->
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patient?.name} | ${patient?.genderValue} | ${patient?.age}岁`"
      ></van-cell>
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">⽀付协议</span></van-checkbox>
    </div>
    <!-- 底部按钮 -->
    <van-submit-bar
      v-if="payInfo"
      button-type="primary"
      :loading="loading"
      :price="payInfo?.actualPayment * 100"
      button-text="⽴即⽀付"
      text-align="left"
      @click="submit"
    />
    <!-- 拉起支付方式 -->
    <!-- <van-action-sheet v-model:show="show" title="选择支付方式" :closeable="false">
      <div class="pay-type">
        <p class="amount">￥{{ payInfo?.actualPayment.toFixed(2) }}</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="paymentMethod = 0">
            <template #icon><cp-icons name="consult-wechat" /></template>
            <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
          </van-cell>
          <van-cell title="支付宝支付" @click="paymentMethod = 1">
            <template #icon><cp-icons name="consult-alipay" /></template>
            <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
          </van-cell>
        </van-cell-group>
        <div class="btn">
          <van-button type="primary" round block @click="pay">立即支付</van-button>
        </div>
      </div>
    </van-action-sheet> -->
    <cp-pay-sheet
      v-model:show="show"
      :orderId="orderId"
      :actualPayment="payInfo?.actualPayment"
      :onClose="onClose"
      payCallback="room"
    ></cp-pay-sheet>
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
  .pay-info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;
    .tit {
      width: 100%;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
      border-radius: 4px;
      overflow: hidden;
    }
    .desc {
      flex: 1;
      > span {
        display: block;
        color: var(--cp-tag);
        &:first-child {
          font-size: 16px;
          color: var(--cp-text2);
        }
      }
    }
  }
  .pay-price {
    ::v-deep() {
      .vam-cell__title {
        font-size: 16px;
      }
      .van-cell__value {
        font-size: 16px;
        color: var(--cp-price);
      }
    }
  }
  .pay-space {
    height: 12px;
    background-color: var(--cp-bg);
  }
  .pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      color: var(--cp-primary);
    }
  }
}
::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
    background-color: var(--cp-primary);
  }
  .pay-type {
    padding: 20px;
    .amount {
      padding: 20px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    .btn {
      padding: 15px;
    }
    .van-cell {
      align-items: center;
      .cp-icon {
        margin-right: 10px;
        font-size: 18px;
        .van-checkbox:deep(.van-checkbox__icon) {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
