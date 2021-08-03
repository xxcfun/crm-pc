<template>
  <div class="page-aftersupport-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'AfterSupportAll' }">售前售后管理</el-breadcrumb-item>
      <el-breadcrumb-item>售后支持记录详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ AfterSupportForm.aftersupport }} - {{ AfterSupportForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      售后支持记录详情：
    </div>

    <!-- 表单 -->
    <el-form :model="AfterSupportForm" ref="AfterSupportForm" label-width="80px" style="width: 50%">
      <el-form-item label="售后支持" prop="aftersupport">
        <el-input v-model="AfterSupportForm.aftersupport" readonly></el-input>
      </el-form-item>
      <el-form-item label="服务日期" prop="date">
        <el-input v-model="AfterSupportForm.date" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="AfterSupportForm.customer.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="服务方式" prop="status">
        <el-input v-model="AfterSupportForm.status" readonly></el-input>
      </el-form-item>
      <el-form-item label="详情描述" prop="des">
        <el-input type="textarea" v-model="AfterSupportForm.des" readonly></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="AfterSupportForm.user.name" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { AfterSupportApis } from '../../utils/api'
  import axios from 'axios'

  export default {
    name: 'AfterSupportAllDetail',
    data () {
      return {
        id: '',
        AfterSupportForm: {
          aftersupport: '',
          customer: '',
          status: '',
          des: '',
          date: ''
        }
      }
    },
    methods: {
      // 获取拜访记录详细信息
      getAfterSupportDetail () {
        const url = AfterSupportApis.afterSupportAllDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.AfterSupportForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getAfterSupportDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-aftersupport-add {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
