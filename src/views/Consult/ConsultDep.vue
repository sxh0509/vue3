<script setup lang="ts">
import { useConsultStore } from '@/stores/consult'
import { ref, onMounted, computed } from 'vue'
import type { DepList, SubDep } from '@/types/consult'
import { getAllDep } from '@/services/consult'
const store = useConsultStore()
const active = ref(0)
//一级科室
const allDep = ref<DepList[]>([])
// onMounted(async () => {
//   const res = await getAllDep()
//   allDep.value = res.data
// })
const initDepList = async () => {
  const depRes = await getAllDep()
  allDep.value = depRes.data
  // childList.value = list.value[active.value].child
}
initDepList()
//二级科室
// const subDep = computed(() => allDep.value[active.value]?.child)
const subDep = computed(() => {
  return allDep.value[active.value]?.child
})
console.log(subDep)
</script>
<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室"></cp-nav-bar>
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="(item, index) in allDep" :key="index" :title="item.name" />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          to="/consult/illness"
          v-for="(sub, index) in subDep"
          :key="index"
          @click="store.setDepId(sub.id)"
          >{{ sub.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
</style>
