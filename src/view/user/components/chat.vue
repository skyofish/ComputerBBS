<template>
  <div class="chat">
    <div class="header">
      <Button @click="back" style="float: left; line-height: 100px;background: royalblue;border: 0; color: white" size="large">
        <Icon type="ios-arrow-back"/>
        Backward
      </Button>
    当前在线人数: {{users}}
    </div>
    <div class="messageInfo">
      <div v-for="i in messageHistory">
        <div class="myMessage" v-if="i.username == userInfo.username"><div class="content">{{i.msg}}</div><div class="img"><img :src="i.src"></div></div>
        <div class="otherMessage" v-else><div class="img"><img :src="i.src"></div><div class="content">{{i.msg}}</div></div>
      </div>
    </div>
    <div class="input">
      <Input v-model="message" @on-enter="send" search enter-button="发送" placeholder="Enter something..." />
    </div>
  </div>
</template>

<script>
  import { mapState } from  'vuex'
  import io from 'socket.io-client'
  export default {
    name: "chat",
    data() {
      return {
        messageHistory: [],
        socket: '',
        message: '',
        users: 0
      }
    },
    created() {
      this.getMessageHistory()
      // socket内部，this指针指向问题
      const that = this
      // 连接websocket地址
      this.socket = io.connect('localhost:8081')
      this.socket.emit('join', {username: that.userInfo.username, roomId: that.$route.query.roomId})
      this.socket.on('message', function(obj) {
        that.messageHistory.push(obj)
        window.scrollTo(0, document.body.scrollHeight)
      })
      this.socket.on('joined', function (data, users) {
        that.users = users.length
      })
      this.socket.on('logout', function (obj) {
        that.users = obj.length
      })
    },
    methods: {
      getMessageHistory() {
        this.messageHistory = [
          {
            username: 'skyofish',
            src: '/static/头像.jpg',
            msg: 'hello'
          },
          {
            username: 'candice',
            src: '/static/1.jpg',
            msg: 'hi'
          },
          {
            username: 'skyofish',
            src: '/static/头像.jpg',
            msg: 'hello'
          },
          {
            username: 'candice',
            src: '/static/1.jpg',
            msg: 'hi'
          },
        ]
      },
      send() {
        if (this.message) {
          let obj = {
            username: this.userInfo.username,
            src: this.userInfo.avatar,
            msg: this.message,
          }
          this.socket.emit('message', obj)
          this.message = ''
        }
      },
      back() {
        this.$router.go(-1)
        this.socket.emit('logout', this.userInfo.username)
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
      })
    }
  }
</script>

<style lang="less" scoped>
  .chat {
    margin-top: 12px;
    .header {
      width: 100%;
      height: 100px;
      background: royalblue;
      color: white;
      line-height: 100px;
    }
    .messageInfo {
      .myMessage {
        margin: 10px 0;
        float: right;
        min-width: 200px;
        max-width: 600px;
        min-height: 50px;
        background: #2D8cF0;
        color: white;
        clear: both;
        .img {
          float: right;
          background: #EFEFEF;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .content {
          display: inline-block;
          line-height: 50px;
          padding: 0 20px;
        }
      }
      .otherMessage {
        margin: 10px 0;
        float: left;
        min-width: 200px;
        max-width: 600px;
        min-height: 50px;
        line-height: 50px;
        color: black;
        clear: both;
        .img {
          float: left;
          background: #EFEFEF;
          clear: both;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            line-height: 50px;
          }
        }
        .content {
          padding: 0 20px;
          background: darkgray;
        }
      }
    }
    .input {
      clear: both;
      padding-top: 100px;
    }
  }
</style>
