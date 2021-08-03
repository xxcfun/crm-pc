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

    <el-row :gutter="20" style="margin-bottom: 30px">

      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="BusinessForm" ref="BusinessForm" label-width="80px">
          <el-form-item label="商机名称" prop="name">
            <el-input v-model="BusinessForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="BusinessForm.customer.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="赢单率" prop="winning_rate">
            <el-select v-model="BusinessForm.winning_rate" placeholder="请选择赢单率" clearable>
              <el-option label="0%" :value=1></el-option>
              <el-option label="20%" :value=2></el-option>
              <el-option label="50%" :value=3></el-option>
              <el-option label="80%" :value=4></el-option>
              <el-option label="100%" :value=5></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预估金额">
            <el-input v-model="sum" readonly style="width: 50%">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="备注信息" prop="remarks">
            <el-input type="textarea" v-model="BusinessForm.remarks" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('BusinessForm')">立即保存</el-button>
            <el-button @click="resetForm('BusinessForm')">重置</el-button>
            <el-button @click="recoverForm()">恢复</el-button>
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
                <el-input v-model="item.name" type="text"></el-input>
              </el-form-item>
              <el-form-item label="产品数量">
                <el-input-number v-model="item.number" :min="1"></el-input-number>
              </el-form-item>
              <el-form-item label="产品单价">
                <el-input v-model="item.price" type="text"></el-input>
              </el-form-item>
              <el-form-item label="操作">
                <el-button type="success" @click="confirmUpdate(item.id, index)">确认修改</el-button>
                <el-button type="danger" @click="deleteInfo(item.id)">删除</el-button>
              </el-form-item>
            </el-form>

            <el-form label-width="80px">
              <el-form-item label="产品名称">
                <el-input v-model="newInfo.name" type="text"></el-input>
              </el-form-item>
              <el-form-item label="产品数量">
                <el-input-number v-model="newInfo.number" :min="1"></el-input-number>
              </el-form-item>
              <el-form-item label="产品单价">
                <el-input v-model="newInfo.price" type="text"></el-input>
              </el-form-item>
              <el-form-item label="操作">
                <el-button type="primary" @click="addProduct">新增产品方案</el-button>
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
    name: 'BusinessDetail',
    data () {
      return {
        id: '',
        BusinessForm: {
          name: '',
          customer: {
            id: '',
            name: ''
          },
          winning_rate: '',
          remarks: ''
        },
        // 产品列表
        productInfoArr: [],
        // 产品列表重置为空的数据
        newInfoEmpty: {
          name: '',
          number: '',
          price: ''
        },
        // 新增产品列表要保存的数据
        newInfo: {
          name: '',
          number: '',
          price: ''
        }
      }
    },
    computed: {
      sum: function () {
        const length = this.productInfoArr.length
        if (length) {
          let i = 0
          let all_price = 0
          for (i; i < length; i++) {
            all_price = all_price + Number(this.productInfoArr[i].price) * this.productInfoArr[i].number
          }
          return all_price/10000
        } else {
          return null
        }
      }
    },
    methods: {
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = BusinessApis.businessDetailUrl.replace('#{id}', this.id)
            axios.put(url, {
              name: this.BusinessForm.name,
              winning_rate: this.BusinessForm.winning_rate,
              money: this.sum,
              remarks: this.BusinessForm.remarks
            }).then(({ data }) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getBusinessDetail()
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
        this.getBusinessDetail()
      },
      // 获取联系人详细信息
      getBusinessDetail () {
        const url = BusinessApis.businessDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.BusinessForm = data
          this.getProductInfo()
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getBusinessDetail()
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
      // 提交
      addProduct () {
        axios.post(BusinessApis.businessProdListUrl, {
          name: this.newInfo.name,
          number: this.newInfo.number,
          price: this.newInfo.price,
          business: this.id
        }).then(({ data }) => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          // 重置新的
          this.getProductInfo()
          this.newInfo = Object.assign({}, this.newInfoEmpty)
        })
      },
      // 更新
      confirmUpdate (id, index) {
        const url = BusinessApis.businessProdDetailUrl.replace('#{id}', id)
        axios.patch(url, {
          name: this.productInfoArr[index].name,
          number: this.productInfoArr[index].number,
          price: this.productInfoArr[index].price,
          business: this.id
        },{
          params: {
            business: this.id
          }
        }).then(({ data }) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getProductInfo()
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 删除
      deleteInfo (id) {
        this.$confirm('是否要删除该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = BusinessApis.businessProdDetailUrl.replace('#{id}', id)
          axios.delete(url, {
            params: {
              business: this.id
            }
          }).then(({ data }) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getProductInfo()
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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
