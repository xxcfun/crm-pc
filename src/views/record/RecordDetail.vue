<template>
  <div class="page-record-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Record' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>拜访记录详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      拜访记录详情：
    </div>

    <!-- 表单 -->
    <el-form :model="RecordForm" ref="RecordForm" label-width="80px" style="width: 50%">
      <el-form-item label="拜访主题">
        <el-input v-model="RecordForm.theme" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="RecordForm.customer" readonly></el-input>
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
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="RecordForm.remarks" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'RecordDetail',
    data () {
      return {
        RecordForm: {
          theme: '问客户工控机情况',
          customer: '山东宝铃自动化设备有限公司',
          status: '线上',
          main: '一直用工控机，从北京那边买的',
          next: '去淄博路过拜访一下客户，多了解',
          remarks: ''
        }
      }
    },
    methods: {
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
