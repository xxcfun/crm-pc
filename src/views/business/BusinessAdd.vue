<template>
  <div class="page-business-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Business' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商机</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      添加商机：
    </div>

    <el-row :gutter="20" style="margin-bottom: 30px">

      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="BusinessForm" :rules="rules" ref="BusinessForm" label-width="80px">
          <el-form-item label="商机名称" prop="name">
            <el-input v-model="BusinessForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="客户名称" prop="state">
            <el-autocomplete
              v-model="BusinessForm.state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入客户名称"
              @select="handleSelect"
              clearable style="width: 100%"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="赢单率" prop="winning_rate">
            <el-select v-model="BusinessForm.winning_rate" placeholder="请选择赢单率" clearable>
              <el-option label="0%" :value=1></el-option>
              <el-option label="20%" :value=2></el-option>
              <el-option label="50%" :value=3></el-option>
              <el-option label="80%" :value=4></el-option>
              <el-option label="100%" :value=5></el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="预估金额">-->
<!--            <el-input v-model="sum" readonly style="width: 50%">-->
<!--              <template slot="append">万元</template>-->
<!--            </el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="备注信息" prop="remarks">
            <el-input type="textarea" v-model="BusinessForm.remarks" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('BusinessForm')">立即添加</el-button>
            <el-button @click="resetForm('BusinessForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import { CustomerApis, BusinessApis } from '../../utils/api'

  export default {
    name: 'BusinessAdd',
    data () {
      return {
        BusinessForm: {
          name: '',
          state: '',
          winning_rate: '',
          remarks: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入商机名称', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请输入客户名称' }
          ],
          winning_rate: [
            { required: true, message: '请选择商机赢单率', trigger: 'change' }
          ]
        },
        // 客户id
        customer_id: '',
        // 联想输入框
        restaurants: [],
        timeout: null,
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
        this.getProductInfo()
        console.log(item)
      },
      // 提交按钮
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(BusinessApis.businessListUrl, {
              name: this.BusinessForm.name,
              customer: this.customer_id,
              winning_rate: this.BusinessForm.winning_rate,
              remarks: this.BusinessForm.remarks
            }).then(({ data }) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.push({ name: 'Business' })
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
        this.customer_id = null
        this.getProductInfo()
      }
    },
    created () {
      this.loadAll()
    }
  }
</script>

<style scoped lang="less">
  .page-business-add {
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
    }
  }
</style>
