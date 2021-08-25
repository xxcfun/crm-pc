<template>
  <div class="page-aftersupport-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'AfterSupport' }">售前售后管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加售后支持记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      添加售后支持记录：
    </div>

    <!-- 表单 -->
    <el-form :model="AfterSupportForm" :rules="rules" ref="AfterSupportForm" label-width="80px" style="width: 50%">
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
      <el-form-item label="客户名称" prop="state">
        <el-autocomplete
          v-model="AfterSupportForm.state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入客户名称"
          @select="handleSelect"
          clearable style="width: 100%"
        ></el-autocomplete>
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
      <el-form-item label="文件上传">
        <file-upload @filePath="getFilePath"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('AfterSupportForm')">立即添加</el-button>
        <el-button @click="resetForm('AfterSupportForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { AfterSupportApis, CustomerApis, PreSupportApis } from '../../utils/api'
  import FileUpload from '../../components/file/FileUpload'

  export default {
    name: 'AfterSupportAdd',
    components: { FileUpload },
    data () {
      return {
        AfterSupportForm: {
          aftersupport: '',
          state: '',
          status: '',
          des: '',
          date: '',
          file: ''
        },
        rules: {
          aftersupport: [
            { required: true, message: '请输入售后方案', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请输入服务时间', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请输入客户名称', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请选择服务方式', trigger: 'change' }
          ]
        },
        // 客户id
        customer_id: '',
        // 联想输入框
        restaurants: [],
        state: '',
        timeout: null
      }
    },
    methods: {
      // 父组件接收文件路径
      getFilePath (data) {
        this.AfterSupportForm.file = data
        console.log(this.AfterSupportForm.file)
      },
      // 联想搜索下拉框
      loadAll () {
        axios.get(CustomerApis.linkallcustomerUrl).then(({ data }) => {
          this.restaurants = data
        })
      },
      querySearchAsync (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 1000 * Math.random())
      },
      createStateFilter (queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect (item) {
        // 选中数据，给 customer id 赋值
        this.customer_id = item.id
        console.log(item)
      },
      // 提交按钮
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(AfterSupportApis.afterSupportListUrl, {
              customer: this.customer_id,
              aftersupport: this.AfterSupportForm.aftersupport,
              status: this.AfterSupportForm.status,
              des: this.AfterSupportForm.des,
              date: this.AfterSupportForm.date,
              file: this.AfterSupportForm.file
            }).then(({ data }) => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ name: 'AfterSupport' })
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
      }
    },
    mounted () {
      this.loadAll()
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
