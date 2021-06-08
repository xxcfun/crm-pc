<template>
  <!-- 客户详情页面 -->
  <div class="page-customer-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Customer' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="hr">
      客户基本信息：
    </div>

    <!-- 客户基本信息 -->
    <el-form :model="CustomerForm" label-width="80px" style="width: 50%">
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
        <el-input v-model="CustomerForm.website" readonly></el-input>
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
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="CustomerForm.remarks" readonly></el-input>
      </el-form-item>
    </el-form>

    <!-- 该客户下的联系人信息 -->
    <div class="hr">
      联系人信息：
    </div>
    <template>
      <el-table
        :data="LiaisonList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          fixed="fixed"
          prop="name"
          label="联系人姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="customer"
          label="客户名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          width="150">
        </el-table-column>
        <el-table-column
          prop="job"
          label="职位"
          width="100">
        </el-table-column>
        <el-table-column
          prop="injob"
          label="是否在职"
          width="100">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="user"
          label="创建人"
          width="100">
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
      拜访记录信息：
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
          width="300">
        </el-table-column>
        <el-table-column
          prop="customer"
          label="客户名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="status"
          label="拜访方式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="main"
          label="主要事宜"
          width="500">
        </el-table-column>
        <el-table-column
          prop="next"
          label="后续工作安排"
          width="500">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="user"
          label="创建人"
          width="100">
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
      商机信息：
    </div>
    <template>
      <el-table
        :data="BusinessList"
        style="width: 100%; margin-bottom: 35px;"
        :cell-style="setCellColor">
        <el-table-column
          prop="name"
          label="商机名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="customer"
          label="客户名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="winning_rate"
          label="赢单率"
          width="100">
        </el-table-column>
        <el-table-column
          prop="money"
          label="预估金额"
          width="150">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="user"
          label="创建人"
          width="100">
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
  export default {
    name: 'CustomerDetail',
    data () {
      return {
        // 客户详细信息
        CustomerForm: {
          name: '山东宝铃自动化设备有限公司',
          rank: '潜在客户',
          website: '',
          scale: '0~10人',
          nature: '有限责任公司',
          industry: '系统集成商',
          remarks: ''
        },
        // 客户下的联系人信息
        LiaisonList: [
          {
            id: 1,
            name: '刘锐',
            customer: '山东宝铃自动化设备有限公司',
            phone: '13853309041',
            job: '经理',
            injob: '在职',
            created_at: '2021年6月2日 18:03',
            user: '耿冠超'
          },
          {
            id: 2,
            name: '刘锐',
            customer: '山东宝铃自动化设备有限公司',
            phone: '13853309041',
            job: '经理',
            injob: '在职',
            created_at: '2021年6月2日 18:03',
            user: '耿冠超'
          },
          {
            id: 3,
            name: '刘锐',
            customer: '山东宝铃自动化设备有限公司',
            phone: '13853309041',
            job: '经理',
            injob: '在职',
            created_at: '2021年6月2日 18:03',
            user: '耿冠超'
          }
        ],
        // 客户下的拜访记录信息
        RecordList: [
          {
            id: 1,
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            id: 2,
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            id: 3,
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          }
        ],
        // 客户下的商机信息
        BusinessList: [
          {
            id: 1,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 2,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            id: 3,
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          }
        ]
      }
    },
    methods: {
      // 统一列颜色
      setCellColor ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          return 'color: #3DA2DF; font-weight: bold;'
        }
      },
      // 统一编辑接口
      liaisonEdit (id, row) {
        this.$router.push({ name: 'LiaisonEdit', params: { id: id } })
      },
      recordEdit (id, row) {
        this.$router.push({ name: 'RecordEdit', params: { id: id } })
      },
      businessEdit (id, row) {
        this.$router.push({ name: 'BusinessEdit', params: { id: id } })
      },
      // 统一删除接口
      liaisonDelete (id, row) {
        console.log(id, row)
      },
      recordDelete (id, row) {
        console.log(id, row)
      },
      businessDelete (id, row) {
        console.log(id, row)
      }
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
    }
  }
</style>
