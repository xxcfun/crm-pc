<template>
  <!-- 实施列表 -->
  <div class="page-implement">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Implement' }">售前售后管理</el-breadcrumb-item>
      <el-breadcrumb-item>实施送测列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索栏 -->
    <el-form :model="searchForm" ref="searchForm" :inline="true">
      <el-form-item label="客户名称" prop="customer">
        <el-input v-model="searchForm.customer" placeholder="请输入客户名称" clearable></el-input>
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
          label="实施方案"
          width="300">
          <template slot-scope="scope">
            <a @click="goImplementDetail(scope.row.id)" style="color: #3DA2DF; font-weight: bold;cursor:pointer">{{scope.row.impplan}}</a>
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
          prop="product"
          label="产品名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="report"
          label="结果反馈"
          width="350">
        </el-table-column>
        <el-table-column
          prop="user.name"
          label="实施人员"
          width="150">
        </el-table-column>
        <el-table-column
          prop="date"
          label="实施时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id, scope.row)">删除</el-button>
          </template>
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
  import { ImplementApis } from '../../utils/api'
  import axios from 'axios'

  export default {
    name: 'Implement',
    data () {
      return {
        // 搜索数据
        searchForm: {
          customer: ''
        },
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
      // 编辑
      handleEdit (id, row) {
        this.$router.push({ name: 'ImplementDetail', params: { id: id } })
      },
      // 删除
      handleDelete (id, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = ImplementApis.implementDetailUrl.replace('#{id}', id)
          axios.delete(url).then(({ data }) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 删除成功，再次查询一次接口
            this.getImplementList()
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 跳转到拜访记录详情信息页面
      goImplementDetail (id) {
        this.$router.push({ name: 'ImplementDetail', params: { id: id } })
      },
      // 跳转到客户详情信息页面
      goCustomerDetail (id) {
        this.$router.push({ name: 'CustomerAllDetail', params: { id: id } })
      },
      // 获取所有拜访记录列表
      getImplementList () {
        this.loading = true
        axios.get(ImplementApis.implementListUrl, {
          params: {
            page_size: this.pageSize,
            page: this.currentPage,
            customer: this.searchForm.customer
          }
        }).then(({ data }) => {
          this.ImplementList = data.results
          this.total = data.count
          this.loading = false
        })
      }
    },
    created () {
      // 查询接口
      this.getImplementList()
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
