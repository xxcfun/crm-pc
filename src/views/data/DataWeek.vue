<template>
  <!-- 周数据汇总 -->
  <div class="page-data-week">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">数据汇总</el-breadcrumb-item>
      <el-breadcrumb-item>一周数据汇总</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索栏 -->
    <el-form :model="SearchForm" ref="SearchForm" :inline="true">
      <el-form-item label="筛选员工数据">
        <el-select v-model="SearchForm.username" placeholder="请选择员工" :clearable="clearable">
          <el-option label="张安琪" value="1"></el-option>
          <el-option label="黄振世" value="2"></el-option>
          <el-option label="耿冠超" value="3"></el-option>
          <el-option label="张乾" value="4"></el-option>
          <el-option label="刘新军" value="5"></el-option>
          <el-option label="闫学斌" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <div class="hr">客户总览：</div>
    <template>
      <el-table
        :data="CustomerList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="rank"
          label="客户级别"
          width="170">
        </el-table-column>
        <el-table-column
          prop="scale"
          label="客户规模"
          width="170">
        </el-table-column>
        <el-table-column
          prop="industry"
          label="客户行业"
          width="170">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="250">
        </el-table-column>
        <el-table-column
          prop="user"
          label="创建人">
        </el-table-column>
      </el-table>
    </template>

    <div class="hr">联系人总览：</div>
    <template>
      <el-table
        :data="LiaisonList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="联系人姓名"
          width="120">
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
          width="120">
        </el-table-column>
        <el-table-column
          prop="injob"
          label="是否在职"
          width="120">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="250">
        </el-table-column>
        <el-table-column
          prop="user"
          label="创建人">
        </el-table-column>
      </el-table>
    </template>

    <div class="hr">拜访记录总览：</div>
    <template>
      <el-table
        :data="RecordList"
        style="width: 100%"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
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
          fixed="right"
          prop="created_at"
          label="创建时间"
          width="250">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="user"
          label="创建人"
          width="170">
        </el-table-column>
      </el-table>
    </template>

    <div class="hr">商机总览：</div>
    <template>
      <el-table
        :data="BusinessList"
        style="width: 100%; margin-bottom: 35px;"
        :cell-style="setCellColor">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商机名称"
          width="260">
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
          width="300">
        </el-table-column>
        <el-table-column
          prop="user"
          label="创建人">
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
  export default {
    name: 'DataWeek',
    data () {
      return {
        // 搜索数据
        SearchForm: {
          username: ''
        },
        // 是否可以清除
        clearable: true,
        // 客户列表
        CustomerList: [
          {
            id: 1,
            name: '山东津海环保装备有限公司',
            rank: '一般客户',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年12月25日 08:20',
            user: '耿冠超'
          },
          {
            id: 2,
            name: '山东津海环保装备有限公司',
            rank: '一般客户',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年12月25日 08:20',
            user: '耿冠超'
          },
          {
            id: 3,
            name: '山东津海环保装备有限公司',
            rank: '一般客户',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年12月25日 08:20',
            user: '耿冠超'
          },
          {
            id: 4,
            name: '山东津海环保装备有限公司',
            rank: '一般客户',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 5,
            name: '山东津海环保装备有限公司',
            rank: '一般客户',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 6,
            name: '山东津海环保装备有限公司',
            rank: '一般客户',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          },
          {
            id: 7,
            name: '山东津海环保装备有限公司',
            rank: '一般客户',
            scale: '0~10人',
            industry: '系统集成商',
            created_at: '2021年6月2日 08:20',
            user: '耿冠超'
          }
        ],
        // 联系人列表
        LiaisonList: [
          {
            name: '刘锐',
            customer: '山东宝铃自动化设备有限公司',
            phone: '13853309041',
            job: '经理',
            injob: '在职',
            created_at: '2021年6月2日 18:03',
            user: '耿冠超'
          }
        ],
        // 拜访记录列表
        RecordList: [
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          },
          {
            theme: '问客户工控机情况',
            customer: '山东宝铃自动化设备有限公司',
            status: '线上',
            main: '一直用工控机，从北京那边买的',
            next: '去淄博路过拜访一下客户，多了解',
            created_at: '2021年6月2日 18:06',
            user: '耿冠超'
          }
        ],
        // 商机列表
        BusinessList: [
          {
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
            name: '客户升级设备',
            customer: '山东芙诺鑫智能科技有限公司',
            winning_rate: '20%',
            money: '无信息',
            created_at: '2021年6月2日 17:52',
            user: '耿冠超'
          },
          {
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
        if (columnIndex === 1) {
          return 'color: #3DA2DF; font-weight: bold;'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .page-data-week {
    .hr {
      margin: 10px 0 10px 0;
      padding: 20px;
      color: #3DA2DF;
      font-weight: bold;
      background-color: #ffffff;
    }
  }
</style>
