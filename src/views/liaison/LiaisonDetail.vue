<template>
  <div class="page-liaison-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Liaison' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑联系人</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      编辑联系人：
    </div>

    <!-- 表单 -->
    <el-form :model="LiaisonForm" ref="LiaisonForm" label-width="80px" style="width: 50%">
      <el-form-item label="联系人">
        <el-input v-model="LiaisonForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          clearable
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="LiaisonForm.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="职务">
        <el-select v-model="LiaisonForm.job" placeholder="职务" clearable>
          <el-option label="经理" value="1"></el-option>
          <el-option label="采购" value="2"></el-option>
          <el-option label="技术" value="3"></el-option>
          <el-option label="售后" value="4"></el-option>
          <el-option label="业务" value="5"></el-option>
          <el-option label="其它" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否在职">
        <el-select v-model="LiaisonForm.injob" placeholder="是否在职" clearable>
          <el-option label="在职" value="1"></el-option>
          <el-option label="离职" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="微信">
        <el-input v-model="LiaisonForm.wx" clearable></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="LiaisonForm.qq" clearable></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="LiaisonForm.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="兴趣爱好">
        <el-input v-model="LiaisonForm.hobby" clearable></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-input v-model="LiaisonForm.birthday" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="LiaisonForm.remarks"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'LiaisonDetail',
    data () {
      return {
        LiaisonForm: {
          name: '刘锐',
          customer: '山东宝铃自动化设备有限公司',
          phone: 13853309041,
          job: '经理',
          injob: '在职',
          wx: '',
          qq: '',
          email: '',
          hobby: '',
          birthday: '',
          remarks: ''
        }
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .page-liaison-detail {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
