<script setup lang="ts">
import KnowledgeList from './components/KnowledgeList.vue'
import type { KnowledgeType } from '@/types/consult.d.ts'
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed, watch } from 'vue'

import FollowDoctor from './components/FollowDoctor.vue'
import { useConsultStore } from '@/stores/consult'
import { ConsultType } from '@/enums'
const store = useConsultStore()
const active = ref<KnowledgeType>('recommend')
const router = useRouter()
const route = useRoute()
const data = reactive({})
// 父传子
// const props = defineProps({})
</script>
<template>
  <div class="home-page">
    <div class="home-header">
      <div class="con">
        <h1>优医</h1>
        <div class="search">
          <cp-icons name="home-search" />
          搜一搜：疾病/症状/医生/健康知识
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <div class="home-navs">
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icons name="home-doctor" class="icon" />
            <p class="title">问医生</p>
            <p class="desc">按科室查问医生</p>
          </router-link>
        </van-col>
        <van-col span="8"
          ><router-link to="/consult/fast" @click="store.setType(ConsultType.Fast)" class="nav">
            <cp-icons name="home-graphic" class="icon" />
            <p class="title">极速问诊</p>
            <p class="desc">按科室查问医生</p>
          </router-link></van-col
        >
        <van-col span="8"
          ><router-link to="/" class="nav">
            <cp-icons name="home-prescribe" class="icon" />
            <p class="title">开药门诊</p>
            <p class="desc">按科室查问医生</p>
          </router-link></van-col
        >
      </van-row>
      <div class="home-con">
        <van-row>
          <van-col span="6">
            <router-link to="/" class="nav">
              <cp-icons name="home-order" class="icon1" />
              <p class="desc">药品订单</p>
            </router-link>
          </van-col>
          <van-col span="6"
            ><router-link to="/consult/fast" class="nav">
              <cp-icons name="home-docs" class="icon1" />
              <p class="desc">健康档案</p>
            </router-link></van-col
          >
          <van-col span="6">
            <router-link to="/" class="nav">
              <cp-icons name="home-rp" class="icon1" />
              <p class="desc">我的处方</p>
            </router-link> </van-col
          ><van-col span="6"
            ><router-link to="/" class="nav">
              <cp-icons name="home-find" class="icon1" />
              <p class="desc">疾病查询</p>
            </router-link></van-col
          >
        </van-row>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="home-banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item><img src="/src/assets/ad.png" alt="" /></van-swipe-item>
        <van-swipe-item><img src="/src/assets/ad.png" alt="" /></van-swipe-item>
      </van-swipe>
    </div>
    <!--  -->
    <van-tabs sticky shrink v-model:active="active">
      <van-tab name="like" title="关注">
        <FollowDoctor></FollowDoctor>
        <KnowledgeList type="like"></KnowledgeList>
      </van-tab>
      <van-tab name="recommend" title="推荐">
        <KnowledgeList type="recommend"></KnowledgeList>
      </van-tab>
      <van-tab name="fatReduction" title="减脂">
        <KnowledgeList type="fatReduction"></KnowledgeList>
      </van-tab>
      <van-tab name="food" title="饮食">
        <KnowledgeList type="fatReduction"></KnowledgeList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;
}

.home-header {
  height: 100px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }

  .con {
    position: relative;
    padding: 0 15px;

    > h1 {
      font-size: 18px;
      color: #fff;
      font-weight: normal;
      padding: 20px 0;
      line-height: 1;
      padding-left: 5px;
    }

    .search {
      height: 40px;
      border-radius: 20px;
      box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: var(--cp-dark);
      font-size: 13px;

      .cp-icon {
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }
}

.home-navs {
  padding: 10px 15px 0 15px;

  .nav {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px 0;

    .icon {
      font-size: 48px;
    }

    .icon1 {
      font-size: 30px;
    }

    .title {
      color: var(--cp-text1);
      font-weight: 700;
      margin-top: 5px;
    }

    .desc {
      color: var(--cp-text3);
      font-size: 12px;
      margin-top: 4px;
    }
  }
}

.home-banner {
  padding: 10px 15px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
