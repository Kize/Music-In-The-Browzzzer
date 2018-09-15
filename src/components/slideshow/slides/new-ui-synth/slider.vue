<style lang="scss" type="text/scss" scoped>
  @import '../../../../assets/styles/synth-card';

  .slider {

    .curse {
      fill: none;
      stroke: #4B6F8B;
      stroke-width: 6px;
      stroke-linecap: round;
      stroke-miterlimit: 10;
    }

    .handle {
      fill: #A3B8C8;
      stroke-linecap: round;
    }

    .label {
      font-size: $input-label-size;
      text-align: center;
      display: block;
      margin: 0 auto;
      color: gray;
      font-family: "Lucida Console", Monaco, monospace;
    }
  }

</style>

<template>
  <div class="slider">
    <svg :viewBox="viewBox" @mousedown="toggleActive" @mousewheel="wheel" :style="sliderStyle" ref="viewBox">
      <g>
        <line class="curse" x1="25" y1="0" x2="25" y2="200"></line>
        <rect class="handle" ref="handle" id="svg_1" height="25" width="50" x="0" y="0"></rect>
      </g>
    </svg>
    <span class="label">{{label}}</span>
  </div>
</template>

<script>
  import * as R from 'ramda'

  export default {
    props: {
      value: {
        type: Number,
      },
      label: {
        type: String,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },
    created() {
      this.position = 0
    },
    computed: {
      viewBox() {
        return [
          this.viewBoxDimensions.x,
          this.viewBoxDimensions.y,
          this.viewBoxDimensions.width,
          this.viewBoxDimensions.height,
        ].join(' ')
      },
      slide() {
        return `translate(0, ${this.position})`
      },
      sliderStyle() {
        return {
          height: `${this.height}px`,
          width: `${this.width}px`,
        }
      },
    },
    data: () => ({
      position: 0,
      active: false,
      viewBoxDimensions: {
        x: 0,
        y: 0,
        width: 50,
        height: 160,
      },
    }),
    methods: {
      toggleActive(event) {
        if (event.which !== 1) {
          return
        }
        const ctm = this.$refs.viewBox.getScreenCTM()
        this.origin = {
          y: (event.clientY - ctm.f) / ctm.d,
        }
        this.active = true
        document.addEventListener('mousemove', this.drag)
        document.addEventListener('mouseup', this.toggleInactive)
      },
      toggleInactive() {
        this.active = false
        document.removeEventListener('mouseup', this.toggleInactive)
        document.removeEventListener('mousemove', this.drag)
      },
      drag(event) {
        event.preventDefault()
        const coord = this.getMousePosition(event)
        this.$refs.handle.setAttributeNS(null, 'y', R.clamp(0.1, 175, coord.y))
      },
      wheel(event) {
        event.preventDefault()
        this.updatePosition(event.wheelDeltaY * 0.01)
      },
      getMousePosition(event) {
        const ctm = this.$refs.viewBox.getScreenCTM()
        return {
          x: (event.clientX - ctm.e) / ctm.a,
          y: (event.clientY - ctm.f) / ctm.d,
        }
      },
      updatePosition(increment) {
        this.position = R.clamp(0.1, 175, this.position - increment)
      },
      movePosition() {

      },
    },
  }
</script>
