<template>
  <!-- 实施列表 -->
  <div class="page-implement">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'ImplementAll' }">实施管理</el-breadcrumb-item>
      <el-breadcrumb-item>实施列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索栏 -->
    <el-form :model="searchForm" ref="searchForm" :inline="true">
      <el-form-item label="客户名称" prop="customer">
        <el-input v-model="searchForm.customer" placeholder="请输入客户名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="创建人" prop="user">
        <el-select v-model="searchForm.user" placeholder="请选择创建人" clearable>
          <el-option
            v-for="item in userList" :key="item.id"
            :label="item.name" :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        <el-button icon="el-icon-circle-close" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <template>
      <el-table
        v-loading="loading"
        :data="ImplementList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          label="实施测试方案"
          width="300">
          <template slot-scope="scope">
            <a @click="goImplementDetail(scope.row.id)" style="color: #3DA2DF; font-weight: bold;cursor:pointer">{{scope.row.testplan}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="客户名称"
          width="350">
          <template slot-scope="scope">
            <a @click="goCustomerDetail(scope.row.customer.id)" style="color: #3DA2DF; font-weight: bold;cursor:pointer">{{scope.row.customer.name}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="report"
          label="测试结果反馈"
          width="350">
        </el-table-column>
        <el-table-column
          prop="date"
          label="实施时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="实施人员"
          width="150">
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { AccountApis, ImplementApis } from '../../utils/api'
  import axios from 'axios'

  export default {
    name: 'ImplementAll',
    data () {
      return {
        // 搜索数据
        searchForm: {
          customer: '',
          user: ''
        },
        // 用户列表
        userList: [],
        // 表格数据
        ImplementList: [],
        // 是否加载
        loading: false,
        // 当前页码
        currentPage: 1,
        // 总记录数
        total: 0,
        // 每页大小
        pageSize: 10
      }
    },
    methods: {
      // 提交查询
      onSubmit () {
        // 重置数据
        this.ImplementList = []
        this.currentPage = 1
        // 执行查询
        this.getImplementList()
      },
      // 重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
        // 重置页面数据
        this.ImplementList = []
        this.currentPage = 1
        // 重置完成后，重新调用接口
        this.getImplementList()
      },
      // 统一列颜色
      setCellColor ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 1) {
          return 'color: #3DA2DF; font-weight: bold;'
        }
      },
      // 分页
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.getImplementList()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getImplementList()
      },
      // 跳转到拜访记录详情信息页面
      goImplementDetail (id) {
        this.$router.push({ name: 'ImplementAllDetail', params: { id: id } })
      },
      // 跳转到客户详情信息页面
      goCustomerDetail (id) {
        this.$router.push({ name: 'CustomerAllDetail', params: { id: id } })
      },
      // 获取所有拜访记录列表
      getImplementList () {
        this.loading = true
        axios.get(ImplementApis.implementAllListUrl, {
          params: {
            page_size: this.pageSize,
            page: this.currentPage,
            customer: this.searchForm.customer,
            username: this.searchForm.user
          }
        }).then(({ data }) => {
          this.ImplementList = data.results
          this.total = data.count
          this.loading = false
        })
      },
      // 获取所有业务用户列表
      getUserList () {
        axios.get(AccountApis.jsuserListUrl).then(({ data }) => {
          this.userList = data
        })
      }
    },
    created () {
      // 查询接口
      this.getImplementList()
      this.getUserList()
    }
  }
</script>

<style scoped lang="less">
  .page-implement {
    .block {
      margin-top: 10px;
      background-color: #fff;
      margin-bottom: 35px;
      text-align: center;
    }
  }
</style>
