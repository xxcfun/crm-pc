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
    <el-form :model="RecordForm" ref="RecordForm" label-width="80px" style="width: 50%">
      <el-form-item label="拜访主题">
        <el-input v-model="RecordForm.theme" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-autocomplete
          v-model="RecordForm.customer"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入客户名称"
          @select="handleSelect"
          clearable style="width: 100%"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="拜访方式">
        <el-radio-group v-model="RecordForm.status">
          <el-radio label="线上"></el-radio>
          <el-radio label="线下"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主要事宜">
        <el-input type="textarea" v-model="RecordForm.main"></el-input>
      </el-form-item>
      <el-form-item label="后续工作">
        <el-input type="textarea" v-model="RecordForm.next"></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="RecordForm.remarks"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('RecordForm')">立即添加</el-button>
        <el-button @click="resetForm('RecordForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'RecordAdd',
    data () {
      return {
        RecordForm: {
          theme: '',
          customer: '',
          status: '',
          main: '',
          next: '',
          remarks: ''
        },
        // 联想输入框
        restaurants: [],
        state: '',
        timeout: null
      }
    },
    methods: {
      // 联想搜索下拉框
      loadAll () {
        return [
          { value: '山东津海环保装备有限公司' },
          { value: '淄博盛世有为自动化设备有限公司' },
          { value: '山东爱特机电技术有限责任公司' },
          { value: '潍坊科润达自动化有限公司' },
          { value: '德州智枫电气科技有限公司' },
          { value: '淄博海润电子科技有限公司' }
        ]
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
        console.log(item)
      },
      // 提交按钮
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
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
      this.restaurants = this.loadAll()
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
