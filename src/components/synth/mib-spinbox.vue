<style lang="scss" scoped>
  @import '../../assets/styles/colors.scss';
  @import '../../assets/styles/buttons.scss';

  .spin-box {
    @import '../../assets/styles/ui.scss';

    display: block;

    .control {
      display: flex;

      input[type="text"] {
        color: $text-primary;
        text-align: center;
        border: none;
      }
    }
  }

</style>

<template>
  <div class="spin-box">
    <span class="label">{{ label }}:</span>
    <div class="control">
      <button @click.stop="onArrowClicked(-1)"><i class="material-icons">keyboard_arrow_left</i></button>
      <input type="text" readonly
             v-model.number="value"
             ref="input"
             name=""
             :style="{ width }"
             :min="min"
             :max="max"
             :step="step"
             :values="values"
             @input="onChange" />
      <button @click.stop="onArrowClicked(1)"><i class="material-icons">keyboard_arrow_right</i></button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
      },
      width: {
        type: String,
        default: '160px',
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
        type: [String, Number],
        default: 0,
      },
      step: {
        type: Number,
        default: 1,
      },
      values: {
        type: Array,
      },
    },
    data() {
      return {
        value: this.init,
      }
    },
    methods: {
      onArrowClicked(direction) {
        return this.values ? this.computeNextListValue(direction) : this.computeNextStepValue(direction)
      },
      computeNextStepValue(direction) {
        const inc = direction * this.step
        this.value = Number((inc + this.value).toFixed(this.precision))
        this.onChange()
      },
      computeNextListValue(direction) {
        let nextValueIndex = (this.values.indexOf(this.value) + direction) % this.values.length
        if (nextValueIndex < 0) {
          nextValueIndex += this.values.length
        }
        this.value = this.values[nextValueIndex]
        this.onChange()
      },
      onChange() {
        this.$emit('change', this.value)
      },
    },
  }
</script>
