<template>
  <!-- 商机列表 -->
  <div class="page-business">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'BusinessAll' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商机列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索栏 -->
    <el-form :model="searchForm" ref="searchForm" :inline="true">
      <el-form-item label="商机名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入商机名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="customer">
        <el-input v-model="searchForm.customer" placeholder="请输入客户名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="赢单率" prop="winning_rate">
        <el-select v-model="searchForm.winning_rate" placeholder="请选择赢单率" clearable>
          <el-option label="0%" :value=1></el-option>
          <el-option label="20%" :value=2></el-option>
          <el-option label="50%" :value=3></el-option>
          <el-option label="80%" :value=4></el-option>
          <el-option label="100%" :value=5></el-option>
        </el-select>
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
        :data="BusinessList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          label="商机名称"
          width="200">
          <template slot-scope="scope">
            <a @click="goBusinessDetail(scope.row.id)" style="color: #3DA2DF; font-weight: bold;cursor:pointer">{{scope.row.name}}</a>
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
          prop="winning_rate"
          label="赢单率"
          width="150">
        </el-table-column>
        <el-table-column
          prop="money"
          label="预估金额（万元）"
          width="150">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="创建人"
          sortable
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
  import axios from 'axios'
  import { AccountApis, BusinessApis } from '../../utils/api'

  export default {
    name: 'BusinessAll',
    data () {
      return {
        // 搜索数据
        searchForm: {
          name: '',
          customer: '',
          winning_rate: '',
          user: ''
        },
        // 用户列表
        userList: [],
        // 表格数据
        BusinessList: [],
        // 是否加载
        loading: true,
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
        this.BusinessList = []
        this.currentPage = 1
        // 执行查询
        this.getBusinessList()
      },
      // 重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
        // 重置页面数据
        this.BusinessList = []
        this.currentPage = 1
        // 重置完成后，重新调用接口
        this.getBusinessList()
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
        this.getBusinessList()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getBusinessList()
      },
      // 跳转到拜访记录详情信息页面
      goBusinessDetail (id) {
        this.$router.push({ name: 'BusinessAllDetail', params: { id: id } })
      },
      // 跳转到客户详情信息页面
      goCustomerDetail (id) {
        this.$router.push({ name: 'CustomerAllDetail', params: { id: id } })
      },
      // 获取所有商机列表
      getBusinessList () {
        this.loading = true
        axios.get(BusinessApis.businessAllListUrl, {
          params: {
            page_size: this.pageSize,
            page: this.currentPage,
            name: this.searchForm.name,
            customer: this.searchForm.customer,
            winning_rate: this.searchForm.winning_rate,
            username: this.searchForm.user
          }
        }).then(({ data }) => {
          this.BusinessList = data.results
          this.total = data.count
          this.loading = false
        })
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
      this.getBusinessList()
      this.getUserList()
    }
  }
</script>

<style scoped lang="less">
  .page-business {
    .block {
      margin-top: 10px;
      background-color: #fff;
      margin-bottom: 35px;
      text-align: center;
    }
  }
</style>
