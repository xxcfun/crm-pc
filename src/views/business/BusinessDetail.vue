<template>
  <div class="page-business-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Business' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商机详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      商机详情：
    </div>

    <!-- 表单 -->
    <el-form :model="BusinessForm" ref="BusinessForm" label-width="80px" style="width: 50%">
      <el-form-item label="商机名称">
        <el-input v-model="BusinessForm.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="BusinessForm.customer" readonly></el-input>
      </el-form-item>
      <el-form-item label="赢单率">
        <el-input v-model="BusinessForm.winning_rate" readonly></el-input>
      </el-form-item>
      <el-form-item label="预估金额">
        <el-input v-model="BusinessForm.money" readonly></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="BusinessForm.remarks" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'BusinessDetail',
    data () {
      return {
        BusinessForm: {
          name: '客户升级设备',
          customer: '山东芙诺鑫智能科技有限公司',
          winning_rate: '20%',
          money: '无信息',
          remarks: ''
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .page-business-detail {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
