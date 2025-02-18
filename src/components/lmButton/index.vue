<template>
  <div class="lm-button-wrapper">我是慕了颜{{ suffix }}</div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    suffix: {
      type: String,
      default: '',
    },
  });
</script>
<style lang="less" scoped>
  .lm-button-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 5px;
  }
</style>
