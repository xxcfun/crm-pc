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
        ROLE_AD = 0, '系统管理员'
        ROLE_JL = 1, '经理'
        ROLE_YW = 2, '业务'
        ROLE_ZG = 3, '主管'
        ROLE_SW = 4, '商务'
        ROLE_RS = 5, '人事'
        ROLE_SQ = 6, '售前'
        ROLE_JS = 7, '技术'
      -->
      <!-- 经理 -->
      <div v-if="role === 1">
        <el-submenu :index="item.id + ''" v-for="item in adminMenuList" :key="item.id">
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
      </div>
      <!-- 人事 -->
      <div v-else-if="role === 5">
        <el-submenu :index="item.id + ''" v-for="item in RSMenuList" :key="item.id">
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
      </div>
      <!-- 超级管理员 -->
      <div v-else-if="role === 0">
        <el-submenu :index="item.id + ''" v-for="item in RSMenuList" :key="item.id">
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
      </div>
      <!-- 后端人员 -->
      <div v-else-if="role === 7">
        <el-submenu :index="item.id + ''" v-for="item in JSMenuList" :key="item.id">
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
      </div>
      <!-- 业务 -->
      <div v-else>
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
      </div>

    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: 'Menu',
    props: ['role'],
    data () {
      return {
        // 左侧菜单表
        // 业务
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
                path: 'data/own'
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
        ],
        // 经理
        adminMenuList: [
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
                path: 'customer/all'
              },
              {
                id: 402,
                authName: '所有联系人',
                path: 'liaison/all'
              },
              {
                id: 403,
                authName: '所有拜访记录',
                path: 'record/all'
              },
              {
                id: 404,
                authName: '所有商机',
                path: 'business/all'
              }
            ]
          },
          {
            id: 50,
            authName: '售前售后',
            children: [
              {
                id: 501,
                authName: '售前支持',
                path: 'presupport/all'
              },
              {
                id: 502,
                authName: '实施送测',
                path: 'implement/all'
              },
              {
                id: 503,
                authName: '售后支持',
                path: 'aftersupport/all'
              },
              {
                id: 504,
                authName: '售后维修',
                path: 'service/all'
              },
            ]
          }
        ],
        // 人事 管理员
        RSMenuList: [
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
            id: 40,
            authName: '管理列表',
            children: [
              {
                id: 401,
                authName: '所有客户',
                path: 'customer/all'
              },
              {
                id: 402,
                authName: '所有联系人',
                path: 'liaison/all'
              },
              {
                id: 403,
                authName: '所有拜访记录',
                path: 'record/all'
              },
              {
                id: 404,
                authName: '所有商机',
                path: 'business/all'
              }
            ]
          },
        ],
        // 技术
        JSMenuList: [
          {
            id: 40,
            authName: '管理列表',
            children: [
              {
                id: 401,
                authName: '所有客户',
                path: 'customer/all'
              },
              {
                id: 402,
                authName: '所有联系人',
                path: 'liaison/all'
              },
              {
                id: 403,
                authName: '所有拜访记录',
                path: 'record/all'
              },
              {
                id: 404,
                authName: '所有商机',
                path: 'business/all'
              }
            ]
          },
          {
            id: 50,
            authName: '售前售后',
            children: [
              {
                id: 501,
                authName: '售前支持',
                path: 'presupport'
              },
              {
                id: 502,
                authName: '实施送测',
                path: 'implement'
              },
              {
                id: 503,
                authName: '售后支持',
                path: 'aftersupport'
              },
              {
                id: 504,
                authName: '售后维修',
                path: 'service'
              },
            ]
          }
        ],
        // 左侧菜单图标对象
        iconsObj: {
          10: 'el-icon-s-promotion',
          20: 'el-icon-s-marketing',
          30: 'el-icon-s-data',
          40: 'el-icon-s-flag',
          50: 'el-icon-s-release'
          // 60: 'el-icon-s-platform'
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
