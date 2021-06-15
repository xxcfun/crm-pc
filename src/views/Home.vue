<template>
  <el-container class="page-home">
    <!-- 头部 -->
    <el-header>
      <div class="title">
        <img src="../assets/logo.png" height="48" alt="">
        <p>CRM<span>客户关系管理系统</span></p>
      </div>
      <div class="head-menu">
        <router-link :to="{name: 'CustomerAdd'}">添加客户</router-link>
        <router-link :to="{name: 'LiaisonAdd'}">添加联系人</router-link>
        <router-link :to="{name: 'RecordAdd'}">添加拜访记录</router-link>
        <router-link :to="{name: 'BusinessAdd'}">添加商机</router-link>
        <router-link to="#">添加OKR目标任务</router-link>
      </div>
      <div class="header-icon">
          <span>
            <el-link icon="el-icon-user" :underline="false">欢迎您，{{ user.username }}</el-link>
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
      <aside-menu/>
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
  import { mapState } from 'vuex'
  // 侧边导航栏菜单
  import AsideMenu from '../components/common/Menu'
  import { ajax } from '../utils/ajax'
  import { AccountApis } from '../utils/api'
  import * as types from '../store/mutation-types'

  export default {
    name: 'Home',
    components: {
      AsideMenu
    },
    data () {
      return {
        admin: '管理员'
      }
    },
    methods: {
      // 查询用户信息
      getUserInfo () {
        ajax.get(AccountApis.userInfoUrl).then(({ data }) => {
          console.log('Mine-getUserInfo', data)
          this.$store.commit(types.UPDATE_USER_INFO, data)
        })
      },

      // 用户登出
      logout () {
        // 调用接口，退出登录
        ajax.get(AccountApis.logoutUrl).then(() => {
          // 提示用户
          this.$message({
            message: '您已退出登录',
            type: 'success'
          })
          // 删除用户登录的信息
          this.$store.commit(types.DELETE_USER_INFO)
          // 跳转到首页去
          this.$router.push({ name: 'Login' })
        })
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
    computed: mapState(['user']),
    mounted () {
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
