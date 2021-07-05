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
    <el-form :model="RecordForm" ref="RecordForm" label-width="80px" style="width: 50%">
      <el-form-item label="拜访主题" prop="theme">
        <el-input v-model="RecordForm.theme" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="RecordForm.customer.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="拜访方式" prop="status">
        <el-radio-group v-model="RecordForm.status">
          <el-radio :label=1>线上</el-radio>
          <el-radio :label=2>线下</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主要事宜" prop="main">
        <el-input type="textarea" v-model="RecordForm.main" clearable></el-input>
      </el-form-item>
      <el-form-item label="后续工作" prop="next">
        <el-input type="textarea" v-model="RecordForm.next" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input type="textarea" v-model="RecordForm.remarks" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('RecordForm')">立即保存</el-button>
        <el-button @click="resetForm('RecordForm')">重置</el-button>
        <el-button @click="recoverForm()">恢复</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { RecordApis } from '../../utils/api'

  export default {
    name: 'RecordDetail',
    data () {
      return {
        id: '',
        RecordForm: {
          theme: '',
          customer: {
            name: ''
          },
          status: '',
          main: '',
          next: '',
          remarks: ''
        }
      }
    },
    methods: {
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = RecordApis.recordDetailUrl.replace('#{id}', this.id)
            axios.put(url, {
              theme: this.RecordForm.theme,
              status: this.RecordForm.status,
              main: this.RecordForm.main,
              next: this.RecordForm.next,
              remarks: this.RecordForm.remarks
            }).then(({ data }) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getRecordDetail()
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
        this.getRecordDetail()
      },
      // 获取拜访记录详细信息
      getRecordDetail () {
        const url = RecordApis.recordDetailUrl.replace('#{id}', this.id)
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
