<template>
  <div class="page-liaison-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Liaison' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加联系人</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      添加联系人：
    </div>

    <!-- 表单 -->
    <el-form :model="LiaisonForm" :rules="rules" ref="LiaisonForm" label-width="80px" style="width: 50%">
      <el-form-item label="联系人" prop="name">
        <el-input v-model="LiaisonForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="state">
        <el-autocomplete
          v-model="LiaisonForm.state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入客户名称"
          @select="handleSelect"
          clearable style="width: 100%"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="LiaisonForm.phone" clearable></el-input>
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
        <el-radio-group v-model="LiaisonForm.injob">
          <el-radio :label=1>在职</el-radio>
          <el-radio :label=0>离职</el-radio>
        </el-radio-group>
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
        <el-button type="primary" @click="submitForm('LiaisonForm')">立即添加</el-button>
        <el-button @click="resetForm('LiaisonForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { CustomerApis, LiaisonApis } from '../../utils/api'

  export default {
    name: 'LiaisonAdd',
    data () {
      return {
        LiaisonForm: {
          name: '',
          state: '',
          phone: '',
          job: '',
          injob: '',
          wx: '',
          qq: '',
          email: '',
          hobby: '',
          birthday: '',
          remarks: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请输入客户名称', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          job: [
            { required: true, message: '请选择联系人职务', trigger: 'change' }
          ],
          injob: [
            { required: true, message: '请选择该联系人是否在职', trigger: 'change' }
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
            axios.post(LiaisonApis.liaisonListUrl, {
              name: this.LiaisonForm.name,
              customer: this.customer_id,
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
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ name: 'Liaison' })
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
  .page-liaison-add {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
