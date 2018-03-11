<style lang="scss" scoped>

</style>

<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
  import * as R from 'ramda'

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
    methods: {
      draw() {
        const sliceWidth = this.width * 1.0 / this.analyzer.fftSize
        this.analyzer.getByteTimeDomainData(this.buffer)
        this.canvasContext.fillStyle = 'rgb(245, 245, 245)'
        this.canvasContext.fillRect(0, 0, this.width, this.height)
        this.canvasContext.lineWidth = 2
        this.canvasContext.strokeStyle = '#42b983'
        this.canvasContext.beginPath()
        this.buffer.forEach((v, i) => {
          const y = (v / 128) * (this.height / 2)
          const x = i * sliceWidth
          R.ifElse(
            R.equals(0),
            () => this.canvasContext.moveTo(x, y),
            () => this.canvasContext.lineTo(x, y)
          )(i)
        })
        this.canvasContext.stroke()
        requestAnimationFrame(this.draw)
      },
    },
  }
</script>
