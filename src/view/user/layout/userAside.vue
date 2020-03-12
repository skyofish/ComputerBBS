<template>
    <div class="userAside">
      <div class="userInfo">
        <h4 v-text="level"></h4>
        <h2 v-text="username?username : '游客'"></h2>
        <div class="avatar">
          <router-link to="/personalInfo">
            <img src="@images/touxiang.jpg" alt="">
          </router-link>
        </div>
        <div v-if="!username" class="operate">
          <p @click="pointShow = true">积分: {{this.point}}</p>
          <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="pointShow">
            <p>Some point...</p>
            <p>Some point...</p>
            <p>Some point...</p>
          </Drawer>
          <p @click="expShow = true">经验：{{this.exp}}</p>
          <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="expShow">
            <p>Some exp...</p>
            <p>Some exp...</p>
            <p>Some exp...</p>
          </Drawer>
          <p>消息</p>
          <p>退出</p>
        </div>
        <div v-else class="operate">
          <router-link to="/userLogin"><p>登录</p></router-link>
          <router-link to="/userRegister"><p>注册</p></router-link>
        </div>
      </div>
      <div class="interaction">
        <Button icon="ios-paper-plane">
          <router-link to="./post">发帖</router-link>
        </Button>
        <br/>
        <Button icon="ios-people">
          <router-link to="./chatRoom">聊天</router-link>
        </Button>
        <br/>
        <Button icon="md-notifications" @click="announce = true">公告</Button>
        <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="announce">
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    </div>
</template>

<script>
    export default {
        name: "userAside",
        data() {
          return {
            username: '',
            image: '',
            point: '',
            exp: '',
            level: '',
            announce: false,
            pointShow: false,
            expShow: false
          }
        },
        created() {
          this.getUserInfo();
        },
        methods: {
          getUserInfo() {
            this.username = 'skyofish';
            this.point = 300;
            this.exp = 400;
            this.level = `Lv${this.exp/100}`;
          }
        }
    }
</script>

<style lang="less" scoped>
  .userAside {
    width: 100%;
    height: 100%;
    padding: 30px 20px 40px 60px;
  }
  .userInfo {
    width: 100%;
    background: #d74545;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border-bottom: 6px solid #d74545;
    .avatar {
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      img {
        width: 150px;
        height: 150px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        border: 5px solid white;
        background: white;
      }
      img:hover {
        animation: bigger 0.5s;
        animation-fill-mode: forwards;
      }
      @keyframes bigger
      {
        0%{
          transform: scale(1);  /*开始为原始大小*/
        }
        100%{
          transform: scale(1.1);
        }

      }
    }
    .operate {
      width: 100%;
      background: white;
      margin-top: 50px;
      padding: 50px 0;

      p {
        padding: 10px 20px;
        cursor: pointer;
      }
      p:hover {
        background: #d74545;
        color: white;
      }
    }
  }
  .interaction {
    width: 100%;
    background: white;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border-bottom: 6px solid #d74545;
    margin-top: 100px;
    padding-bottom: 30px;
    Button {
      margin-top: 30px;
      height: 50px;
    }
  }
</style>
