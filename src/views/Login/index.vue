<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed, watch } from 'vue'
import { mobileRules, passwordRules } from '@/utils/rules'
const router = useRouter()
const route = useRoute()
// 协议状态
const agree = ref<boolean>(false)
const rulForm = reactive({
  mobile: '',
  password: ''
})
//密码状态
const show = ref<boolean>(false)
const onSubmit = (values: any) => {
  console.log(rulForm.mobile, rulForm.password)

  // console.log('submit', values)
  // console.log(rulForm.mobile, rulForm.password)
}
// 父传子
const props = defineProps({})
</script>
<template>
  <div class="login-page">
    <!-- 头部组件 -->
    <cp-nav-bar
      title="登录"
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cp-nav-bar>
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="">
        <span>短信验证码登录</span>
        <van-icon name="arrow" />
      </a>
    </div>
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" autocomplete="off">
      <van-field v-model="rulForm.mobile" placeholder="请输入手机号" :rules="mobileRules" />
      <van-field
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
</style>
