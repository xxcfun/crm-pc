<template>
  <div class="page-presupport-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'PreSupport' }">售前售后管理</el-breadcrumb-item>
      <el-breadcrumb-item>售前支持记录详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ PreSupportForm.preplan }} - {{ PreSupportForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      售前支持记录详情：
    </div>

    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="PreSupportForm" ref="PreSupportForm" label-width="80px">
          <el-form-item label="售前方案" prop="preplan">
            <el-input v-model="PreSupportForm.preplan" clearable></el-input>
          </el-form-item>
          <el-form-item label="支持时间" prop="date">
            <el-date-picker
              v-model="PreSupportForm.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="PreSupportForm.customer.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="product">
            <el-input v-model="PreSupportForm.product" clearable></el-input>
          </el-form-item>
          <el-form-item label="周期" prop="cycle">
            <el-input v-model="PreSupportForm.cycle" clearable></el-input>
          </el-form-item>
          <el-form-item label="详情" prop="des">
            <el-input type="textarea" v-model="PreSupportForm.des" clearable></el-input>
          </el-form-item>
          <el-form-item label="方案文件">
            <file-open :file="PreSupportForm.file"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('PreSupportForm')">立即保存</el-button>
            <el-button @click="resetForm('PreSupportForm')">重置</el-button>
            <el-button @click="recoverForm()">恢复</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import { PreSupportApis } from '../../utils/api'
  import FileOpen from '../../components/file/FileOpen'

  export default {
    name: 'PreSupportDetail',
    components: {
      FileOpen
    },
    data () {
      return {
        id: '',
        PreSupportForm: {
          preplan: '',
          date: '',
          customer: {
            name: ''
          },
          product: '',
          cycle: '',
          des: '',
          file: ''
        }
      }
    },
    methods: {
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = PreSupportApis.preSupportDetailUrl.replace('#{id}', this.id)
            axios.put(url, {
              preplan: this.PreSupportForm.preplan,
              date: this.PreSupportForm.date,
              product: this.PreSupportForm.product,
              cycle: this.PreSupportForm.cycle,
              des: this.PreSupportForm.des,
            }).then(({ data }) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getPreSupportDetail()
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
        this.getPreSupportDetail()
      },
      // 获取拜访记录详细信息
      getPreSupportDetail () {
        const url = PreSupportApis.preSupportDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.PreSupportForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getPreSupportDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-presupport-add {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
