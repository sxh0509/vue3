<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed, watch } from 'vue'
const router = useRouter()
const route = useRoute()
const data = reactive({})
// 父传子
const props = defineProps({})
</script>
<template>
  <div class="-page"></div>
</template>

<style lang="scss" scoped></style>
