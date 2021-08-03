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
            <el-input type="textarea" v-model="ServiceForm.problem" clearable></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="ServiceForm.customer.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="其它事宜" prop="other">
            <el-input type="textarea" v-model="ServiceForm.other" clearable></el-input>
          </el-form-item>
          <el-form-item label="维修结果" prop="result">
            <el-input type="textarea" v-model="ServiceForm.result" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ServiceForm')">立即保存</el-button>
            <el-button @click="resetForm('ServiceForm')">重置</el-button>
            <el-button @click="recoverForm()">恢复</el-button>
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
              <el-form-item label="操作">
                <el-button type="success" @click="confirmUpdate(item.id, index)">确认修改</el-button>
                <el-button type="danger" @click="deleteInfo(item.id)">删除</el-button>
              </el-form-item>
            </el-form>

            <el-form label-width="40px">
              <el-form-item label="时间">
                <el-date-picker
                  v-model="newInfo.date"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="newInfo.process" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="操作">
                <el-button type="primary" @click="addProcess">新增维修过程</el-button>
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
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = ServiceApis.serviceDetailUrl.replace('#{id}', this.id)
            axios.put(url, {
              problem: this.ServiceForm.problem,
              state: this.ServiceForm.state,
              other: this.ServiceForm.other,
              result: this.ServiceForm.result
            }).then(({ data }) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getServiceDetail()
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
        this.getServiceDetail()
      },
      // 获取拜访记录详细信息
      getServiceDetail () {
        const url = ServiceApis.serviceDetailUrl.replace('#{id}', this.id)
        axios.get(url).then(({ data }) => {
          this.ServiceForm = data
        })
      },
      loadData () {
        // 获取路由id
        this.id = this.$route.params.id
        // 调用接口
        this.getServiceDetail()
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
      },
      // 提交重置新表单
      addProcess () {
        axios.post(ServiceApis.serviceProcessListUrl, {
          date: this.newInfo.date,
          process: this.newInfo.process,
          service: this.id
        }).then(({ data }) => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          // 重置
          this.getProcessInfo()
          this.newInfo = Object.assign({}, this.newInfoEmpty)
        })
      },
      // 更新
      confirmUpdate (id, index) {
        const url = ServiceApis.serviceProcessDetailUrl.replace('#{id}', id)
        axios.patch(url, {
          date: this.processInfoArr[index].date,
          process: this.processInfoArr[index].process,
          service: this.id
        }, {
          params: {
            service: this.id
          }
        }).then(({ data }) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getProcessInfo()
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
          const url = ServiceApis.serviceProcessDetailUrl.replace('#{id}', id)
          axios.delete(url, {
            params: {
              service: this.id
            }
          }).then(({ data }) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getProcessInfo()
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
      this.getProcessInfo()
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
