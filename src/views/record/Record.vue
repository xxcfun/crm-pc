<template>
  <!-- 拜访记录列表 -->
  <div class="page-record">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Record' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>拜访记录列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索栏 -->
    <el-form :model="SearchForm" ref="SearchForm" :inline="true">
      <el-form-item label="拜访主题">
        <el-input v-model="SearchForm.theme" placeholder="请输入拜访主题" :clearable="clearable"></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="SearchForm.customer" placeholder="请输入客户名称" :clearable="clearable"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button icon="el-icon-circle-close" @click="resetForm('SearchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <template>
      <el-table
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
          prop="customer"
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
          width="200">
        </el-table-column>
        <el-table-column
          prop="user"
          label="创建人"
          width="100">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    name: 'Record',
    data () {
      return {
        // 搜索数据
        SearchForm: {
          theme: '',
          customer: ''
        },
        // 是否可以清除
        clearable: true,
        // 表格数据
        RecordList: [
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          }
        ],
        // 分页
        currentPage: 10
      }
    },
    methods: {
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
      handleEdit (index, row) {
        console.log(index, row)
      },
      // 删除
      handleDelete (index, row) {
        console.log(index, row)
      }
    }
  }
</script>

<style scoped lang="less">
  .page-record {
    .block {
      margin-top: 10px;
      background-color: #fff;
      margin-bottom: 35px;
      text-align: center;
    }
  }
</style>
