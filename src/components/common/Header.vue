<template>
  <!--头部区域-->
  <el-header class="header">
    <div class="title">
      <img src="../../assets/logo.png" height="48" alt="">
      <p>CRM<span>客户关系管理系统</span></p>
    </div>
    <div class="header-icon">
          <span>
            <el-link icon="el-icon-user" :underline="false">欢迎您，{{admin}}</el-link>
          </span>
      <el-divider direction="vertical"/>
      <span>
            <el-link icon="el-icon-switch-button" :underline="false" @click="logout">退出</el-link>
          </span>
    </div>
  </el-header>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        admin: '管理员'
      }
    },
    methods: {
      // 用户登出
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped lang="less">
  /* 页面头部样式 */
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
</style>
