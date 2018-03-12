<style lang="scss" scoped>
  @import '../../assets/styles/colors.scss';
  @import '../../assets/styles/buttons.scss';

  .slider {
    @import '../../assets/styles/ui.scss';

    display: block;

    .control {
      display: flex;
      max-width: 160px;

      input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        margin: 0px 0;
      }
      input[type=range]:focus {
        outline: none;
      }
      input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: $ui-bg;
        border-radius: 0px;
      }
      input[type=range]::-webkit-slider-thumb {
        height: 100%;
        width: 20%;
        border-radius: 0px;
        background: $ui-primary;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: 0px;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        background: $ui-bg-active;
      }
      input[type=range]::-moz-range-track {
        width: 100%;
        cursor: pointer;
        background: $ui-bg;
        border-radius: 0px;
        outline: none;
      }
      input[type=range]::-moz-range-thumb {
        height: 32px;
        width: 17px;
        border: none;
        border-radius: 0px;
        background: $ui-primary;
        cursor: pointer;
      }
      input[type=range]::-moz-focus-outer {
        border: 0;
      }
      input[type="text"] {
        color: $text-primary;
        width: 70px;
        text-align: center;
        border: none;
        border-left: 1px solid $ui-bg;
      }
    }
  }

</style>

<template>
  <div class="slider">
    <span class="label">{{ label }}:</span>
    <div class="control">
      <input type="range"
             v-model.number="value"
             @input="onChange"/>
      <input type="text" readonly
             v-model.number="value"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
      },
      min: {
        type: Number,
        default: -Infinity,
      },
      max: {
        type: Number,
        default: Infinity,
      },
      precision: {
        type: Number,
        default: 2,
      },
      init: {
        type: Number,
        default: 0,
      },
      step: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        value: this.init,
      }
    },
    methods: {
      onChange() {
        this.$emit('change', this.value)
      },
    },
  }
</script>
