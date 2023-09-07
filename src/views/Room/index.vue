<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室">12</cp-nav-bar>
    聊天内容
    <button @click="$router.push('/order/pay?id=6938974658867200')">药品订单</button>
    <button @click="$router.push('/order/pay/result')">药品支付结果</button>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 46px;
}
</style>
