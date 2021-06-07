<template>
  <!-- 客户列表 -->
  <div class="page-customer">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Customer' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索栏 -->
    <el-form :model="SearchForm" ref="SearchForm" :inline="true">
      <el-form-item label="客户名称">
        <el-input v-model="SearchForm.name" placeholder="请输入内容" :clearable="clearable"></el-input>
      </el-form-item>
      <el-form-item label="客户级别">
        <el-select v-model="SearchForm.rank" placeholder="客户级别" :clearable="clearable">
          <el-option label="潜在客户" value="1"></el-option>
          <el-option label="意向客户" value="2"></el-option>
          <el-option label="重点客户" value="3"></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="客户规模">-->
<!--        <el-select v-model="SearchForm.scale" placeholder="客户规模" :clearable="clearable">-->
<!--          <el-option label="0~10人" value="1"></el-option>-->
<!--          <el-option label="10~50人" value="2"></el-option>-->
<!--          <el-option label="50~100人" value="3"></el-option>-->
<!--          <el-option label="100~1000人" value="4"></el-option>-->
<!--          <el-option label="1000人以上" value="5"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="客户行业">
        <el-select v-model="SearchForm.industry" placeholder="客户行业" :clearable="clearable">
          <el-option label="机台设备制造商" value="1"></el-option>
          <el-option label="生产制造型企业" value="2"></el-option>
          <el-option label="系统集成商" value="3"></el-option>
          <el-option label="分销商" value="4"></el-option>
          <el-option label="其它" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button icon="el-icon-circle-close" @click="resetForm('SearchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <template>
      <el-table
        :data="CustomerList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          label="客户名称"
          width="300">
          <template slot-scope="scope">
            <a @click="goDetail(scope.row.id)" style="color: #3DA2DF; font-weight: bold;cursor:pointer">{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="rank"
          label="客户级别"
          width="155">
        </el-table-column>
        <el-table-column
          prop="is_deal"
          label="是否成交"
          width="155">
        </el-table-column>
        <el-table-column
          prop="scale"
          label="客户规模"
          width="155">
        </el-table-column>
        <el-table-column
          prop="industry"
          label="客户行业"
          width="155">
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
    name: 'Customer',
    data () {
      return {
        // 搜索数据
        SearchForm: {
          name: '',
          rank: '',
          // scale: '',
          industry: ''
        },
        // 是否可以清除
        clearable: true,
        // 表格数据
        CustomerList: [
          {
            id: 1,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年12月25日 08:20',
            user: '耿冠超'
          },
          {
            id: 2,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年12月25日 08:20',
            user: '耿冠超'
          },
          {
            id: 3,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年12月25日 08:20',
            user: '耿冠超'
          },
          {
            id: 4,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 5,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 6,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 7,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 8,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 9,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 10,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 11,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 12,
            name: '山东津海环保装备有限公司',
            rank: '潜在客户',
            is_deal: '未成交',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
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
        this.$router.push({ name: 'CustomerEdit', params: { id: index } })
      },
      // 删除
      handleDelete (index, row) {
        console.log(index, row)
      },
      // 重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      // 跳转到详情信息页面
      goDetail (id) {
        console.log(id)
        this.$router.push({ name: 'CustomerDetail', params: { id: id } })
      }
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
