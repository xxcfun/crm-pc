<template>
  <div class="page-implement-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'ImplementAll' }">实施管理</el-breadcrumb-item>
      <el-breadcrumb-item>实施记录详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ ImplementForm.testplan }} - {{ ImplementForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      实施记录详情：
    </div>

    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="ImplementForm" ref="ImplementForm" label-width="80px">
          <el-form-item label="测试方案" prop="testplan">
            <el-input v-model="ImplementForm.testplan" readonly></el-input>
          </el-form-item>
          <el-form-item label="实施日期" prop="date">
            <el-input v-model="ImplementForm.date" readonly></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="ImplementForm.customer.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="测试报告" prop="report">
            <el-input type="textarea" v-model="ImplementForm.report" readonly></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="ImplementForm.user.name" readonly></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { ImplementApis } from '../../utils/api'
  import axios from 'axios'

  export default {
    name: 'ImplementAllDetail',
    data () {
      return {
        id: '',
        ImplementForm: {
          testplan: '',
          customer: '',
          report: '',
          date: '',
        },
      }
    },
    methods: {
      // 获取拜访记录详细信息
      getImplementDetail () {
        const url = ImplementApis.implementAllDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.ImplementForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getImplementDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-implement-add {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
