<template>
  <el-container class="page-home">
    <!-- 头部 -->
    <el-header>
      <div class="title">
        <img src="../assets/logo.png" height="48" alt="">
        <p>CRM<span>客户关系管理系统</span></p>
      </div>
      <div class="head-menu" v-if="userInfo.role === 7">
        <router-link :to="{name: 'PreSupportAdd'}">添加售前支持记录</router-link>
        <router-link :to="{name: 'ImplementAdd'}">添加实施记录</router-link>
        <router-link :to="{name: 'AfterSupportAdd'}">添加售后支持记录</router-link>
        <router-link :to="{name: 'ServiceAdd'}">添加维修记录</router-link>
      </div>
      <div class="head-menu" v-else>
        <router-link :to="{name: 'CustomerAdd'}">添加客户</router-link>
        <router-link :to="{name: 'LiaisonAdd'}">添加联系人</router-link>
        <router-link :to="{name: 'RecordAdd'}">添加拜访记录</router-link>
        <router-link :to="{name: 'BusinessAdd'}">添加商机</router-link>
        <router-link to="#">添加OKR目标任务</router-link>
      </div>
      <div class="header-icon">
          <span>
            <el-link icon="el-icon-user" :underline="false">欢迎您，{{ userInfo.name }}</el-link>
          </span>
        <el-divider direction="vertical"/>
        <span>
            <el-link icon="el-icon-switch-button" :underline="false" @click="logout">退出</el-link>
          </span>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 左侧导航栏 -->
      <aside-menu :role="userInfo.role"/>
      <el-container>
        <!--右侧内容主体-->
        <el-main>
          <!--路由占位符-->
          <router-view></router-view>
        </el-main>
        <el-footer>
          &copy; 济南控创电子科技有限公司 -- 客户关系管理系统
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  // 侧边导航栏菜单
  import AsideMenu from '../components/common/Menu'
  import { AccountApis } from '../utils/api'
  import axios from 'axios'

  export default {
    name: 'Home',
    components: {
      AsideMenu
    },
    data () {
      return {
        userInfo: []
      }
    },
    methods: {
      // 获取用户详情信息
      getUserInfo () {
        axios.get(AccountApis.userInfoUrl).then(({ data }) => {
          this.userInfo = data
        }).catch(function (error) {
          console.log(error);
        })
      },
      // 用户登出
      logout () {
        // 跳转到登录
        this.$router.push({ name: 'Login' })
      },

      // 菜单折叠展开
      toggleCollapse () {
        this.isCollapse = !this.isCollapse
      },

      // 保存链接的激活状态
      saveNavState (activePath) {
        window.sessionStorage.setItem(activePath, activePath)
        this.activePath = activePath
      }
    },
    created () {
      // 查询接口
      this.getUserInfo()
    }
  }
</script>

<style lang="less">
  .page-home {
    .el-header {
      background-color: #3DA2DF;
      display: flex;
      justify-content: space-between;
      height: 70px !important;
      align-items: center;

      .title {
        color: white;
        display: flex;
        align-items: center;

        p {
          margin-left: 15px;
          font-size: 26px;

          span {
            font-size: 18px;
          }
        }
      }

      .head-menu {
        float: left;
        display: flex;
        justify-content: space-between;

        a {
          color: #fff;
          font-size: 16px;
          padding-right: 50px;
        }
        a:link {
          color: #fff;
          text-decoration: none;
        }
        a:hover {
          color: #7ec5f1;
          text-decoration: underline;
        }
      }

      .header-icon {
        position: relative;
        float: right;
        padding: 30px;

        span {
          margin: 0 10px;

          .el-link.el-link--default {
            color: #fff;
            font-size: 14px;
          }
        }
      }
    }

    .el-footer {
      width: 100%;
      height: 45px !important;
      line-height: 45px;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      z-index: 999;
    }
  }
</style>
