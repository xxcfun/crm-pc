<template>
  <div class="page-presupport-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'PreSupportAll' }">售前售后管理</el-breadcrumb-item>
      <el-breadcrumb-item>售前支持记录详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ PreSupportForm.preplan }} - {{ PreSupportForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      售前支持记录详情：
    </div>

    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="PreSupportForm" ref="PreSupportForm" label-width="80px">
          <el-form-item label="售前方案" prop="preplan">
            <el-input v-model="PreSupportForm.preplan" readonly></el-input>
          </el-form-item>
          <el-form-item label="支持时间" prop="date">
            <el-input v-model="PreSupportForm.date" readonly></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="PreSupportForm.customer.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="product">
            <el-input v-model="PreSupportForm.product" readonly></el-input>
          </el-form-item>
          <el-form-item label="周期" prop="cycle">
            <el-input v-model="PreSupportForm.cycle" readonly></el-input>
          </el-form-item>
          <el-form-item label="详情" prop="des">
            <el-input type="textarea" v-model="PreSupportForm.des" readonly></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="PreSupportForm.user.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="方案文件">
            <file-open :file="PreSupportForm.file"/>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import { PreSupportApis } from '../../utils/api'
  import FileOpen from '../../components/file/FileOpen'

  export default {
    name: 'PreSupportAllDetail',
    components: { FileOpen },
    data () {
      return {
        id: '',
        PreSupportForm: {
          preplan: '',
          date: '',
          customer: '',
          product: '',
          cycle: '',
          des: '',
          file: ''
        }
      }
    },
    methods: {
      // 获取拜访记录详细信息
      getPreSupportDetail () {
        const url = PreSupportApis.preSupportAllDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.PreSupportForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getPreSupportDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-presupport-add {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
