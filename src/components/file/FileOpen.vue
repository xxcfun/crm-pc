<template>
  <div>
    <el-button @click="drawer = true" type="success" size="mini">点我打开方案文件</el-button>
    <el-drawer
      title="方案文件"
      :with-header="false"
      :visible.sync="drawer"
      direction="rtl"
      size="50%">
      <div>
        <el-button class="page-button" type="primary" icon="el-icon-arrow-left" size="mini" @click="prePage">上一页</el-button>
        <el-button class="page-button" type="primary" size="mini" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        <div style="margin: 10px; color: #409EFF">{{ pageNum }} / {{ pageTotalNum }}</div>
        <pdf
          ref="pdf"
          :src="file"
          :page="pageNum"
          @progress="loadedRatio = $event"
          @num-pages="pageTotalNum=$event"
        ></pdf>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  export default {
    props: ['file'],
    name: 'FileOpen',
    components: {
      pdf
    },
    data () {
      return {
        // 侧边抽屉
        drawer: false,
        // pdf用到的
        pageNum: 1,
        pageTotalNum: 1,
        loadedRatio: 0,
      }
    },
    methods: {
      // 关闭抽屉
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 上一页
      prePage() {
        let page = this.pageNum
        page = page > 1 ? page - 1 : this.pageTotalNum
        this.pageNum = page
      },
      // 下一页
      nextPage() {
        let page = this.pageNum
        page = page < this.pageTotalNum ? page + 1 : 1
        this.pageNum = page
      }
    }
  }
</script>

<style scoped>
  .page-button {
    margin: 10px;
  }
</style>
