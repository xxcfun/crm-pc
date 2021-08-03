<template>
  <div class="page-implement-add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Implement' }">实施管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加实施记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      添加实施记录：
    </div>

    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col :span="12">
        <!-- 表单 -->
        <el-form :model="ImplementForm" :rules="rules" ref="ImplementForm" label-width="80px">
          <el-form-item label="测试方案" prop="testplan">
            <el-input v-model="ImplementForm.testplan" clearable></el-input>
          </el-form-item>
          <el-form-item label="实施日期" prop="date">
            <el-date-picker
              v-model="ImplementForm.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="客户名称" prop="state">
            <el-autocomplete
              v-model="ImplementForm.state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入客户名称"
              @select="handleSelect"
              clearable style="width: 100%"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="测试报告" prop="report">
            <el-input type="textarea" v-model="ImplementForm.report" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ImplementForm')">立即添加</el-button>
            <el-button @click="resetForm('ImplementForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

<!--      <el-col :span="12">-->
<!--        &lt;!&ndash; 维修过程 &ndash;&gt;-->
<!--        <el-card class="box-card">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>{{ ImplementForm.state }}-测试方案</span>-->
<!--            &lt;!&ndash;        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>&ndash;&gt;-->
<!--          </div>-->
<!--          <div class="text item">-->
<!--            <el-form label-width="80px" v-for="(item, index) in implementInfoArr">-->
<!--              <el-form-item label="测试方案">-->
<!--                <el-input v-model="item.programme" type="textarea"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="测试报告">-->
<!--                <el-input v-model="item.report" type="textarea"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="操作">-->
<!--                <el-button type="success" @click="confirmUpdate(item.id, index)">确认修改</el-button>-->
<!--                <el-button type="danger" @click="deleteInfo(item.id)">删除</el-button>-->
<!--              </el-form-item>-->
<!--            </el-form>-->

<!--            <el-form label-width="80px">-->
<!--              <el-form-item label="测试方案">-->
<!--                <el-input v-model="newInfo.programme" type="textarea"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="测试报告">-->
<!--                <el-input v-model="newInfo.report" type="textarea"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="操作">-->
<!--                <el-button type="primary" @click="addProcess">新增测试方案</el-button>-->
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
  import { CustomerApis, ImplementApis } from '../../utils/api'

  export default {
    name: 'ImplementAdd',
    data () {
      return {
        ImplementForm: {
          testplan: '',
          state: '',
          report: '',
          date: '',
        },
        rules: {
          testplan: [
            { required: true, message: '请输入测试方案', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请输入支持时间', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请输入客户名称', trigger: 'change' }
          ],
          report: [
            { required: true, message: '请输入测试报告', trigger: 'blur' }
          ]
        },
        // 客户id
        customer_id: '',
        // 联想输入框
        restaurants: [],
        state: '',
        timeout: null
        // // 过程列表
        // implementInfoArr: [],
        // // 过程列表重置为空的数据
        // newInfoEmpty: {
        //   programme: '',
        //   report: ''
        // },
        // // 新增过程列表要保存的数据
        // newInfo: {
        //   programme: '',
        //   report: ''
        // },
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
            axios.post(ImplementApis.implementListUrl, {
              customer: this.customer_id,
              testplan: this.ImplementForm.testplan,
              report: this.ImplementForm.report,
              date: this.ImplementForm.date,
            }).then(({ data }) => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ name: 'Implement' })
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
  .page-implement-add {
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
