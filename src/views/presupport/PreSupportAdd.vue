<template>
  <div class="page-presupport-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'PreSupport' }">售前售后管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加售前支持记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      添加售前支持记录：
    </div>

    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="PreSupportForm" :rules="rules" ref="PreSupportForm" label-width="80px">
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
          <el-form-item label="客户名称" prop="state">
            <el-autocomplete
              v-model="PreSupportForm.state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入客户名称"
              @select="handleSelect"
              clearable style="width: 100%"
            ></el-autocomplete>
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
          <el-form-item label="文件上传">
            <file-upload @filePath="getFilePath"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('PreSupportForm')">立即添加</el-button>
            <el-button @click="resetForm('PreSupportForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import { CustomerApis, PreSupportApis } from '../../utils/api'
  import FileUpload from '../../components/file/FileUpload'

  export default {
    name: 'PreSupportAdd',
    components: { FileUpload },
    data () {
      return {
        PreSupportForm: {
          preplan: '',
          date: '',
          state: '',
          product: '',
          cycle: '',
          des: '',
          file: ''
        },
        rules: {
          preplan: [
            { required: true, message: '请输入售前方案', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请输入支持时间', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请输入客户名称', trigger: 'change' }
          ],
          product: [
            { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          cycle: [
            { required: true, message: '请输入周期', trigger: 'blur' }
          ],
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
        this.PreSupportForm.file = data
        console.log(this.PreSupportForm.file)
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
            axios.post(PreSupportApis.preSupportListUrl, {
              customer: this.customer_id,
              preplan: this.PreSupportForm.preplan,
              date: this.PreSupportForm.date,
              product: this.PreSupportForm.product,
              cycle: this.PreSupportForm.cycle,
              des: this.PreSupportForm.des,
              file: this.PreSupportForm.file
            }).then(({ data }) => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ name: 'PreSupport' })
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
  .page-presupport-add {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }

    .box-card {

      .text {
        font-size: 14px;
      }

      .item {
        margin-bottom: 18px;
      }

      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both
      }
      hr {
        margin-bottom: 25px;
      }
    }
  }
</style>
