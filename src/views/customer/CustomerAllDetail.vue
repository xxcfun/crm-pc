<template>
  <!-- 客户详情页面 -->
  <div class="page-customer-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'CustomerAll' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ CustomerForm.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      客户基本信息：
    </div>

    <!-- 客户基本信息 -->
    <el-form :model="CustomerForm" ref="CustomerForm" label-width="80px" style="width: 50%">
      <el-form-item label="客户名称">
        <el-input v-model="CustomerForm.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户级别">
        <el-input v-model="CustomerForm.rank" readonly></el-input>
      </el-form-item>
      <el-form-item label="是否成交">
        <el-input v-model="CustomerForm.is_deal" readonly></el-input>
      </el-form-item>
      <el-form-item label="公司网址">
        <el-input v-model="CustomerForm.website" placeholder="请填写公司网址" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户规模">
        <el-input v-model="CustomerForm.scale" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户性质">
        <el-input v-model="CustomerForm.nature" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户行业">
        <el-input v-model="CustomerForm.industry" readonly></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="CustomerForm.user.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="CustomerForm.remarks" readonly></el-input>
      </el-form-item>
    </el-form>

    <!-- 该客户下的联系人信息 -->
    <div class="hr" @click="show_lia = !show_lia">
      <div>联系人信息：</div>
    </div>
    <transition name="el-zoom-in-top">
      <el-table
        v-show="show_lia"
        :data="LiaisonList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          prop="name"
          label="联系人姓名"
          width="">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="">
        </el-table-column>
        <el-table-column
          prop="job"
          label="职位"
          width="">
        </el-table-column>
        <el-table-column
          prop="injob"
          label="是否在职"
          width="">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="创建人"
          width="150">
        </el-table-column>
      </el-table>
    </transition>

    <!-- 该客户下的拜访记录信息 -->
    <div class="hr" @click="show_rec = !show_rec">
      <div>拜访记录信息：</div>
    </div>
    <transition name="el-zoom-in-top">
      <el-table
        v-show="show_rec"
        :data="RecordList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          fixed="fixed"
          prop="theme"
          label="拜访主题"
          width="250">
        </el-table-column>
        <el-table-column
          prop="status"
          label="拜访方式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="main"
          label="主要事宜"
          min-width="200"
          width="600">
        </el-table-column>
        <el-table-column
          prop="product"
          label="现用产品"
          width="200">
        </el-table-column>
        <el-table-column
          prop="next"
          label="后续工作安排"
          min-width="200"
          width="600">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="创建人"
          width="150">
        </el-table-column>
      </el-table>
    </transition>

    <!-- 该客户下的商机信息 -->
    <div class="hr" @click="show_bus = !show_bus">
      <div>商机信息：</div>
    </div>
    <transition name="el-zoom-in-top">
      <el-table
        v-show="show_bus"
        :data="BusinessList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          prop="name"
          label="商机名称"
          width="">
        </el-table-column>
        <el-table-column
          prop="winning_rate"
          label="赢单率"
          width="">
        </el-table-column>
        <el-table-column
          prop="money"
          label="预估金额（万元）"
          width="">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="创建人"
          width="150">
        </el-table-column>
      </el-table>
    </transition>

    <!-- 该客户下的售前支持记录 -->
    <div class="hr" @click="show_pre = !show_pre">
      <div>售前支持记录：</div>
    </div>
    <transition name="el-zoom-in-top">
      <el-table
        v-show="show_pre"
        :data="PreSupportList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          prop="preplan"
          label="售前方案"
          width="300">
        </el-table-column>
        <el-table-column
          prop="product"
          label="产品"
          width="250">
        </el-table-column>
        <el-table-column
          prop="cycle"
          label="周期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="des"
          label="售前支持详情"
          width="300">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建日期"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="售前人员"
          width="150">
        </el-table-column>
      </el-table>
    </transition>

    <!-- 该客户下的实施送测记录 -->
    <div class="hr" @click="show_imp = !show_imp">
      <div>实施送测记录：</div>
    </div>
    <transition name="el-zoom-in-top">
      <el-table
        v-show="show_imp"
        :data="ImplementList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          prop="impplan"
          label="实施方案"
          width="400">
        </el-table-column>
        <el-table-column
          prop="product"
          label="产品名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="report"
          label="结果反馈"
          width="400">
        </el-table-column>
        <el-table-column
          prop="date"
          label="实施时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="实施人员"
          width="150">
        </el-table-column>
      </el-table>
    </transition>

    <!-- 该客户下的售后支持记录 -->
    <div class="hr" @click="show_aft = !show_aft">
      <div>售后支持记录：</div>
    </div>
    <transition name="el-zoom-in-top">
      <el-table
        v-show="show_aft"
        :data="AfterSupportList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          prop="aftersupport"
          label="售后支持"
          width="400">
        </el-table-column>
        <el-table-column
          prop="status"
          label="支持方式"
          width="150">
        </el-table-column>
        <el-table-column
          prop="des"
          label="售后支持详情"
          width="400">
        </el-table-column>
        <el-table-column
          prop="date"
          label="服务日期"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="售后人员"
          width="150">
        </el-table-column>
      </el-table>
    </transition>

    <!-- 该客户下的售后维修记录 -->
    <div class="hr" @click="show_ser = !show_ser">
      <div>售后维修记录：</div>
    </div>
    <transition name="el-zoom-in-top">
      <el-table
        v-show="show_ser"
        :data="ServiceList"
        style="width: 100%; margin-bottom: 35px;"
        :cell-style="setCellColor">
        <el-table-column
          prop="problem"
          label="问题描述"
          width="300">
        </el-table-column>
        <el-table-column
          prop="other"
          label="其它事宜"
          width="350">
        </el-table-column>
        <el-table-column
          prop="result"
          label="维修结果"
          width="350">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user.name"
          label="维修人员"
          width="150">
        </el-table-column>
      </el-table>
    </transition>
  </div>

</template>

<script>
  import { BusinessApis, CustomerApis, LiaisonApis, RecordApis } from '../../utils/api'
  import axios from 'axios'

  export default {
    name: 'CustomerAllDetail',
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
          user: '',
          remarks: ''
        },
        // 客户下的联系人信息
        LiaisonList: [],
        // 客户下的拜访记录信息
        RecordList: [],
        // 客户下的商机信息
        BusinessList: [],
        // 客户下的售前支持信息
        PreSupportList: [],
        // 客户下的实施送测信息
        ImplementList: [],
        // 客户下的售后支持信息
        AfterSupportList: [],
        // 客户下的维修服务信息
        ServiceList: [],
        // 显示控制
        show_lia: false,
        show_rec: false,
        show_bus: false,
        show_pre: false,
        show_imp: false,
        show_aft: false,
        show_ser: false
      }
    },
    methods: {
      // 统一列颜色
      setCellColor ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          return 'color: #3DA2DF;'
        }
      },
      // 获取客户详细信息
      getCustomerDetail () {
        const url = CustomerApis.customerAllDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.CustomerForm = data
          this.LiaisonList = data.liaison
          this.RecordList = data.record
          this.BusinessList = data.business
          this.PreSupportList = data.presupport
          this.ImplementList = data.implement
          this.AfterSupportList = data.aftersupport
          this.ServiceList = data.service
        })
      },
      // 加载数据
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getCustomerDetail()
      }
    },
    created () {
      // 查询接口
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .page-customer-detail {
    margin-bottom: 35px;

    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
    .hr:hover {
      background-image: linear-gradient(#eef4f8, #ffffff);
    }
  }
</style>
