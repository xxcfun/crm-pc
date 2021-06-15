<template>
  <div class="page-login">
    <!--这个地方放vue特效代码-->
    <div class="sky" ref="sky">
      <canvas ref="canvas"></canvas>
      <div class="bg-img"></div>
      <div class="filter"></div>
    </div>
    <!--特效代码结束-->

  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
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
    }
  }
</script>

<style scoped lang="less">
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
  }
</style>
