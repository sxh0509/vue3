<script setup lang="ts">
import { ref } from 'vue'
import type { KnowledgeType, KnowledgePage, KnowledgeList } from '@/types/consult'
import KnowledgeCard from '@/views/Home/components/KnowledgeCard.vue'
import { getConsultList } from '@/services/consult'
import type { KnowledgeParams } from '@/services/types/consult'
//接收父组件传递的参数
const props = defineProps<{
  type: KnowledgeType
}>()
const consultParams = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
//初始化变量保存返回的数据
const consultData = ref<KnowledgePage>()
// const data = reactive({})
//初始化变量保存列表数据
const list = ref<KnowledgeList>([])
//设置loading加载，false显示loading加载
const loading = ref(false)
//设置加载是否加载完毕true的话会显示没有更多 并让loading消失
const finished = ref(false)

//初始化请求
const initConsultList = async () => {
  const consultRes = await getConsultList(consultParams.value)
  consultData.value = consultRes.data
  // list.value = consultData.value.rows
  list.value.push(...consultData.value!.rows)
}

const onLoad = async () => {
  await initConsultList()
  if (consultData.value?.pageTotal) {
    if (consultParams.value.current >= consultData.value.pageTotal) {
      finished.value = true
    } else {
      consultParams.value.current++
      loading.value = false
    }
  }
  // const consultRes = await getConsultList(consultParams.value)
  // consultData.value = consultRes.data
  // list.value = consultData.value.rows
  //当前滚动的页码大于等于后台返回的总页码，说明数据已经加载完成

  // setTimeout(() => {
  //   const data = [1, 2, 3, 4, 5]
  //   list.value.push(...data)
  //   console.log(data)
  // }, 1000)
  // console.log(1)
}
</script>
<template>
  <div class="knowledge-list">
    <!-- {{ list }} -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      ><KnowledgeCard v-for="(item, index) in list" :key="index" :item="item"></KnowledgeCard
    ></van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
