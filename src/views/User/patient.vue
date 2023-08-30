<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed, watch } from 'vue'
import { getPatientApi, addApi, editApi } from '@/services/user'
import type { PatientList, PatientType } from '@/types/user'
import { showToast } from 'vant'
import Validator from 'id-validator'
import { showNotify } from 'vant'
const router = useRouter()
const route = useRoute()
const data = reactive({})

const showRight = ref<boolean>(false)
//打开弹出层
const add = (item?: PatientType) => {
  console.log(item)
  if (item) {
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else {
    patient.value = { ...initPatient }
  }
  showRight.value = true
}
//关闭弹框
const backPopup = () => {
  showRight.value = true
}
//请求家庭档案列表数据
const cardList = ref<PatientList>()
const huoList = () => {
  getPatientApi({}).then((res) => {
    console.log(res)
    cardList.value = res.data
  })
}
huoList()
//男 / 女
const options = [
  { lable: '男', value: 1 },
  { lable: '女', value: 0 }
]
//初始化
const initPatient: PatientType = {
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 1
}
//表单数据/数据
const patient = ref<PatientType>({ ...initPatient })
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    console.log('value', value)
    patient.value.defaultFlag = value ? 1 : 0
  }
})
//右侧保存按钮
const submit = async () => {
  // console.log(11)
  if (!patient.value.name) return showToast('请输⼊真实姓名')
  if (!patient.value.idCard) return showToast('请输⼊身份证号')
  const validator = new Validator()
  if (!validator.isValid(patient.value.idCard)) return showToast('身份证格式错误')
  const { sex } = validator.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return showToast('性别和身份证不符')
  //保存/编辑 患者
  patient.value.id ? await editApi(patient.value) : await addApi(patient.value)
  showRight.value = false
  huoList()
  showNotify(patient.value.id ? '编辑成功' : '添加成功')
}
</script>
<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <div class="patient-item" v-for="(item, index) in cardList" :key="index">
        <div class="info">
          <span class="name" style="font-weight: 800">{{ item.name }}</span>
          <span class="id" style="margin-left: 16px">{{
            item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2')
          }}</span>
          <div class="da">
            <span style="color: var(--cp-text3)">{{ item.genderValue }}</span>
            <span style="color: var(--cp-text3); margin-left: 20px">{{ item.age }}岁</span>
          </div>
        </div>
        <div class="icon" @click="add(item)"><cp-icons name="user-edit" /></div>
        <div class="tag" v-if="item.defaultFlag == 1">默认</div>
      </div>
      <div class="patient-add" @click="add()" v-if="cardList && cardList?.length <= 6">
        <cp-icons name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 ⼈</div>
    </div>
    <!-- 弹出框 添加患者 -->
    <van-popup
      v-model:show="showRight"
      position="right"
      duration="0.8"
      :style="{ width: '100%', height: '100%' }"
    >
      <cp-nav-bar
        :back="backPopup"
        :title="patient.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        @click-right="submit"
      >
      </cp-nav-bar>
      <!-- 表单 -->
      <van-form autocomplete="off">
        <van-field label="真实姓名" v-model="patient.name" placeholder="" />
        <van-field label="身份证号" v-model="patient.idCard" placeholder="" />
        <van-field label="性别">
          <template #input>
            <cp-radio-btn :options="options" v-model="patient.gender"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;

  .patient-list {
    padding: 15px;

    .patient-item {
      // display: flex;
      // align-items: center;
      padding: 15px;
      height: 70px;
      background-color: var(--cp-bg);
      border-radius: 8px;
      margin-bottom: 15px;
      position: relative;
      border: 1px solid var(--cp-bg);
      transition: all 0.3s;
      overflow: hidden;

      .info {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;

        &.name {
          font-size: 16px;
          // color: var(--cp-text1);
          width: 70px;
          margin-right: 40px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &.id {
          color: var(--cp-text2);
          width: 180px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .icon {
        position: absolute;
        right: 15px;
        top: 40px;
        color: var(--cp-tag);
        width: 20px;
        text-align: center;
      }

      .tag {
        position: absolute;
        right: 60px;
        top: 21px;
        width: 30px;
        height: 16px;
        font-size: 10px;
        color: #fff;
        background-color: var(--cp-primary);
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;

  .cp-icon {
    font-size: 24px;
  }
}

.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}

.da {
  position: absolute;
  top: 46px;
  left: 15px;
}

.van-form {
  margin-top: 50px;
}
</style>
