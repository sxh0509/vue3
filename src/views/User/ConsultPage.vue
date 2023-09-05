<script setup lang="ts">
import ConsultList from './components/ConsultList.vue'
import { ConsultType } from '@/enums'
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed, watch } from 'vue'
const router = useRouter()
const route = useRoute()
const data = reactive({})
const onClickLeft = () => {
  router.go(-1)
}
</script>
<template>
  <div class="consult-page">
    <!-- <cp-nav-bar title="问诊记录"> -->
    <van-nav-bar title="问诊记录" left-arrow @click-left="onClickLeft" />
    <van-tabs sticky>
      <van-tab title="极速问诊">
        <ConsultList :type="ConsultType.Fast"></ConsultList>
      </van-tab>
      <van-tab title="找医⽣"><consult-list :type="ConsultType.Doctor" /></van-tab>
      <van-tab title="开药问诊"><consult-list :type="ConsultType.Medication" /></van-tab>
    </van-tabs>
    <!-- </cp-nav-bar> -->
  </div>
</template>

<style lang="scss" scoped>
.consult-page {
  // padding-top: 46px;
  background-color: var(--cp-bg);
  height: calc(100vh - 46px);
}
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }

    &__text {
      font-size: 15px;
      color: var(--cp-primary);
    }
  }
}
</style>
