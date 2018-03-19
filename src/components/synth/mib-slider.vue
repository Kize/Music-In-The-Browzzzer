<style lang="scss" scoped>
  @import '../../assets/styles/colors.scss';
  @import '../../assets/styles/buttons.scss';

  .slider {
    @import '../../assets/styles/ui.scss';

    display: block;

    .control {
      display: flex;

      input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        margin: 0;
      }
      input[type=range]:focus {
        outline: none;
      }
      input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: $ui-bg;
        border-radius: 0;
      }
      input[type=range]::-webkit-slider-thumb {
        height: 100%;
        width: 10px;
        border-radius: 0;
        background: $ui-primary;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: 0;
      }
      input[type=range]::-moz-range-track {
        width: 100%;
        cursor: pointer;
        background: $ui-bg;
        border-radius: 0;
        outline: none;
      }
      input[type=range]::-moz-range-thumb {
        height: 100%;
        height: 100%;
        width: 10px;
        border: none;
        border-radius: 0;
        background: $ui-primary;
        cursor: pointer;
      }
      input[type=range]::-moz-focus-outer {
        border: 0;
      }
      input[type="text"] {
        color: $text-primary;
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
    <div class="control"
         :style="{ width }">
      <input type="range"
             v-model.number="value"
             @input="onChange"
             :min="min"
             :max="max"
             :step="step"/>
      <input type="text" readonly
             :style = "{ width : valueWidth }"
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
      width: {
        type: String,
        default: '160px',
      },
      valueWidth: {
        type: String,
        default: '70px',
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
