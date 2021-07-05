<template>
  <div class="page-record-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Record' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>拜访记录详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ RecordForm.theme }} - {{ RecordForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      拜访记录基本信息：
    </div>

    <!-- 表单 -->
    <el-form :model="RecordForm" ref="RecordForm" label-width="80px" style="width: 50%; margin-bottom: 35px;">
      <el-form-item label="拜访主题">
        <el-input v-model="RecordForm.theme" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="RecordForm.customer.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="拜访方式">
        <el-input v-model="RecordForm.status" readonly></el-input>
      </el-form-item>
      <el-form-item label="主要事宜">
        <el-input type="textarea" v-model="RecordForm.main" readonly></el-input>
      </el-form-item>
      <el-form-item label="后续工作">
        <el-input type="textarea" v-model="RecordForm.next" readonly></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="RecordForm.user.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="RecordForm.remarks" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { RecordApis } from '../../utils/api'

  export default {
    name: 'RecordAllDetail',
    data () {
      return {
        id: '',
        RecordForm: {
          theme: '',
          customer: '',
          status: '',
          main: '',
          next: '',
          user: '',
          remarks: ''
        }
      }
    },
    methods: {
      // 获取拜访记录详细信息
      getRecordDetail () {
        const url = RecordApis.recordAllDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.RecordForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getRecordDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-record-add {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
