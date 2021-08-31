<template>
  <!-- 数据一览 -->
  <div class="page-data">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">数据汇总</el-breadcrumb-item>
      <el-breadcrumb-item>数据一览</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 表格 -->
    <template>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="user.name"
          label="姓名">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="yes_record"-->
<!--          label="昨日线下拜访">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="yes_phone"-->
<!--          label="昨日线上拜访">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="new_customer"-->
<!--          label="新增客户">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="new_business"-->
<!--          label="新增商机">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="week_record"
          label="本周线下拜访">
        </el-table-column>
        <el-table-column
          prop="week_phone"
          label="本周线上拜访">
        </el-table-column>
        <el-table-column
          prop="week_business"
          label="本周商机数量">
        </el-table-column>
        <el-table-column
          prop="week_customer"
          label="本周客户数量">
        </el-table-column>
        <el-table-column
          prop="mon_record"
          label="本月线下拜访">
        </el-table-column>
        <el-table-column
          prop="mon_phone"
          label="本月线上拜访">
        </el-table-column>
        <el-table-column
          prop="mon_business"
          label="本月商机数量">
        </el-table-column>
        <el-table-column
          prop="mon_customer"
          label="本月客户数量">
        </el-table-column>
        <el-table-column
          prop="fol_business"
          label="跟进商机">
        </el-table-column>
        <el-table-column
          prop="fin_business"
          label="完成商机">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import axios from 'axios'
  import { DataApis } from '../../utils/api'

  export default {
    name: 'Data',
    data () {
      return {
        tableData: [],
        loading: true
      }
    },
    methods: {
      // 获取表格数据
      getTableData () {
        this.loading = true
        axios.get(DataApis.dataListUrl).then(({ data }) => {
          this.tableData = data
          this.loading = false
        })
      }
    },
    created () {
      // 查询接口
      this.getTableData()
    }
  }
</script>

<style lang="less">
  .page-data {
  }
</style>
