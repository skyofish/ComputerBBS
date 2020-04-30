<template>
  <div id="app">
    <el-container style="width: 100%; height: 100%;">
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Header from './layout/Header'
  import Aside from './layout/Aside'
  export default {
    name: 'admin',
    components: {
      Header,
      Aside,
    },
    created() {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })
    }
  }
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body {
    margin: 0;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-header {
    height: 15% !important;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;

  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  Aside {
    width: 100%;
    height: 100%;
  }

  Header {
    width: 100%;
    height: 20%;
  }

</style>
