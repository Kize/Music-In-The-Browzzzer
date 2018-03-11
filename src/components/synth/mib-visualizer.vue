<style lang="scss" type="text/css">

</style>

<template>
  <div class="vizualizer">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
  import * as R from 'ramda'

  export default {
    mounted() {
      this.canvasContext = this.$refs.canvas.getContext('2d')
      this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)'
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
        requestAnimationFrame(this.draw)
        const sliceWidth = this.width * 1.0 / this.analyzer.fftSize
        this.analyzer.getByteTimeDomainData(this.buffer)
        this.canvasContext.fillStyle = 'rgb(245, 245, 245)'
        this.canvasContext.fillRect(0, 0, this.width, this.height)
        this.canvasContext.lineWidth = 2
        this.canvasContext.strokeStyle = '#42b983'
        this.canvasContext.beginPath()
        let x = 0
        this.buffer.forEach((v, i) => {
          const y = (v / 128) * (this.height / 2)
          R.ifElse(
            R.equals(0),
            () => this.canvasContext.moveTo(x, y),
            () => this.canvasContext.lineTo(x, y)
          )(i)
          x += sliceWidth
        })
        this.canvasContext.stroke()
      },
    },
  }
</script>
