<template>
  <!-- 客户编辑页面 -->
  <div class="page-customer-edit">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Customer' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑客户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      编辑客户：
    </div>

    <!-- 表单 -->
    <el-form :model="CustomerForm" ref="CustomerForm" label-width="80px" style="width: 50%">
      <el-form-item label="客户名称">
        <el-input v-model="CustomerForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户级别" prop="rank">
        <el-select v-model="CustomerForm.rank" placeholder="请选择客户级别" clearable>
          <el-option label="潜在客户" :value=1>潜在客户</el-option>
          <el-option label="意向客户" :value=2>意向客户</el-option>
          <el-option label="重点客户" :value=3>重点客户</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否成交" prop="is_deal">
        <el-radio-group v-model="CustomerForm.is_deal">
          <el-radio :label=1>成交</el-radio>
          <el-radio :label=0>未成交</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公司网址" prop="website">
        <el-input v-model="CustomerForm.website" placeholder="请填写公司网址" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户规模" prop="scale">
        <el-select v-model="CustomerForm.scale" placeholder="请选择客户规模" clearable>
          <el-option label="0~10人" :value=1></el-option>
          <el-option label="10~50人" :value=2></el-option>
          <el-option label="50~100人" :value=3></el-option>
          <el-option label="100~1000人" :value=4></el-option>
          <el-option label="1000人以上" :value=5></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户性质" prop="nature">
        <el-select v-model="CustomerForm.nature" placeholder="请选择客户性质" clearable>
          <el-option label="有限责任公司" :value=1></el-option>
          <el-option label="股份有限公司" :value=2></el-option>
          <el-option label="国有企业" :value=3></el-option>
          <el-option label="集体企业" :value=4></el-option>
          <el-option label="私营企业" :value=5></el-option>
          <el-option label="个体工商户" :value=6></el-option>
          <el-option label="合伙企业" :value=7></el-option>
          <el-option label="联营企业" :value=8></el-option>
          <el-option label="股份合作制企业" :value=9></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户行业" prop="industry">
        <el-select v-model="CustomerForm.industry" placeholder="请选择客户行业" clearable>
          <el-option label="机台设备制造商" :value=1></el-option>
          <el-option label="生产制造型企业" :value=2></el-option>
          <el-option label="系统集成商" :value=3></el-option>
          <el-option label="分销商" :value=4></el-option>
          <el-option label="其它" :value=5></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input type="textarea" v-model="CustomerForm.remarks"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('CustomerForm')">立即保存</el-button>
        <el-button @click="resetForm('CustomerForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { CustomerApis } from '../../utils/api'
  import axios from 'axios'

  export default {
    name: 'CustomerEdit',
    data () {
      return {
        id: '',
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
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = CustomerApis.customerDetailUrl.replace('#{id}', this.id)
            axios.put(url, {
              name: this.CustomerForm.name,
              rank: this.CustomerForm.rank,
              is_deal: this.CustomerForm.is_deal,
              website: this.CustomerForm.website,
              scale: this.CustomerForm.scale,
              nature: this.CustomerForm.nature,
              industry: this.CustomerForm.industry,
              remarks: this.CustomerForm.remarks
            }).then(({ data }) => {
              console.log(data)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.push({ name: 'Customer' })
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
      // 获取客户详细信息
      getCustomerDetail () {
        const url = CustomerApis.customerDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.CustomerForm = data
        })
      },
      loadData () {
        this.id = this.$route.params.id
        this.getCustomerDetail()
      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-customer-edit {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
