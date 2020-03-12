<template>
    <div class="makeAnnouncement">
      <div id="input">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          :autosize="{ minRows: 15, maxRows: 20}"
          v-model="input"
          clearable>
        </el-input>
      </div>
    </div>
</template>

<script>
    export default {
        name: "makeAnnouncement",
        data() {
          return {
            input: ''
          }
        }
    }
</script>

<style lang="less" scoped>
  .makeAnnouncement {
    #input {
      margin: 50px;
      padding: 0 50px;
    }
  }
</style>
