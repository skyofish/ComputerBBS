<template>
    <div id="Aside">
      <div id="logo">
      </div>
      <el-row>
      <el-col>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <router-link to="./dataStatistics">
              <i class="el-icon-s-data"></i>
              数据统计
            </router-link>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>帖子管理</span>
            </template>
            <el-menu-item-group>
             <router-link to="./postManage">
               <el-menu-item index="1-1">帖子管理</el-menu-item>
             </router-link>
             <router-link to="./postReview">
               <el-menu-item index="1-2">发帖审核</el-menu-item>
             </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-if="userInfo.type == 'admin'">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="./userManage">
                <el-menu-item index="1-1">用户管理</el-menu-item>
              </router-link>
              <router-link to="./moderatorsReview">
                <el-menu-item index="1-2">版主审核</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4" v-if="userInfo.type == 'admin'">
            <router-link to="./makeAnnouncement">
              <i class="el-icon-bell"></i>
              发布公告
            </router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <router-link to="./updateLog">
              <i class="el-icon-date"></i>
              更新日志
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
      </el-row>
    </div>
</template>

<script>
    import { mapState } from  'vuex'
    export default {
      name: "Aside",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
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
  #Aside {
    width: 100%;
    height: 85%;
  }
  #logo {
    width: 100%;
    height: 18%;
    line-height: 110px;
    background: url("../../../../static/logo.jpg");
    background-size: 100% 100%;
  }
</style>
