<template>
  <div class="page-aftersupport-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'AfterSupport' }">售前售后管理</el-breadcrumb-item>
      <el-breadcrumb-item>售后支持记录详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ AfterSupportForm.aftersupport }} - {{ AfterSupportForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      售后支持记录详情：
    </div>

    <!-- 表单 -->
    <el-form :model="AfterSupportForm" ref="AfterSupportForm" label-width="80px" style="width: 50%">
      <el-form-item label="售后支持" prop="aftersupport">
        <el-input v-model="AfterSupportForm.aftersupport" clearable></el-input>
      </el-form-item>
      <el-form-item label="服务日期" prop="date">
        <el-date-picker
          v-model="AfterSupportForm.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="AfterSupportForm.customer.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="服务方式" prop="status">
        <el-radio-group v-model="AfterSupportForm.status">
          <el-radio :label=1>电话支持</el-radio>
          <el-radio :label=2>现场支持</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="详情描述" prop="des">
        <el-input type="textarea" v-model="AfterSupportForm.des" clearable></el-input>
      </el-form-item>
      <el-form-item label="方案文件">
        <file-open :file="AfterSupportForm.file"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('AfterSupportForm')">立即保存</el-button>
        <el-button @click="resetForm('AfterSupportForm')">重置</el-button>
        <el-button @click="recoverForm()">恢复</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { AfterSupportApis } from '../../utils/api'
  import axios from 'axios'
  import FileOpen from '../../components/file/FileOpen'

  export default {
    name: 'AfterSupportDetail',
    components: { FileOpen },
    data () {
      return {
        id: '',
        AfterSupportForm: {
          aftersupport: '',
          customer: {
            name: ''
          },
          status: '',
          des: '',
          date: '',
          file: ''
        }
      }
    },
    methods: {
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = AfterSupportApis.afterSupportDetailUrl.replace('#{id}', this.id)
            axios.put(url, {
              aftersupport: this.AfterSupportForm.aftersupport,
              status: this.AfterSupportForm.status,
              des: this.AfterSupportForm.des,
              date: this.AfterSupportForm.date
            }).then(({ data }) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getAfterSupportDetail()
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
        this.getAfterSupportDetail()
      },
      // 获取拜访记录详细信息
      getAfterSupportDetail () {
        const url = AfterSupportApis.afterSupportDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.AfterSupportForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getAfterSupportDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-aftersupport-add {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
