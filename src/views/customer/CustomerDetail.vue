<template>
  <!-- 客户详情页面 -->
  <div class="page-customer-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Customer' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ CustomerForm.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      客户基本信息：
    </div>

    <!-- 客户基本信息 -->
    <el-form :model="CustomerForm" ref="CustomerForm" label-width="80px" style="width: 50%">
      <el-form-item label="客户名称" prop="name">
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

      <el-divider @click="form = !form">
        <i v-if="form === false" class="el-icon-arrow-down" style="cursor: pointer">展开更多</i>
        <i v-else class="el-icon-arrow-up" style="cursor: pointer">点击合并</i>
      </el-divider>

      <transition name="el-zoom-in-top">
        <el-form-item v-show="form" label="公司网址" prop="website">
          <el-input v-model="CustomerForm.website" placeholder="请填写公司网址" clearable></el-input>
        </el-form-item>
      </transition>
      <transition name="el-zoom-in-top">
        <el-form-item v-show="form" label="客户规模" prop="scale">
          <el-select v-model="CustomerForm.scale" placeholder="请选择客户规模" clearable>
            <el-option label="0~10人" :value=1></el-option>
            <el-option label="10~50人" :value=2></el-option>
            <el-option label="50~100人" :value=3></el-option>
            <el-option label="100~1000人" :value=4></el-option>
            <el-option label="1000人以上" :value=5></el-option>
          </el-select>
        </el-form-item>
      </transition>
      <transition name="el-zoom-in-top">
        <el-form-item v-show="form" label="客户性质" prop="nature">
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
      </transition>
      <transition name="el-zoom-in-top">
        <el-form-item v-show="form" label="客户行业" prop="industry">
          <el-select v-model="CustomerForm.industry" placeholder="请选择客户行业" clearable>
            <el-option label="机台设备制造商" :value=1></el-option>
            <el-option label="生产制造型企业" :value=2></el-option>
            <el-option label="系统集成商" :value=3></el-option>
            <el-option label="分销商" :value=4></el-option>
            <el-option label="其它" :value=5></el-option>
          </el-select>
        </el-form-item>
      </transition>
      <transition name="el-zoom-in-top">
        <el-form-item v-show="form" label="备注信息" prop="remarks">
          <el-input type="textarea" v-model="CustomerForm.remarks" clearable></el-input>
        </el-form-item>
      </transition>

      <el-form-item>
        <el-button type="primary" @click="submitForm('CustomerForm')">立即保存</el-button>
        <el-button @click="resetForm('CustomerForm')">重置</el-button>
        <el-button @click="recoverForm()">恢复</el-button>
      </el-form-item>
    </el-form>

    <!-- 该客户下的联系人信息 -->
    <div class="hr" @click="show_lia = !show_lia">
      <div>联系人信息：</div>
      <div class="add-button">
        <el-button
          size="mini"
          type="primary"
          @click="goAddLiaison(id)">添加新的联系人</el-button>
      </div>
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
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="liaisonEdit(scope.row.id, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="liaisonDelete(scope.row.id, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </transition>

    <!-- 该客户下的拜访记录信息 -->
    <div class="hr" @click="show_rec = !show_rec">
      <div>拜访记录信息：</div>
      <div class="add-button">
        <el-button
          size="mini"
          type="primary"
          @click="goAddRecord(id)">添加新的拜访记录</el-button>
      </div>
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
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="recordEdit(scope.row.id, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="recordDelete(scope.row.id, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </transition>

    <!-- 该客户下的商机信息 -->
    <div class="hr" @click="show_bus = !show_bus">
      <div>商机信息：</div>
      <div class="add-button">
        <el-button
          size="mini"
          type="primary"
          @click="goAddBusiness(id)">添加新的商机</el-button>
      </div>
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
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="businessEdit(scope.row.id, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="businessDelete(scope.row.id, scope.row)">删除</el-button>
        </template>
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
      style="width: 100%;"
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
    name: 'CustomerDetail',
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
        form: false,
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
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getCustomerDetail()
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
      // 恢复内容
      recoverForm () {
        this.getCustomerDetail()
      },
      // 统一列颜色
      setCellColor ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          return 'color: #3DA2DF;'
        }
      },
      // 统一编辑接口
      liaisonEdit (id, row) {
        this.$router.push({ name: 'LiaisonDetail', params: { id: id } })
      },
      recordEdit (id, row) {
        this.$router.push({ name: 'RecordDetail', params: { id: id } })
      },
      businessEdit (id, row) {
        this.$router.push({ name: 'BusinessDetail', params: { id: id } })
      },
      // 统一删除接口
      liaisonDelete (id, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = LiaisonApis.liaisonDetailUrl.replace('#{id}', id)
          axios.delete(url).then(({ data }) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 删除成功，再次查询一次接口
            this.getCustomerDetail()
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      recordDelete (id, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = RecordApis.recordDetailUrl.replace('#{id}', id)
          axios.delete(url).then(({ data }) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 删除成功，再次查询一次接口
            this.getCustomerDetail()
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      businessDelete (id, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = BusinessApis.businessDetailUrl.replace('#{id}', id)
          axios.delete(url).then(({ data }) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 删除成功，再次查询一次接口
            this.getCustomerDetail()
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 统一跳转添加接口
      goAddLiaison(id) {
        this.$router.push({ name: 'AddLiaison', params: { id: id } })
      },
      goAddRecord(id) {
        this.$router.push({ name: 'AddRecord', params: { id: id } })
      },
      goAddBusiness(id) {
        this.$router.push({ name: 'AddBusiness', params: { id: id } })
      },
      // 获取客户详细信息
      getCustomerDetail () {
        const url = CustomerApis.customerDetailUrl.replace('#{id}', this.id)
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
