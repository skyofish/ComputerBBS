<template>
    <div class="header">
      header
      <div class="out">
        <i class="el-icon-switch-button"></i>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style lang="less" scoped>
  .header {
    .out {
      display: inline-block;
      width: 20px;
      float: right;
      margin: 25px 50px 0 0;
      cursor: pointer;
      i {
        font-size: 20px;
        color: blue;
      }
    }
  }
</style>
