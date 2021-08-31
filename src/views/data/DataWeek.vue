<template>
  <!-- 周数据汇总 -->
  <div class="page-data-week">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">数据汇总</el-breadcrumb-item>
      <el-breadcrumb-item>一周数据汇总</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索栏 -->
    <el-form :model="searchForm" ref="searchForm" :inline="true">
      <el-form-item label="创建人" prop="user">
        <el-select v-model="searchForm.user" placeholder="请选择员工" clearable>
          <el-option
            v-for="item in userList" :key="item.id"
            :label="item.name" :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="周" prop="week">
        <el-date-picker
          v-model="searchForm.week"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        <el-button icon="el-icon-circle-close" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <div class="hr">客户总览：</div>
    <template>
      <el-table
        v-loading="loading"
        :data="CustomerList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="rank"
          label="客户级别"
          width="170">
        </el-table-column>
        <el-table-column
          prop="scale"
          label="客户规模"
          width="170">
        </el-table-column>
        <el-table-column
          prop="industry"
          label="客户行业"
          width="170">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="250">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="创建人"
          width="150">
        </el-table-column>
      </el-table>
    </template>

    <div class="hr">联系人总览：</div>
    <template>
      <el-table
        v-loading="loading"
        :data="LiaisonList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="联系人姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="customer.name"
          label="客户名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          width="150">
        </el-table-column>
        <el-table-column
          prop="job"
          label="职位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="injob"
          label="是否在职"
          width="120">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="250">
        </el-table-column>
        <el-table-column
          prop="user.name"
          fixed="right"
          label="创建人"
          width="150">
        </el-table-column>
      </el-table>
    </template>

    <div class="hr">拜访记录总览：</div>
    <template>
      <el-table
        v-loading="loading"
        :data="RecordList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="theme"
          label="拜访主题"
          width="300">
        </el-table-column>
        <el-table-column
          prop="customer.name"
          label="客户名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="status"
          label="拜访方式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="main"
          label="主要事宜"
          width="500">
        </el-table-column>
        <el-table-column
          prop="next"
          label="后续工作安排"
          width="500">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="250">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="创建人"
          width="150">
        </el-table-column>
      </el-table>
    </template>

    <div class="hr">商机总览：</div>
    <template>
      <el-table
        v-loading="loading"
        :data="BusinessList"
        style="width: 100%; margin-bottom: 35px;"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商机名称"
          width="260">
        </el-table-column>
        <el-table-column
          prop="customer.name"
          label="客户名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="winning_rate"
          label="赢单率"
          width="100">
        </el-table-column>
        <el-table-column
          prop="money"
          label="预估金额"
          width="150">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="300">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="创建人"
          width="150">
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
  import axios from 'axios'
  import { AccountApis, DataApis } from '../../utils/api'

  export default {
    name: 'DataWeek',
    data () {
      return {
        // 搜索数据
        searchForm: {
          user: '',
          week: ''
        },
        // 是否可以清除
        clearable: true,
        // 是否加载
        loading: true,
        // 用户列表
        userList: [],
        // 客户列表
        CustomerList: [],
        // 联系人列表
        LiaisonList: [],
        // 拜访记录列表
        RecordList: [],
        // 商机列表
        BusinessList: []
      }
    },
    methods: {
      // 提交查询
      onSubmit () {
        // 重置数据
        this.CustomerList = []
        this.LiaisonList = []
        this.RecordList = []
        this.BusinessList = []
        // 执行查询
        this.loadData()
      },
      // 重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
        // 重置页面数据
        this.CustomerList = []
        this.LiaisonList = []
        this.RecordList = []
        this.BusinessList = []
        // 重置完成后，重新调用接口
        this.loadData()
      },
      // 统一列颜色
      setCellColor ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 1) {
          return 'color: #3DA2DF; font-weight: bold;'
        }
      },
      // 获取一周工作数据
      // 客户数据
      getCustomerList () {
        this.loading = true
        axios.get(DataApis.weekCustomerUrl, {
          params: {
            username: this.searchForm.user,
            week: this.searchForm.week
          }
        }).then(({ data }) => {
          this.CustomerList = data
          this.loading = false
        })
      },
      // 联系人数据
      getLiaisonList () {
        this.loading = true
        axios.get(DataApis.weekLiaisonUrl, {
          params: {
            username: this.searchForm.user,
            week: this.searchForm.week
          }
        }).then(({ data }) => {
          this.LiaisonList = data
          this.loading = false
        })
      },
      // 拜访记录数据
      getRecordList () {
        this.loading = true
        axios.get(DataApis.weekRecordUrl, {
          params: {
            username: this.searchForm.user,
            week: this.searchForm.week
          }
        }).then(({ data }) => {
          this.RecordList = data
          this.loading = false
        })
      },
      // 商机数据
      getBusinessList () {
        this.loading = true
        axios.get(DataApis.weekBusinessUrl, {
          params: {
            username: this.searchForm.user,
            week: this.searchForm.week
          }
        }).then(({ data }) => {
          this.BusinessList = data
          this.loading = false
        })
      },
      loadData () {
        this.getCustomerList()
        this.getLiaisonList()
        this.getRecordList()
        this.getBusinessList()
      },
      // 获取所有业务用户列表
      getUserList () {
        axios.get(AccountApis.userListUrl).then(({ data }) => {
          this.userList = data
        })
      }
    },
    created () {
      // 查询接口
      this.loadData()
      this.getUserList()
    }
  }
</script>

<style scoped lang="less">
  .page-data-week {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
