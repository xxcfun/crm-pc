<template>
  <!-- 商机列表 -->
  <div class="page-business">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Business' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商机列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索栏 -->
    <el-form :model="SearchForm" ref="SearchForm" :inline="true">
      <el-form-item label="商机名称">
        <el-input v-model="SearchForm.name" placeholder="请输入商机名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="SearchForm.customer" placeholder="请输入客户名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="赢单率">
        <el-select v-model="SearchForm.winning_rate" placeholder="请选择赢单率" clearable>
          <el-option label="20%" value="1"></el-option>
          <el-option label="50%" value="2"></el-option>
          <el-option label="80%" value="3"></el-option>
          <el-option label="100%" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        <el-button icon="el-icon-circle-close" @click="resetForm('SearchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <template>
      <el-table
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
            <a @click="goCustomerDetail(scope.row.id)" style="color: #3DA2DF; font-weight: bold;cursor:pointer">{{scope.row.customer}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="winning_rate"
          label="赢单率"
          width="150">
        </el-table-column>
        <el-table-column
          prop="money"
          label="预估金额"
          width="150">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Business',
    data () {
      return {
        // 搜索数据
        SearchForm: {
          name: '',
          customer: '',
          winning_rate: ''
        },
        // 表格数据
        BusinessList: [
          {
            id: 1,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 2,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 3,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 4,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 5,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 6,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 7,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 8,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 9,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 10,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          }
        ],
        // 分页
        currentPage: 10
      }
    },
    methods: {
      // 提交查询
      onSubmit () {
        console.log('submit!')
      },
      // 重置
      resetForm (formName) {
        console.log('reset')
        this.$refs[formName].resetFields()
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
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      // 编辑
      handleEdit (id, row) {
        this.$router.push({ name: 'BusinessEdit', params: { id: id } })
      },
      // 删除
      handleDelete (id, row) {
        console.log(id, row)
      },
      // 跳转到拜访记录详情信息页面
      goBusinessDetail (id) {
        console.log(id)
        this.$router.push({ name: 'BusinessEdit', params: { id: id } })
      },
      // 跳转到客户详情信息页面
      goCustomerDetail (id) {
        console.log(id)
        this.$router.push({ name: 'CustomerDetail', params: { id: id } })
      }
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
