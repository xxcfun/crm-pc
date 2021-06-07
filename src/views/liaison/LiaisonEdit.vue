<template>
  <div class="page-liaison-edit">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Liaison' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑联系人</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      编辑联系人：
    </div>

    <!-- 表单 -->
    <el-form :model="LiaisonForm" ref="LiaisonForm" label-width="80px" style="width: 50%">
      <el-form-item label="联系人">
        <el-input v-model="LiaisonForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-autocomplete
          v-model="LiaisonForm.customer"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          clearable style="width: 100%"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="LiaisonForm.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="职务">
        <el-select v-model="LiaisonForm.job" placeholder="职务" clearable>
          <el-option label="经理" value="1"></el-option>
          <el-option label="采购" value="2"></el-option>
          <el-option label="技术" value="3"></el-option>
          <el-option label="售后" value="4"></el-option>
          <el-option label="业务" value="5"></el-option>
          <el-option label="其它" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否在职">
        <el-radio-group v-model="LiaisonForm.injob">
          <el-radio label="在职"></el-radio>
          <el-radio label="离职"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="微信">
        <el-input v-model="LiaisonForm.wx" clearable></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="LiaisonForm.qq" clearable></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="LiaisonForm.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="兴趣爱好">
        <el-input v-model="LiaisonForm.hobby" clearable></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-input v-model="LiaisonForm.birthday" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="LiaisonForm.remarks"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('LiaisonForm')">立即保存</el-button>
        <el-button @click="resetForm('LiaisonForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'LiaisonEdit',
    data () {
      return {
        LiaisonForm: {
          name: '刘锐',
          customer: '山东宝铃自动化设备有限公司',
          phone: 13853309041,
          job: '经理',
          injob: '在职',
          wx: '',
          qq: '',
          email: '',
          hobby: '',
          birthday: '',
          remarks: ''
        },
        // 联想输入框
        restaurants: [],
        timeout: null
      }
    },
    methods: {
      // 联想搜索下拉框
      loadAll () {
        return [
          { value: '山东津海环保装备有限公司' },
          { value: '淄博盛世有为自动化设备有限公司' },
          { value: '山东爱特机电技术有限责任公司' },
          { value: '潍坊科润达自动化有限公司' },
          { value: '德州智枫电气科技有限公司' },
          { value: '淄博海润电子科技有限公司' }
        ]
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
        console.log(item)
      },
      // 提交按钮
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
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
      this.restaurants = this.loadAll()
    }
  }
</script>

<style scoped lang="less">
  .page-liaison-edit {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
