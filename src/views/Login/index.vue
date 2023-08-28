<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed, watch } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showToast, type FormInstance } from 'vant'
import { loginApi, codeApi } from '@/services/user'
import { useUserStore } from '@/stores/user'
const form = ref<FormInstance>()
const router = useRouter()
const route = useRoute()
const iscode = ref(true) //切换验证码登录
const time = ref(0)
let timeId: number
// 协议状态
const agree = ref<boolean>(false)
const code = ref('')
const rulForm = reactive({
  mobile: '13230000001',
  password: ''
})
//密码状态
const show = ref<boolean>(false)
//密码登录
const onSubmit = () => {
  console.log(rulForm.mobile, rulForm.password)
  console.log(agree)
  if (!agree.value) return showToast('请勾选我已同意')
  loginApi(rulForm).then((res) => {
    console.log(res)
    localStorage.setItem('token', JSON.stringify(res.data))
    showToast('登录成功')
  })
  // console.log('submit', values)
  // console.log(rulForm.mobile, rulForm.password)
}
//发送验证码
const send = () => {
  //倒计时>0不能发送验证码
  if (time.value > 0) return
  //验证码不通过阻止程序执行
  // await form.value?.validate('mobile')
  codeApi({ mobile: rulForm.mobile }).then((res) => {
    console.log(res)
  })
  time.value = 60
  //倒计时
  clearInterval(timeId)
  timeId = setInterval(() => {
    time.value--
    if (time.value <= 0) clearInterval(timeId)
  }, 1000)
}
// 父传子
const props = defineProps({})
</script>
<template>
  <div class="login-page">
    <!-- 头部组件 -->
    <cp-nav-bar right-text="注册" @click-right="$router.push('/register')"></cp-nav-bar>
    <div class="login-head">
      <h3>{{ iscode ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="iscode = !iscode">{{ !iscode ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow" />
      </a>
    </div>
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" autocomplete="off">
      <van-field
        name="mobile"
        v-model="rulForm.mobile"
        placeholder="请输入手机号"
        type="tel"
        :rules="mobileRules"
      />
      <van-field
        v-if="iscode"
        v-model="rulForm.password"
        placeholder="请输入密码"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        ><template #button>
          <cp-icons
            :name="`login-eye-${show ? 'on' : 'off'}`"
            @click="show = !show"
          ></cp-icons> </template
      ></van-field>
      <!-- 切换短信验证码登录 -->
      <van-field v-else v-model="code" :rules="codeRules" placeholder="短信验证码" type="text">
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="send">{{
            time > 0 ? `${time}s后再次发送` : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree" icon-size="16px">
          <span> 我已同意 </span>
          <a href="#">用户协议</a>
          <span> 及 </span>
          <a href="#">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部区域 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="/src/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
  }

  &-head {
    display: flex;
    padding: 20px 24px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    margin-top: 60px;
    margin-bottom: 20px;
    font-weight: 600;

    h3 {
      font-weight: 500;
      font-size: 18px;
      color: #000;
    }

    a {
      font-size: 14px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  margin-top: 10px;
  padding: 0 14px;

  .van-button {
    background: var(--cp-primary);
    border: none;
  }

  .cp-cell {
    height: 50px;
    line-height: 20px;
    padding: 10px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      font-size: 14px;

      a {
        color: var(--cp-primary);
      }
    }
  }
}

.btn-send {
  color: var(--cp-primary);

  &.active {
    color: rgba(22, 194, 163, 0.5);
  }
}
</style>
