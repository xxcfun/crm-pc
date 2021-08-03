<template>
  <div class="page-service-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Service' }">售前售后管理</el-breadcrumb-item>
      <el-breadcrumb-item>售后维修记录详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ ServiceForm.problem }} - {{ ServiceForm.customer.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      售后维修记录详情：
    </div>

    <el-row :gutter="20" style="margin-bottom: 30px">

      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="ServiceForm" ref="ServiceForm" label-width="80px">
          <el-form-item label="故障现象" prop="problem">
            <el-input type="textarea" v-model="ServiceForm.problem" readonly></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="ServiceForm.customer.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="其它事宜" prop="other">
            <el-input type="textarea" v-model="ServiceForm.other" readonly></el-input>
          </el-form-item>
          <el-form-item label="维修结果" prop="result">
            <el-input type="textarea" v-model="ServiceForm.result" readonly></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="ServiceForm.user.name" readonly></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="12">
        <!-- 维修过程 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ ServiceForm.customer.name }}-维修过程</span>
            <!--        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div class="text item">
            <el-form label-width="40px" v-for="(item, index) in processInfoArr">
              <el-form-item label="时间">
                <el-date-picker
                  v-model="item.date"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.process" type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { ServiceApis } from '../../utils/api'
  import axios from 'axios'

  export default {
    name: 'ServiceDetail',
    data () {
      return {
        id: '',
        ServiceForm: {
          problem: '',
          customer: {
            name: ''
          },
          other: '',
          result: ''
        },
        // 过程列表
        processInfoArr: [],
        // 过程列表重置为空的数据
        newInfoEmpty: {
          date: '',
          process: ''
        },
        // 新增过程列表要保存的数据
        newInfo: {
          date: '',
          process: ''
        }
      }
    },
    methods: {
      // 获取拜访记录详细信息
      getServiceDetail () {
        const url = ServiceApis.serviceAllDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.ServiceForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getServiceDetail()

        this.getProcessInfo()
      },

      /**
       * 维系过程相关
       */
      // 获取列表
      getProcessInfo () {
        this.processInfoArr = []
        axios.get(ServiceApis.serviceProcessListUrl, {
          params: {
            service: this.id
          }
        }).then(({ data }) => {
          this.processInfoArr = data
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    created () {
      // 查询接口
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-service-add {
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
