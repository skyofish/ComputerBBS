<template>
    <div>
      <div class="banner">banner</div>
      <div>
        <el-container>
          <el-header>
            <div class="search">
              <Input search enter-button placeholder="请输入搜索关键词"/>
            </div>
            <div>
              <Menu mode="horizontal" active-name="1">
                <router-link to="./home">
                  <MenuItem name="1">
                    <Icon type="ios-paper" />
                    广场
                  </MenuItem>
                </router-link>
                <router-link to='./learningResource'>
                  <MenuItem name="2">
                    <Icon type="ios-people" />
                    学习资源
                  </MenuItem>
                </router-link>
                <router-link to="./teachingVideo">
                  <MenuItem name="3">
                    <Icon type="ios-people" />
                    教学视频
                  </MenuItem>
                </router-link>
                <router-link to="./dataStatistics">
                  <MenuItem name="4">
                    <Icon type="ios-people" />
                    数据统计
                  </MenuItem>
                </router-link>
              </Menu>
            </div>
          </el-header>
          <el-container>
            <el-aside width="22%">
              <userAside></userAside>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
</template>

<script>
    import userAside from './layout/userAside'
    export default {
        name: "user",
        data() {
          return {

          }
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
        },
        components: {
          userAside
        }
    }
</script>

<style lang="less" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 100px !important;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .el-aside {
    background-color: #EFEFEF;
    color: #333;
    text-align: center;
    padding-bottom: 50px;
  }

  .el-main {
    background-color: #EFEFEF;
    color: #333;
    text-align: center;
  }

  .el-container {
    .search {
      width: 30%;
    }
  }

  .banner {
    width: 100%;
    height: 25%;
    line-height: 150px;
  }
</style>
