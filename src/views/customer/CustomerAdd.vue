<template>
  <!-- 客户添加页面 -->
  <div class="page-customer-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Customer' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加客户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      添加客户：
    </div>

    <!-- 表单 -->
    <el-form :model="CustomerForm" ref="CustomerForm" label-width="80px" style="width: 50%">
      <el-form-item label="客户名称">
        <el-input v-model="CustomerForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户级别">
        <el-select v-model="CustomerForm.rank" placeholder="客户级别" clearable>
          <el-option label="普通客户" value="1"></el-option>
          <el-option label="一般客户" value="2"></el-option>
          <el-option label="重点客户" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否成交">
        <el-radio-group v-model="CustomerForm.is_deal">
          <el-radio label="成交"></el-radio>
          <el-radio label="未成交"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公司网址">
        <el-input v-model="CustomerForm.website"></el-input>
      </el-form-item>
      <el-form-item label="客户规模">
        <el-select v-model="CustomerForm.scale" placeholder="客户规模" clearable>
          <el-option label="0~10人" value="1"></el-option>
          <el-option label="10~50人" value="2"></el-option>
          <el-option label="50~100人" value="3"></el-option>
          <el-option label="100~1000人" value="4"></el-option>
          <el-option label="1000人以上" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户性质">
        <el-select v-model="CustomerForm.nature" placeholder="客户性质" clearable>
          <el-option label="机台设备制造商" value="1"></el-option>
          <el-option label="生产制造型企业" value="2"></el-option>
          <el-option label="系统集成商" value="3"></el-option>
          <el-option label="分销商" value="4"></el-option>
          <el-option label="其它" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户行业">
        <el-select v-model="CustomerForm.industry" placeholder="客户行业" clearable>
          <el-option label="机台设备制造商" value="1"></el-option>
          <el-option label="生产制造型企业" value="2"></el-option>
          <el-option label="系统集成商" value="3"></el-option>
          <el-option label="分销商" value="4"></el-option>
          <el-option label="其它" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="CustomerForm.remarks"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('CustomerForm')">立即添加</el-button>
        <el-button @click="resetForm('CustomerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'CustomerAdd',
    data () {
      return {
        // 客户详细信息
        CustomerForm: {
          name: '',
          rank: '',
          is_deal: '',
          website: '',
          scale: '',
          nature: '',
          industry: '',
          remarks: ''
        }
      }
    },
    methods: {
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
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped lang="less">
  .page-customer-add {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
