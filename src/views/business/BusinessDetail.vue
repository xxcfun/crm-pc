<template>
  <div class="page-business-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Business' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商机详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ BusinessForm.name }} - {{ BusinessForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      商机基本信息：
    </div>

    <!-- 表单 -->
    <el-form :model="BusinessForm" ref="BusinessForm" label-width="80px" style="width: 50%">
      <el-form-item label="商机名称" prop="name">
        <el-input v-model="BusinessForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="BusinessForm.customer.name" readonly></el-input>
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
        <el-button type="primary" @click="submitForm('BusinessForm')">立即保存</el-button>
        <el-button @click="resetForm('BusinessForm')">重置</el-button>
        <el-button @click="recoverForm()">恢复</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { BusinessApis } from '../../utils/api'

  export default {
    name: 'BusinessDetail',
    data () {
      return {
        id: '',
        BusinessForm: {
          name: '',
          customer: {
            name: ''
          },
          winning_rate: '',
          money: '',
          remarks: ''
        }
      }
    },
    methods: {
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = BusinessApis.businessDetailUrl.replace('#{id}', this.id)
            axios.put(url, {
              name: this.BusinessForm.name,
              winning_rate: this.BusinessForm.winning_rate,
              money: this.BusinessForm.money,
              remarks: this.BusinessForm.remarks
            }).then(({ data }) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getBusinessDetail()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 重置内容
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      // 恢复内容
      recoverForm () {
        this.getBusinessDetail()
      },
      // 获取联系人详细信息
      getBusinessDetail () {
        const url = BusinessApis.businessDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.BusinessForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getBusinessDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
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
