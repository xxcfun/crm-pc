<template>
  <div class="page-business-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Business' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商机详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ BusinessForm.name }} - {{ BusinessForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      商机基本信息：
    </div>

    <!-- 表单 -->
    <el-form :model="BusinessForm" ref="BusinessForm" label-width="80px" style="width: 50%; margin-bottom: 35px;">
      <el-form-item label="商机名称">
        <el-input v-model="BusinessForm.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="BusinessForm.customer.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="赢单率">
        <el-input v-model="BusinessForm.winning_rate" readonly></el-input>
      </el-form-item>
      <el-form-item label="预估金额">
        <el-input v-model="BusinessForm.money" readonly style="width: 50%">
          <template slot="append">万元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="BusinessForm.user.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="BusinessForm.remarks" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { BusinessApis } from '../../utils/api'

  export default {
    name: 'BusinessAllDetail',
    data () {
      return {
        id: '',
        BusinessForm: {
          name: '',
          customer: '',
          winning_rate: '',
          money: '',
          user: '',
          remarks: ''
        }
      }
    },
    methods: {
      // 获取联系人详细信息
      getBusinessDetail () {
        const url = BusinessApis.businessAllDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.BusinessForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getBusinessDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-business-detail {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
