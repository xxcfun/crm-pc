<template>
  <div class="page-liaison-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Liaison' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>联系人详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ LiaisonForm.name }} - {{ LiaisonForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      联系人基本信息：
    </div>

    <!-- 表单 -->
    <el-form :model="LiaisonForm" ref="LiaisonForm" label-width="80px" style="width: 50%; margin-bottom: 35px;">
      <el-form-item label="联系人" prop="name">
        <el-input v-model="LiaisonForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="LiaisonForm.customer.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="职务" prop="job">
        <el-select v-model="LiaisonForm.job" placeholder="职务" clearable>
          <el-option label="经理" :value=1></el-option>
          <el-option label="采购" :value=2></el-option>
          <el-option label="技术" :value=3></el-option>
          <el-option label="售后" :value=4></el-option>
          <el-option label="业务" :value=5></el-option>
          <el-option label="其它" :value=6></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否在职" prop="injob">
        <el-select v-model="LiaisonForm.injob" placeholder="是否在职" clearable>
          <el-option label="在职" :value=1></el-option>
          <el-option label="离职" :value=0></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="LiaisonForm.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="wx">
        <el-input v-model="LiaisonForm.wx" clearable></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="LiaisonForm.qq" clearable></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="LiaisonForm.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="兴趣爱好" prop="hobby">
        <el-input v-model="LiaisonForm.hobby" clearable></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-input v-model="LiaisonForm.birthday" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input type="textarea" v-model="LiaisonForm.remarks" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('LiaisonForm')">立即保存</el-button>
        <el-button @click="resetForm('LiaisonForm')">重置</el-button>
        <el-button @click="recoverForm()">恢复</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { LiaisonApis } from '../../utils/api'

  export default {
    name: 'LiaisonDetail',
    data () {
      return {
        id: '',
        LiaisonForm: {
          name: '',
          customer: {
            name: ''
          },
          phone: '',
          job: '',
          injob: '',
          wx: '',
          qq: '',
          email: '',
          hobby: '',
          birthday: '',
          remarks: ''
        }
      }
    },
    methods: {
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = LiaisonApis.liaisonDetailUrl.replace('#{id}', this.id)
            axios.put(url, {
              name: this.LiaisonForm.name,
              // customer: this.LiaisonForm.customer.name,
              phone: this.LiaisonForm.phone,
              job: this.LiaisonForm.job,
              injob: this.LiaisonForm.injob,
              wx: this.LiaisonForm.wx,
              qq: this.LiaisonForm.qq,
              email: this.LiaisonForm.email,
              hobby: this.LiaisonForm.hobby,
              birthday: this.LiaisonForm.birthday,
              remarks: this.LiaisonForm.remarks
            }).then(({ data }) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getLiaisonDetail()
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
        this.getLiaisonDetail()
      },
      // 获取联系人详细信息
      getLiaisonDetail () {
        const url = LiaisonApis.liaisonDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.LiaisonForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getLiaisonDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-liaison-detail {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
