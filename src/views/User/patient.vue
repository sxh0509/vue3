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
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <div class="patient-item">
        <div class="info">
          <span class="name">李富贵</span>
          <span class="id">321***********6164</span>
          <span>男</span>
          <span>32岁</span>
        </div>
        <div class="icon"><cp-icon name="user-edit" /></div>
        <div class="tag">默认</div>
      </div>
      <div class="patient-item">
        <div class="info">
          <span class="name">李富贵</span>
          <span class="id">321***********6164</span>
          <span>男</span>
          <span>32岁</span>
        </div>
        <div class="icon"><cp-icon name="user-edit" /></div>
      </div>
      <div class="patient-add">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 ⼈</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
    }
  }
}
&.name {
  font-size: 16px;
  color: var(--cp-text1);
  width: 80px;
  margin-right: 0px;
}
&.id {
  color: var(--cp-text2);
  width: 180px;
}
.icon {
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
&.selected {
  border-color: var(--cp-primary);
  background-color: var(--cp-plain);
  .icon {
    color: var(--cp-primary);
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
</style>