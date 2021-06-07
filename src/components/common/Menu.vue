<template>
  <!--侧边菜单栏-->
<!--  <el-aside class="menu" :width="'200px'">-->
  <el-aside class="menu" :width="isCollapse ? '64px' : '200px'">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <!--侧边栏菜单区域-->
    <el-menu
      :default-active="activePath"
      :router="true"
      :unique-opened="false"
      :collapse="isCollapse"
      :collapse-transition="true"
      :default-openeds="open_list"
    >
      <!--一级菜单-->
      <!--
        这里:index不能接受数值，只能接受字符串，而在item.id获取的是数值，在后面拼接一个空字符可以转换为字符串
      -->
      <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">

        <!--一级菜单的模板区域-->
        <template slot="title">
          <!--图标-->
          <i :class="iconsObj[item.id]"></i>
          <!--文本-->
          <span>{{ item.authName }}</span>
        </template>

        <!--二级菜单-->
        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                      @click="saveNavState('/' + subItem.path)">
          <!--二级菜单的模板区域-->
          <template slot="title">
            <!--图标-->
            <i class="el-icon-menu"></i>
            <!--文本-->
            <span>{{ subItem.authName }}</span>
          </template>
        </el-menu-item>

      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: 'Menu',
    data () {
      return {
        // 左侧菜单表
        menuList: [
          {
            id: 10,
            authName: '数据汇总',
            children: [
              {
                id: 101,
                authName: '数据一览',
                path: 'data'
              },
              {
                id: 102,
                authName: '一周工作汇总',
                path: 'data/week'
              }
            ]
          },
          {
            id: 20,
            authName: 'OKR管理',
            children: [
              {
                id: 201,
                authName: 'OKR',
                path: 'okr'
              }
            ]
          },
          {
            id: 30,
            authName: '客户管理',
            children: [
              {
                id: 301,
                authName: '客户列表',
                path: 'customer'
              },
              {
                id: 302,
                authName: '联系人列表',
                path: 'liaison'
              },
              {
                id: 303,
                authName: '拜访记录列表',
                path: 'record'
              },
              {
                id: 304,
                authName: '商机列表',
                path: 'business'
              }
            ]
          },
          {
            id: 40,
            authName: '管理列表',
            children: [
              {
                id: 401,
                authName: '所有客户',
                path: 'forms'
              },
              {
                id: 402,
                authName: '所有联系人',
                path: 'table'
              },
              {
                id: 403,
                authName: '所有拜访记录',
                path: 'forms'
              },
              {
                id: 404,
                authName: '所有商机',
                path: 'table'
              }
            ]
          },
          {
            id: 50,
            authName: '业务大屏',
            children: [
              {
                id: 501,
                authName: '大屏展示',
                path: 'bigscreen'
              }
            ]
          }
        ],
        // 左侧菜单图标对象
        iconsObj: {
          10: 'el-icon-s-promotion',
          20: 'el-icon-s-marketing',
          30: 'el-icon-s-data',
          40: 'el-icon-s-flag',
          50: 'el-icon-s-platform'
        },
        // 展开的菜单
        open_list: ['10', '20', '30', '40', '50'],
        // 是否折叠
        isCollapse: false,
        // 被激活的链接地址
        activePath: ''
      }
    },
    created () {
      // 向sessionStorage中存上activepath路由状态，让导航菜单高亮
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      // 菜单折叠展开
      toggleCollapse () {
        this.isCollapse = !this.isCollapse
      },

      // 保存链接的激活状态
      saveNavState (activePath) {
        window.sessionStorage.setItem(activePath, activePath)
        this.activePath = activePath
      }
    }
  }
</script>

<style lang="less">
  /* 侧边菜单栏样式 */
  .menu {
    height: 100%;
    background-color: #fff;

    .el-submenu {
      .el-submenu__title {
        text-align: left;
        height: 46px;
        line-height: 46px;
      }

      .el-menu-item {
        text-align: left;
        height: 40px;
        line-height: 40px;
      }
    }

    .el-aside {

      .el-menu {
        border-right: none;
      }
    }

    .el-main {
      background-color: #eaedf1;
      padding: 10px;
    }

    .iconfont {
      margin-right: 10px;
    }

    .toggle-button {
      background-color: #7ec5f1;
      font-size: 10px;
      line-height: 36px;
      color: #ffffff;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
  }
</style>
