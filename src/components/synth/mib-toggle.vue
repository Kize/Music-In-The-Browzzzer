<style lang="scss" scoped>
  @import '../../assets/styles/colors.scss';
  @import '../../assets/styles/ui.scss';

  .toggle {
    @import '../../assets/styles/ui.scss';

    .control {
      background-color: $ui-bg;
      text-decoration: none;
      font-family: 'regular', sans-serif;
      font-size: 1em;
      border: none;
      border-radius: 0;
      cursor: pointer;
      position: relative;
      padding: 0;
      outline: none;
      width: 100px;
      height: 43px;

      .thumb {
        height: 100%;
        width: 50%;
        float: left;
        background-color: $ui-primary;
        &.active {
          float: right;
        }

      }
    }
  }
</style>

<template>
  <div class="toggle">
    <span class="label">{{ label }}:</span>
    <button class="control" @click="toggle">
      <div :class="{ thumb: true, active }"></div>
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      init: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
      },
    },
    data: () => ({
      active: this.init,
    }),
    created() {
      this.active = this.init
    },
    methods: {
      toggle() {
        this.active = !this.active
        this.$emit('change', this.active)
      },
    },
  }
</script>
