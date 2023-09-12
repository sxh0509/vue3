<script setup lang="ts">
import { ref } from 'vue'
import { uploadImage } from '@/services/consult'
import type { Image } from '@/types/consult'
import { showLoadingToast, closeToast, showToast } from 'vant'
import { Toast } from 'vant'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
//将输入框输入的内容传递给父组件
//父组件将接收到的消息通过ws发送给服务端
const emit = defineEmits<{
  (e: 'send-text', text: string): void
  (e: 'send-image', img: Image): void
}>()
const text = ref<string>('')
//回车
const sendText = () => {
  emit('send-text', text.value)
  text.value = ''
}
//图片上传
const afterRead = async (data: any) => {
  console.log('file', data)
  if (!data.file) return

  showLoadingToast('正在上传')

  const res = await uploadImage(data.file)
  closeToast()

  emit('send-image', res.data)
}
</script>
<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医⽣"
      autocomplete="off"
      v-model="text"
      @keyup.enter="sendText"
    ></van-field>
    <van-uploader multiple :preview-image="false" :after-read="afterRead">
      <cp-icons name="consult-img" />
    </van-uploader>
  </div>
</template>
<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
