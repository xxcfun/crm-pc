<template>
  <div class="page-liaison-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Liaison' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>联系人详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ LiaisonForm.name }} - {{ LiaisonForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      联系人基本信息：
    </div>

    <!-- 表单 -->
    <el-form :model="LiaisonForm" ref="LiaisonForm" label-width="80px" style="width: 50%; margin-bottom: 35px;">
      <el-form-item label="联系人">
        <el-input v-model="LiaisonForm.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="LiaisonForm.customer.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="LiaisonForm.phone" readonly></el-input>
      </el-form-item>
      <el-form-item label="职务">
        <el-input v-model="LiaisonForm.job" readonly></el-input>
      </el-form-item>
      <el-form-item label="是否在职">
        <el-input v-model="LiaisonForm.injob" readonly></el-input>
      </el-form-item>
      <el-form-item label="微信">
        <el-input v-model="LiaisonForm.wx" readonly></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="LiaisonForm.qq" readonly></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="LiaisonForm.email" readonly></el-input>
      </el-form-item>
      <el-form-item label="兴趣爱好">
        <el-input v-model="LiaisonForm.hobby" readonly></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-input v-model="LiaisonForm.birthday" readonly></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="LiaisonForm.user.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="LiaisonForm.remarks" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { LiaisonApis } from '../../utils/api'

  export default {
    name: 'LiaisonAllDetail',
    data () {
      return {
        id: '',
        LiaisonForm: {
          name: '',
          customer: '',
          phone: '',
          job: '',
          injob: '',
          wx: '',
          qq: '',
          email: '',
          hobby: '',
          birthday: '',
          user: '',
          remarks: ''
        }
      }
    },
    methods: {
      // 获取联系人详细信息
      getLiaisonDetail () {
        const url = LiaisonApis.liaisonAllDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.LiaisonForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getLiaisonDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
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
