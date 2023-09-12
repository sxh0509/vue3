<script setup lang="ts">
import { ref } from 'vue'
import { showToast, showLoadingToast } from 'vant'
import { getConsultOrderPayUrl } from '@/services/consult'

const props = defineProps<{
  show: boolean
  orderId: string
  actualPayment: number
  onClose?: () => void
  payCallback: string
}>()
const emits = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()
const paymentMethod = ref<0 | 1>()

const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({
    message: '选择支付',
    forbidClick: true
  })
  //
  const res = await getConsultOrderPayUrl({
    orderId: props.orderId,
    paymentMethod: paymentMethod.value,
    payCallback: 'http://localhost:5173/#/' + props.payCallback
  })
  window.location.href = res.data.payUrl
}
</script>
<template>
  <div class="-page">
    <!-- 拉起支付方式 -->
    <van-action-sheet
      :show="show"
      title="选择支付方式"
      :closeable="false"
      :before-close="onClose"
      :close-on-popstate="false"
      @update:show="emits('update:show', $event)"
    >
      <div class="pay-type">
        <p class="amount">￥{{ actualPayment.toFixed(2) }}</p>
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
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped></style>
