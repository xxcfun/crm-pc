<template>
  <!-- okr列表 -->
  <div class="page-okr">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'okr' }">OKR管理</el-breadcrumb-item>
      <el-breadcrumb-item>OKR列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 表格 -->
    <el-table
      :data="OkrList"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="object"
        label="目标">
      </el-table-column>
      <el-table-column
        prop="key"
        label="关键成果">
      </el-table-column>
      <el-table-column
        prop="key_true"
        label="完成情况">
      </el-table-column>
      <el-table-column
        prop="results"
        label="衡量指标">
      </el-table-column>
      <el-table-column
        prop="finish"
        label="实际达成">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Okr',
    data () {
      return {
        OkrList: [
          {
            id: '1',
            object: '今年干个100万',
            key: '寻找客户',
            key_true: '完成',
            results: '下面两个月在干80万',
            finish: '截至现在总业绩20万'
          },
          {
            id: '1',
            object: '今年干个100万',
            key: '拜访客户',
            key_true: '进行中',
            results: '下面两个月在干80万',
            finish: '截至现在总业绩20万'
          },
          {
            id: '1',
            object: '今年干个100万',
            key: '成就客户',
            key_true: '未完成',
            results: '下面两个月在干80万',
            finish: '截至现在总业绩20万'
          }
        ]
      }
    },
    methods: {
      objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5) {
          if (rowIndex % 3 === 0) {
            return {
              rowspan: 3,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
