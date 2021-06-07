<template>
  <!-- 数据一览 -->
  <div class="page-data">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">数据汇总</el-breadcrumb-item>
      <el-breadcrumb-item>数据一览</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 表格 -->
    <template>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="yesxx"
          label="昨日线下拜访">
        </el-table-column>
        <el-table-column
          prop="yesxs"
          label="昨日线上拜访">
        </el-table-column>
        <el-table-column
          prop="newcus"
          label="新增客户">
        </el-table-column>
        <el-table-column
          prop="newbus"
          label="新增商机">
        </el-table-column>
        <el-table-column
          prop="weekxx"
          label="本周线下拜访">
        </el-table-column>
        <el-table-column
          prop="weekxs"
          label="本周线上拜访">
        </el-table-column>
        <el-table-column
          prop="weekbus"
          label="本周商机数量">
        </el-table-column>
        <el-table-column
          prop="moncus"
          label="本月客户数量">
        </el-table-column>
        <el-table-column
          prop="folbus"
          label="跟进商机">
        </el-table-column>
        <el-table-column
          prop="finbus"
          label="完成商机">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'Data',
    data () {
      return {
        tableData: [
          {
            name: '尹明辉',
            yesxx: '0',
            yesxs: '0',
            newcus: '0',
            newbus: '0',
            weekxx: '0',
            weekxs: '0',
            weekbus: '0',
            moncus: '0',
            folbus: '0',
            finbus: '0'
          },
          {
            name: '任文强',
            yesxx: '0',
            yesxs: '0',
            newcus: '0',
            newbus: '0',
            weekxx: '0',
            weekxs: '0',
            weekbus: '0',
            moncus: '0',
            folbus: '0',
            finbus: '0'
          },
          {
            name: '刘新军',
            yesxx: '0',
            yesxs: '0',
            newcus: '0',
            newbus: '0',
            weekxx: '0',
            weekxs: '0',
            weekbus: '0',
            moncus: '0',
            folbus: '0',
            finbus: '0'
          },
          {
            name: '闫学斌',
            yesxx: '0',
            yesxs: '0',
            newcus: '0',
            newbus: '0',
            weekxx: '0',
            weekxs: '0',
            weekbus: '0',
            moncus: '0',
            folbus: '0',
            finbus: '0'
          },
          {
            name: '耿冠超',
            yesxx: '0',
            yesxs: '0',
            newcus: '0',
            newbus: '0',
            weekxx: '0',
            weekxs: '0',
            weekbus: '0',
            moncus: '0',
            folbus: '0',
            finbus: '0'
          },
          {
            name: '张安琪',
            yesxx: '0',
            yesxs: '0',
            newcus: '0',
            newbus: '0',
            weekxx: '0',
            weekxs: '0',
            weekbus: '0',
            moncus: '0',
            folbus: '0',
            finbus: '0'
          },
          {
            name: '黄振世',
            yesxx: '0',
            yesxs: '0',
            newcus: '0',
            newbus: '0',
            weekxx: '0',
            weekxs: '0',
            weekbus: '0',
            moncus: '0',
            folbus: '0',
            finbus: '0'
          },
          {
            name: '张乾',
            yesxx: '0',
            yesxs: '0',
            newcus: '0',
            newbus: '0',
            weekxx: '0',
            weekxs: '0',
            weekbus: '0',
            moncus: '0',
            folbus: '0',
            finbus: '0'
          }
        ]
      }
    }
  }
</script>

<style lang="less">
  .page-data {
  }
</style>
