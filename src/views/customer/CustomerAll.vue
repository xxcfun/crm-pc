<template>
  <!-- 客户列表 -->
  <div class="page-customer">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Customer' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>所有客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索栏 -->
    <el-form :model="searchForm" ref="searchForm" :inline="true">
      <el-form-item label="客户名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入客户名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户级别" prop="rank">
        <el-select v-model="searchForm.rank" placeholder="请选择客户级别" clearable>
          <el-option label="潜在客户" value="1"></el-option>
          <el-option label="意向客户" value="2"></el-option>
          <el-option label="重点客户" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否成交" prop="is_deal">
        <el-select v-model="searchForm.is_deal" placeholder="筛选成交/未成交客户" clearable>
          <el-option label="成交" value="1"></el-option>
          <el-option label="未成交" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户行业" prop="industry">
        <el-select v-model="searchForm.industry" placeholder="请选择客户行业" clearable>
          <el-option label="机台设备制造商" value="1"></el-option>
          <el-option label="生产制造型企业" value="2"></el-option>
          <el-option label="系统集成商" value="3"></el-option>
          <el-option label="分销商" value="4"></el-option>
          <el-option label="其它" value="5"></el-option>
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
        :data="CustomerList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          label="客户名称"
          width="350">
          <template slot-scope="scope">
            <a @click="goDetail(scope.row.id)" style="color: #3DA2DF; font-weight: bold;cursor:pointer">{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="rank"
          label="客户级别"
          width="150">
        </el-table-column>
        <el-table-column
          prop="is_deal"
          label="是否成交"
          width="150">
        </el-table-column>
        <el-table-column
          prop="scale"
          label="客户规模"
          width="150">
        </el-table-column>
        <el-table-column
          prop="industry"
          label="客户行业"
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
  import { AccountApis, CustomerApis } from '../../utils/api'
  import axios from 'axios'

  export default {
    name: 'CustomerAll',
    data () {
      return {
        // 搜索数据
        searchForm: {
          name: '',
          rank: '',
          is_deal: '',
          industry: '',
          user: ''
        },
        // 用户列表
        userList: [],
        // 是否可以清除
        clearable: true,
        // 表格数据
        CustomerList: [],
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
        this.CustomerList = []
        this.currentPage = 1
        // 执行查询
        this.getCustomerList()
      },
      // 重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
        // 重置页面数据
        this.CustomerList = []
        this.currentPage = 1
        // 重置完成后，重新调用接口
        this.getCustomerList()
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
        this.getCustomerList()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getCustomerList()
      },
      // 跳转到客户详情信息页面
      goDetail (id) {
        this.$router.push({ name: 'CustomerAllDetail', params: { id: id } })
      },
      // 获取所有客户列表
      getCustomerList () {
        this.loading = true
        axios.get(CustomerApis.customerAllListUrl, {
          params: {
            page_size: this.pageSize,
            page: this.currentPage,
            name: this.searchForm.name,
            rank: this.searchForm.rank,
            is_deal: this.searchForm.is_deal,
            industry: this.searchForm.industry,
            username: this.searchForm.user
          }
        }).then(({ data }) => {
          this.CustomerList = data.results
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
      this.getCustomerList()
      this.getUserList()
    }
  }
</script>

<style scoped lang="less">
  .page-customer {
    .block {
      margin-top: 10px;
      background-color: #fff;
      margin-bottom: 35px;
      text-align: center;
    }
  }
</style>
