<template>
    <div class="header">
      <h1>
      <div style="display: inline-block; float: left; font-size: 15px; color: blue">
        欢迎你，{{userInfo.username}}
      </div>
      考研交流论坛后台
        <div class="out" @click="exit">
          <i class="el-icon-switch-button"></i>
        </div>
      </h1>
    </div>
</template>

<script>
    import { mapState } from  'vuex'
    export default {
        name: "Header",
        methods: {
          exit() {
            this.$router.replace('/user')
          }
        },
        computed: {
          ...mapState({
            userInfo: state => state.userInfo
          })
        }
    }
</script>

<style lang="less" scoped>
  .header {
    .out {
      display: inline-block;
      width: 20px;
      float: right;
      /*margin: 25px 50px 50px 0;*/
      cursor: pointer;
      i {
        font-size: 20px;
        color: blue;
      }
    }
  }
</style>
