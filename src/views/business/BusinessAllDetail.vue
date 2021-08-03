<template>
  <div class="page-business-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'BusinessAll' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商机详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ BusinessForm.name }} - {{ BusinessForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      商机基本信息：
    </div>

    <el-row :gutter="20" style="margin-bottom: 30px">

      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="BusinessForm" ref="BusinessForm" label-width="80px">
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
      </el-col>

      <el-col :span="12">
        <!-- 商机产品 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ BusinessForm.customer.name }}-产品方案</span>
            <!--        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div class="text item">
            <el-form label-width="80px" v-for="(item, index) in productInfoArr">
              <el-form-item label="产品名称">
                <el-input v-model="item.name" type="text" readonly></el-input>
              </el-form-item>
              <el-form-item label="产品数量">
                <el-input v-model="item.number" readonly></el-input>
              </el-form-item>
              <el-form-item label="产品单价">
                <el-input v-model="item.price" type="text" readonly></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

    </el-row>

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
        },
        // 产品列表
        productInfoArr: []
      }
    },
    methods: {
      // 获取联系人详细信息
      getBusinessDetail () {
        const url = BusinessApis.businessAllDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.BusinessForm = data
          this.getProductInfo()
        })
      },
      /**
       * 商机产品相关
       */
      // 获取列表
      getProductInfo () {
        this.productInfoArr = []
        axios.get(BusinessApis.businessProdListUrl, {
          params: {
            business: this.id
          }
        }).then(({ data }) => {
          this.productInfoArr = data
        }).catch(function (error) {
          console.log(error)
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
