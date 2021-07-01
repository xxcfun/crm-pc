<template>
  <div class="page-business-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Business' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商机</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      添加商机：
    </div>

    <!-- 表单 -->
    <el-form :model="BusinessForm" :rules="rules" ref="BusinessForm" label-width="80px" style="width: 50%">
      <el-form-item label="商机名称" prop="name">
        <el-input v-model="BusinessForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="customer_name" readonly></el-input>
      </el-form-item>
      <el-form-item label="赢单率" prop="winning_rate">
        <el-select v-model="BusinessForm.winning_rate" placeholder="请选择赢单率" clearable>
          <el-option label="0" :value=1></el-option>
          <el-option label="20%" :value=2></el-option>
          <el-option label="50%" :value=3></el-option>
          <el-option label="80%" :value=4></el-option>
          <el-option label="100%" :value=5></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预估金额" prop="money">
        <el-input v-model="BusinessForm.money" clearable style="width: 50%">
          <template slot="append">万元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input type="textarea" v-model="BusinessForm.remarks" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('BusinessForm')">立即添加</el-button>
        <el-button @click="resetForm('BusinessForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { BusinessApis, CustomerApis } from '../../utils/api'

  export default {
    name: 'AddBusiness',
    data () {
      return {
        BusinessForm: {
          name: '',
          winning_rate: '',
          money: '',
          remarks: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入商机名称', trigger: 'blur' }
          ],
          winning_rate: [
            { required: true, message: '请选择商机赢单率', trigger: 'change' }
          ]
        },
        // 客户id
        customer_name: '',
        customer_id: '',
      }
    },
    methods: {
      // 提交按钮
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(BusinessApis.businessListUrl, {
              name: this.BusinessForm.name,
              customer: this.customer_id,
              winning_rate: this.BusinessForm.winning_rate,
              money: this.BusinessForm.money,
              remarks: this.BusinessForm.remarks
            }).then(({ data }) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.push({ name: 'CustomerDetail', params: { id: this.customer_id } })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 重置按钮
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      getCustomerDetail () {
        const url = CustomerApis.customerDetailUrl.replace('#{id}', this.customer_id)
        axios.get(url).then(({ data }) => {
          this.customer_name = data.name
        })
      },
      loadData () {
        // 获取路由id赋值给customer id
        this.customer_id = this.$route.params.id
        this.getCustomerDetail()
      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-liaison-add {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
