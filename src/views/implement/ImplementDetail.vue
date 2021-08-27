<template>
  <div class="page-implement-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Implement' }">售前售后管理</el-breadcrumb-item>
      <el-breadcrumb-item>实施送测记录详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ ImplementForm.impplan }} - {{ ImplementForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      实施记录详情：
    </div>

    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="ImplementForm" ref="ImplementForm" label-width="80px">
          <el-form-item label="实施方案" prop="impplan">
            <el-input v-model="ImplementForm.impplan" clearable></el-input>
          </el-form-item>
          <el-form-item label="实施日期" prop="date">
            <el-date-picker
              v-model="ImplementForm.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="ImplementForm.customer.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="product">
            <el-input v-model="ImplementForm.product" clearable></el-input>
          </el-form-item>
          <el-form-item label="结果反馈" prop="report">
            <el-input type="textarea" v-model="ImplementForm.report" clearable></el-input>
          </el-form-item>
          <el-form-item label="方案文件">
            <file-open :file="ImplementForm.file"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ImplementForm')">立即保存</el-button>
            <el-button @click="resetForm('ImplementForm')">重置</el-button>
            <el-button @click="recoverForm()">恢复</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { ImplementApis } from '../../utils/api'
  import axios from 'axios'
  import FileOpen from '../../components/file/FileOpen'

  export default {
    name: 'ImplementDetail',
    components: { FileOpen },
    data () {
      return {
        id: '',
        ImplementForm: {
          impplan: '',
          customer: {
            name: ''
          },
          product: '',
          report: '',
          date: '',
          file: ''
        },
      }
    },
    methods: {
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = ImplementApis.implementDetailUrl.replace('#{id}', this.id)
            axios.put(url, {
              impplan: this.ImplementForm.impplan,
              product: this.ImplementForm.product,
              report: this.ImplementForm.report,
              date: this.ImplementForm.date,
            }).then(({ data }) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getImplementDetail()
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
        this.getImplementDetail()
      },
      // 获取拜访记录详细信息
      getImplementDetail () {
        const url = ImplementApis.implementDetailUrl.replace('#{id}', this.id)
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
