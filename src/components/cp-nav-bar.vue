<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed, watch } from 'vue'
const router = useRouter()
const route = useRoute()
const data = reactive({})
const onClickLeft = () => {
  console.log(1)
}
// 父传子
const props = defineProps({})
</script>
<template>
  <div class="son">
    <van-nav-bar title="" right-text="注册" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<style lang="scss" scoped></style>
