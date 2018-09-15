<style lang="scss" type="text/scss" scoped>

  .container {
    user-select: none;
    outline: none;
    margin: auto;
    position: relative;

    .knob {
      display: block;
      margin: auto;
      position: relative;
      top: -1vh;

      .background {
        fill: #4B6F8B;
      }
      .handle {
        fill: #D3DEE7;
      }
      .curse {
        fill: #A3B8C8;
      }
      .cursor {
        stroke: #FFF;
        stroke-width: 4px;
      }
    }

    .label {
      display: block;
      position: relative;
      bottom: 24px;
      font-family: "Lucida Console", Monaco, monospace;
      font-size: 26px;
      text-align: center;
      margin: 0 auto;
      color: gray;
    }
  }

</style>

<template>
  <div class="container" :style="knobStyle">
    <svg :viewBox="viewBox" class="knob">
      <g>
        <g @mousedown="toggleActive" @mousewheel="wheel">
          <g :transform="rotate">
            <circle class="background" cx="70.4" cy="75" r="36.7"></circle>

            <path class="handle"
                  d="M100.6,76.7c-1.8-1.9-3.1-4.3-3.6-7s-0.4-5.4,0.4-7.9c-1.7-3.5-4.1-6.6-7.1-9.2c-2.6,0.2-5.3-0.3-7.7
                  -1.5c-2.5-1.3-4.5-3.1-5.9-5.2c-3.9-0.8-7.9-0.9-11.6-0.2c-1.4,2.2-3.5,3.9-6,5.1c-2.5,1.2-5.2,1.6-7.8,
                  1.3c-3,2.4-5.5,5.5-7.4,9c0.7,2.5,0.9,5.2,0.3,7.9s-2,5-3.9,6.9c0.1,3.9,0.9,7.8,2.4,11.3c2.4,1,4.6,2.5,
                  6.3,4.8c1.7,2.2,2.7,4.8,3.1,7.3c3.1,2.3,6.6,4.1,10.4,5.2c2.2-1.3,4.8-2,7.6-2c2.8,0,5.4,0.8,7.6,2.2c
                  3.8-0.9,7.4-2.6,10.5-4.9c0.4-2.6,1.4-5,3.2-7.2s4-3.7,6.5-4.6c0.8-1.7,1.4-3.6,1.9-5.5C100.3,80.6,100.5
                  ,78.6,100.6,76.7z">
            </path>
            <line class="cursor" x1="71" y1="46" x2="71" y2="55"></line>

          </g>
          <ellipse class="curse" cx="70.3" cy="75" rx="20.6" ry="20.6"
                   transform="matrix(0.2359 -0.9718 0.9718 0.2359 -19.1643 125.6766)">
          </ellipse>

        </g>
      </g>
    </svg>

    <span class="label">{{label}}</span>
  </div>
</template>

<script>
  import { scale, unscale } from 'wasa'

  export default {
    props: {
      value: {
        type: Number,
      },
      label: {
        type: String,
      },
      dispatcher: {
        type: Object,
      },
      width: {
        type: Number,
      },
    },
    created: function () {
      this.angle = unscale({ max: 160, min: -160 }, this.value)
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
      knobStyle() {
        return {
          height: `${this.width}px`,
          width: `${this.width}px`,
        }
      },
      rotate() {
        return `rotate(${this.angle}, 70.4, 75)`
      },
    },
    data: () => ({
      angle: 0,
      active: false,
      viewBoxDimensions: {
        x: 0,
        y: 0,
        width: 141.7,
        height: 141.7,
      },
    }),
    methods: {
      toggleActive(event) {
        if (event.which !== 1) {
          return
        }
        this.origin = {
          x: event.pageX,
          y: event.pageY,
        }
        document.addEventListener('mousemove', this.drag)
        document.addEventListener('mouseup', this.toggleInactive)
        this.active = true
      },
      toggleInactive() {
        this.active = false
        document.removeEventListener('mouseup', this.toggleInactive)
        document.removeEventListener('mousemove', this.drag)
      },
      drag(event) {
        event.preventDefault()
        const increment = this.origin.y - event.pageY
        const viewBoxRatio = this.width / this.viewBoxDimensions.width
        this.updateAngle(increment * viewBoxRatio)
      },
      wheel(event) {
        event.preventDefault()
        this.updateAngle(event.wheelDeltaY * 0.1)
      },
      updateAngle(increment, ease = 1) {
        const angle = this.angle + (increment * ease)
        // eslint-disable-next-line no-mixed-operators
        if (increment < 0 && angle > -160 || increment >= 0 && angle < 160) {
          this.angle = angle
          const value = scale({ min: -160, max: 160 }, this.angle)
          this.$emit('update', value)
        }
      },
    },
  }
</script>
