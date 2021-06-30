<template>
  <div class="page-record-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Record' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加拜访记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      添加拜访记录：
    </div>

    <!-- 表单 -->
    <el-form :model="RecordForm" :rules="rules" ref="RecordForm" label-width="80px" style="width: 50%">
      <el-form-item label="拜访主题" prop="theme">
        <el-input v-model="RecordForm.theme" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="state">
        <el-autocomplete
          v-model="RecordForm.state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入客户名称"
          @select="handleSelect"
          clearable style="width: 100%"
        ></el-autocomplete>
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
      <el-form-item label="备注信息" prop="remark">
        <el-input type="textarea" v-model="RecordForm.remarks" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('RecordForm')">立即添加</el-button>
        <el-button @click="resetForm('RecordForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { CustomerApis, RecordApis } from '../../utils/api'

  export default {
    name: 'RecordAdd',
    data () {
      return {
        RecordForm: {
          theme: '',
          state: '',
          status: '',
          main: '',
          next: '',
          remarks: ''
        },
        rules: {
          theme: [
            { required: true, message: '请输入拜访主题', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请输入客户名称', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择拜访方式', trigger: 'change' }
          ],
          main: [
            { required: true, message: '请输入主要事宜内容', trigger: 'blur' }
          ],
          next: [
            { required: true, message: '请输入后续工作内容', trigger: 'blur' }
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
      // 联想搜索下拉框
      loadAll () {
        axios.get(CustomerApis.linkcustomerUrl).then(({ data }) => {
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
            axios.post(RecordApis.recordListUrl, {
              theme: this.RecordForm.theme,
              customer: this.customer_id,
              status: this.RecordForm.status,
              main: this.RecordForm.main,
              next: this.RecordForm.next,
              remarks: this.RecordForm.remarks
            }).then(({ data }) => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ name: 'Record' })
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
