<style lang="scss" scoped>
  .card {
    width: 400px;
    height: 300px;
    /*border-right: gray 4px solid;*/
    background-color: #fdfdfd;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    .canvas {
      width: 80%;
      height: 80%;
      margin: auto auto;
      /*border-radius: 15px;*/
      background-color: #2c3e50;
    }
  }
</style>

<template>
  <div class="card">
    <div class="canvas" :style="canvasStyle">
      <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
  </div>
</template>

<script>

  export default {
    mounted() {
      this.canvasContext = this.$refs.canvas.getContext('2d')
      this.buffer = new Uint8Array(this.analyzer.fftSize)
      this.draw()
    },
    props: {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      analyzer: {
        type: AnalyserNode,
      },
    },
    computed: {
      canvasStyle() {
        return {
          height: `${this.height}px`,
          width: `${this.width}px`,
        }
      },
    },
    methods: {
      draw() {
        const sliceWidth = this.width / this.analyzer.fftSize
        this.analyzer.getByteTimeDomainData(this.buffer)

        this.canvasContext.fillStyle = 'rgb(255, 255, 255, 0)'
        this.canvasContext.clearRect(0, 0, this.width, this.height)

        this.canvasContext.beginPath()
        this.canvasContext.strokeStyle = '#fff'
        this.canvasContext.lineWidth = 0.5
        this.canvasContext.moveTo(0, this.height / 2)
        this.canvasContext.lineTo(this.width, this.height / 2)
        this.canvasContext.moveTo(this.width / 2, 0)
        this.canvasContext.lineTo(this.width / 2, this.height)
        this.canvasContext.stroke()

        this.canvasContext.beginPath()
        this.buffer
        .filter(v => v !== 128)
        .forEach((v, i) => {
          const y = (v / 128) * (this.height / 2)
          const x = i * sliceWidth
          if (i === 0) {
            this.canvasContext.moveTo(x, y)
            return
          }
          this.canvasContext.lineTo(x, y + (v > 128 ? 20 : -20))
        })
        this.canvasContext.lineWidth = 1
        this.canvasContext.strokeStyle = '#ff5574'
        this.canvasContext.stroke()
        requestAnimationFrame(this.draw)
      },
    },
  }
</script>
