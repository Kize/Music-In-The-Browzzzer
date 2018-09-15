<template>
    <div class="selector">
      <div class="toggle" v-for="value in values" :key="value">
        <button :class="{ active: isActive(value), inactive: !isActive(value) }" @click="select(value)"></button>
        <span class="label">{{value}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      values: {
        type: Array,
      },
    },
    data: () => ({
      activeValue: '',
    }),
    methods: {
      select(value) {
        this.activeValue = value
      },
      isActive(value) {
        return this.activeValue === value
      },
    },
  }
</script>

<style scoped lang="scss">
  .selector {
    .toggle {
      button {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 2px solid #D3DEE7;
        outline: none;
        display: block;
        margin: 10px auto;
        &.inactive {
          background-color: #995574;
        }
        &.active {
          background-color: #ff5574;
          box-shadow: 0 0 5px 0 #ff5574;
        }
      }
      .label {
        font-size: 9px;
        text-align: center;
        display: block;
        margin: 0 auto;
        color: gray;
        font-family: "Lucida Console", Monaco, monospace;
      }
    }
  }

</style>
