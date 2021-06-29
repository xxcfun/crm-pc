<template>
  <div class="page-login">
    <!--这个地方放vue特效代码-->
    <div class="sky" ref="sky">
      <canvas ref="canvas"></canvas>
      <div class="bg-img"></div>
      <div class="filter"></div>
    </div>
    <!--特效代码结束-->

    <div class="login">
      <div class="logo">
        <img src="/static/logo.png" alt="">
      </div>
      <h3 class="text-center">济南控创电子科技有限公司<br>CRM客户管理信息系统</h3>

      <el-form class="form" :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import cookie from '../../utils/cookie'
  import { AccountApis } from '../../utils/api'
  import axios from 'axios'

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入正确的密码', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      const _this = this
      _this.$refs.sky.width = window.innerWidth
      _this.$refs.sky.height = window.innerHeight

      function Star (id, x, y) {
        this.id = id
        this.x = x
        this.y = y
        this.r = Math.floor(Math.random() * 2) + 1
        var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2
        this.color = 'rgba(255, 255, 255,' + alpha + ')'
      }

      Star.prototype.draw = function () {
        ctx.fillStyle = this.color // 填充色
        ctx.shadowBlur = this.r * 2 // 阴影
        ctx.beginPath() // 起始路径
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false) // 弧
        ctx.closePath() // 闭合路径
        ctx.fill() // 图型填充
      }
      Star.prototype.move = function () {
        this.y -= 0.5
        if (this.y <= -10) this.y = _Height + 10
        this.draw()
      }
      Star.prototype.die = function () {
        stars[this.id] = null
        delete stars[this.id]
      }

      const canvas = _this.$refs.canvas
        const ctx = canvas.getContext('2d')
        const _Width = _this.$refs.sky.width
        const _Height = _this.$refs.sky.height
        const stars = []
        const initStarsPopulation = 200
      setCanvasSize()
      __init__()

      function setCanvasSize () {
        canvas.setAttribute('width', _Width)
        canvas.setAttribute('height', _Height)
      }

      function __init__ () {
        ctx.strokeStyle = 'white'
        ctx.shadowColor = 'white'
        for (var i = 0; i < initStarsPopulation; i++) {
          stars[i] = new Star(i, Math.floor(Math.random() * _Width), Math.floor(Math.random() * _Height))
        }
        ctx.shadowBlur = 0
        animate()
      }

      function animate () {
        ctx.clearRect(0, 0, _Width, _Height)
        for (var i in stars) {
          stars[i].move()
        }
        requestAnimationFrame(animate)
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 调用接口
            axios.post(AccountApis.loginUrl, {
              username: this.loginForm.username,
              password: this.loginForm.password
            }).then(({ data }) => {
              console.log(data)
              console.log(this.loginForm.username)
              // 拿取用户信息，存储到vuex
              cookie.setCookie('name', this.loginForm.username, 7)
              cookie.setCookie('token', data.token, 7)
              // 更新store数据
              this.$store.dispatch('setInfo')
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.$router.push({ name: 'Home' })
            }).catch(({ response: { data } }) => {
              // 如果有问题，需要给用户提示异常信息
              console.log(data)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    created () {
      // 清除缓存
      cookie.delCookie('token')
      cookie.delCookie('name')
      // 重新触发store
      // 更新store数据
      this.$store.dispatch('setInfo')
    }
  }
</script>

<style lang="less">
  .page-login {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;

    .sky {
      background: radial-gradient(65% 105% at bottom center, #7adef7 10%, #7d8ee9 40%, #343b7d 65%, #1b2947);
      /*background: radial-gradient(200% 100% at bottom center, #7adef7, #7d8ee9, #343b7d, #1b2947);*/
    }

    .bg-img {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      /*background-image: url(../assets/images/xkbg.png);*/
      background-repeat: repeat-x;
      background-position: center bottom;
    }

    .filter {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      background: #5e65ee;
      mix-blend-mode: overlay;
      animation: colorChange 30s ease-in-out infinite;
      animation-fill-mode: both;
    }

    @keyframes colorChange {
      0%,
      100% {
        opacity: 0;
      }
      50% {
        opacity: 0.9;
      }
    }

    .login {
      position: absolute;
      width: 600px;
      height: 500px;
      z-index: 999;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      top: 50%;

      .logo {
        text-align: center;
      }

      .text-center {
        color: #fff;
        font-weight: bold;
        text-align: center;
        font-size: 1.75rem;
        margin-bottom: 20px;
      }

      .form {
        .el-form-item__label {
          color: #fff !important;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .el-input__inner {
          width: 90%;
        }

        .el-form-item__error {
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }
</style>
