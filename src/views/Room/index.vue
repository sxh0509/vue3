<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { useUserStore } from '@/stores/user'
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '@/enums'
import { getConsultOrderDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { nextTick } from 'vue'
import type { Image } from '@/types/consult'
import dayjs from 'dayjs'
import { showToast } from 'vant'
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const list = ref<Message[]>([])
const loading = ref(false)
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const initialMsg = ref(true)
let socket: Socket
onMounted(async () => {
  socket = io('https://consult-api.itheima.net', {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })
  socket.on('connect', () => {
    // 建⽴连接成功
    console.log('connect')
    list.value = []
  })
  socket.on('error', (event) => {
    // 错误异常消息
    console.log('error')
    console.log(event)
  })
  socket.on('disconnect', () => {
    // 已经断开连接
    console.log('disconnect')
  })
  //监听默认聊天信息
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    console.log('data', data)
    const arr: Message[] = []
    data.forEach((item, index) => {
      if (index === 0) time.value = item.createTime
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    console.log('arr', arr)

    list.value.unshift(...arr)
    loading.value = false
    if (!data.length) {
      return showToast('没有聊天记录了')
    }
    nextTick(() => {
      if (initialMsg.value) {
        socket.emit('updateMsgStatus', arr[arr.length - 1].id)
        window.scrollTo(0, document.body.scrollHeight)
        initialMsg.value = false
      }
    })
  })
  //监听订单状态是否改变
  socket.on('statusChange', () => {
    initOrderDetail()
  })
  //接收消息
  socket.on('receiveChatMsg', async (event) => {
    list.value.push(event)
    console.log(list.value)
    //接收消息再滚动
    await nextTick(() => {})
    socket.emit('updateMsgStatus', event.id)
    window.scrollTo(0, document.body.scrollHeight)
  })
})
const consult = ref<ConsultOrderItem>()
//获取订单详情
const initOrderDetail = async () => {
  const orderRes = await getConsultOrderDetail(route.query.orderId as string)
  console.log(orderRes)
  consult.value = orderRes.data
}
initOrderDetail()
//传递过来的内容
const sendText = async (text: string) => {
  console.log('text', text)
  socket.emit('sendChatMsg', {
    //发送人
    from: store.user?.id,
    //接收人
    to: consult.value?.docInfo?.id,
    //发送消息的类型
    msgType: MsgType.MsgText,
    //消息内容
    msg: { content: text }
  })
}
const sendImage = (img: Image) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: { picture: img }
  })
}
//下拉刷新
const onRefresh = () => {
  //触发下拉
  socket.emit('getChatMsgList', 20, time.value, route.query.orderId)
}
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室">12</cp-nav-bar>
    <!-- 聊天内容
    <button @click="$router.push('/order/pay?id=6938974658867200')">药品订单</button>
    <button @click="$router.push('/order/pay/result')">药品支付结果</button> -->
    <room-status :status="consult?.status" :countdown="consult?.countdown" />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <room-message :list="list"></room-message>
    </van-pull-refresh>
    <room-action @send-text="sendText" @send-image="sendImage" />
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 24vw;
  background: var(--cp-bg);
  padding-bottom: 16vw;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
