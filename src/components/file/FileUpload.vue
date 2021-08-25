<template>
  <el-upload
    class="upload"
    :action="postUrl()"
    :on-success="getFilePath"
    :on-remove="removeFile"
    :on-exceed="exceedFile"
    :limit="limit"
    :file-list="fileList">
    <el-button size="small" type="success">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只支持上传.pdf格式的文件；只允许上传1个文件，如上传错误请先移除再进行上传操作。</div>
  </el-upload>
</template>

<script>
  import { serverUrl } from '../../utils/server'

  export default {
    name: 'FileUpload',
    data () {
      return {
        fileList: [],
        limit: 1,
        filePath: ''
      }
    },
    methods: {
      // 文件上传相关
      // 上传文件的地址
      postUrl () {
        return serverUrl + 'backend/files/'
      },
      // 上传成功的狗子  获取文件上传的路径
      getFilePath (response) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.filePath = response.file
        this.$emit('filePath', this.filePath)
      },
      // 移除文件的钩子
      removeFile (file) {
        this.$message({
          message: `成功移除${file.name}`,
          type: 'success'
        })
        console.log(file)
      },
      // 文件超出数量钩子
      exceedFile (file) {
        this.$message({
          message: '上传失败，只能上传一个文件',
          type: 'warning'
        })
        console.log(file)
      }
    }
  }
</script>

<style scoped>

</style>
