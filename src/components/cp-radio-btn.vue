<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed, watch } from 'vue'
const router = useRouter()
const route = useRoute()
const data = reactive({})
// 父传子
// const props = defineProps({})
defineProps<{
  options: {
    lable: string
    value: number | string
  }[]
  modelValue?: string | number
}>()
const emits = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()
const toggleItem = (value: string | number) => {
  console.log(value)
  emits('update:modelValue', value)
}
</script>
<template>
  <div class="cp-radio-btn">
    <a
      href="javascript:;"
      class="item"
      :class="{ active: modelValue == item.value }"
      v-for="(item, index) in options"
      :key="index"
      @click="toggleItem(item.value)"
      >{{ item.lable }}</a
    >
  </div>
</template>

<style lang="scss" scoped>
.cp-radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    min-width: 60px;
    height: 32px;
    line-height: 30px;
    background: var(--cp-bg);
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--cp-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--cp-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;
    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>
