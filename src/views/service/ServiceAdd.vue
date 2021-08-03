<template>
  <div class="page-service-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Service' }">售前售后管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加售后维修记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      添加售后维修记录：
    </div>

    <el-row :gutter="20" style="margin-bottom: 30px">

      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="ServiceForm" :rules="rules" ref="ServiceForm" label-width="80px">
          <el-form-item label="故障现象" prop="problem">
            <el-input type="textarea" v-model="ServiceForm.problem" clearable></el-input>
          </el-form-item>
          <el-form-item label="客户名称" prop="state">
            <el-autocomplete
              v-model="ServiceForm.state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入客户名称"
              @select="handleSelect"
              clearable style="width: 100%"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="其它事宜" prop="other">
            <el-input type="textarea" v-model="ServiceForm.other" clearable></el-input>
          </el-form-item>
<!--          <el-form-item label="维修结果" prop="result">-->
<!--            <el-input type="textarea" v-model="ServiceForm.result" clearable></el-input>-->
<!--          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ServiceForm')">立即添加</el-button>
            <el-button @click="resetForm('ServiceForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

<!--      <el-col :span="12">-->
<!--        &lt;!&ndash; 维修过程 &ndash;&gt;-->
<!--        <el-card class="box-card">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>{{ ServiceForm.state }}-维修过程</span>-->
<!--            &lt;!&ndash;        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>&ndash;&gt;-->
<!--          </div>-->
<!--          <div class="text item">-->
<!--            <el-form label-width="40px" v-for="(item, index) in serviceInfoArr">-->
<!--              <el-form-item label="时间">-->
<!--                <el-date-picker-->
<!--                  v-model="item.date"-->
<!--                  type="date"-->
<!--                  placeholder="选择日期">-->
<!--                </el-date-picker>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="描述">-->
<!--                <el-input v-model="item.des" type="textarea"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="操作">-->
<!--                <el-button type="success" @click="confirmUpdate(item.id, index)">确认修改</el-button>-->
<!--                <el-button type="danger" @click="deleteInfo(item.id)">删除</el-button>-->
<!--              </el-form-item>-->
<!--            </el-form>-->

<!--            <el-form label-width="40px">-->
<!--              <el-form-item label="时间">-->
<!--                <el-date-picker-->
<!--                  v-model="newInfo.date"-->
<!--                  type="date"-->
<!--                  placeholder="选择日期">-->
<!--                </el-date-picker>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="描述">-->
<!--                <el-input v-model="newInfo.des" type="textarea"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="操作">-->
<!--                <el-button type="primary" @click="addProcess">新增维修过程</el-button>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import { CustomerApis, ServiceApis } from '../../utils/api'

  export default {
    name: 'ServiceAdd',
    data () {
      return {
        ServiceForm: {
          problem: '',
          state: '',
          other: '',
        },
        rules: {
          problem: [
            { required: true, message: '请输入故障现象', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请输入客户名称', trigger: 'change' }
          ],
          other: [
            { required: true, message: '请输入其它事宜', trigger: 'blur' }
          ],
        },
        // 客户id
        customer_id: '',
        // 联想输入框
        restaurants: [],
        state: '',
        timeout: null
      }
    },
    methods: {
      // 联想搜索下拉框
      loadAll () {
        axios.get(CustomerApis.linkallcustomerUrl).then(({ data }) => {
          this.restaurants = data
        })
      },
      querySearchAsync (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 1000 * Math.random())
      },
      createStateFilter (queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect (item) {
        // 选中数据，给 customer id 赋值
        this.customer_id = item.id
        console.log(item)
      },
      // 提交按钮
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(ServiceApis.serviceListUrl, {
              customer: this.customer_id,
              problem: this.ServiceForm.problem,
              state: this.ServiceForm.state,
              other: this.ServiceForm.other,
            }).then(({ data }) => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ name: 'Service' })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 重置按钮
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    mounted () {
      this.loadAll()
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
      hr {
        margin-bottom: 25px;
      }
    }
  }
</style>
