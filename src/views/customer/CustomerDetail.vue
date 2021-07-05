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
        <el-input type="textarea" v-model="CustomerForm.remarks" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('CustomerForm')">立即保存</el-button>
        <el-button @click="resetForm('CustomerForm')">重置</el-button>
        <el-button @click="recoverForm()">恢复</el-button>
      </el-form-item>
    </el-form>

    <!-- 该客户下的联系人信息 -->
    <div class="hr">
      <div>联系人信息：</div>
      <div class="add-button">
        <el-button
          size="mini"
          type="primary"
          @click="goAddLiaison(id)">添加新的联系人</el-button>
      </div>
    </div>
    <template>
      <el-table
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
          label="联系方式"
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
    </template>

    <!-- 该客户下的拜访记录信息 -->
    <div class="hr">
      <div>拜访记录信息：</div>
      <div class="add-button">
        <el-button
          size="mini"
          type="primary"
          @click="goAddRecord(id)">添加新的拜访记录</el-button>
      </div>
    </div>
    <template>
      <el-table
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
    </template>

    <!-- 该客户下的商机信息 -->
    <div class="hr">
      <div>商机信息：</div>
      <div class="add-button">
        <el-button
          size="mini"
          type="primary"
          @click="goAddBusiness(id)">添加新的商机</el-button>
      </div>
    </div>
    <template>
      <el-table
        :data="BusinessList"
        style="width: 100%; margin-bottom: 35px;"
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
    </template>
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
        BusinessList: []
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
          return 'color: #3DA2DF; font-weight: bold;'
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
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
