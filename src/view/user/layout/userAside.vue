<template>
    <div class="userAside">
      <div class="userInfo">
        <h4 v-text="level"></h4>
        <h2 v-text="username?username : '游客'"></h2>
        <div class="avatar">
          <router-link to="/personalInfo">
            <img :src="avatar" alt="">
          </router-link>
        </div>
        <div v-if="username" class="operate">
          <p @click="pointShow = true">积分: {{this.point}}</p>
          <Drawer title="关于积分" placement="left" :closable="false" v-model="pointShow">
            <p>积分可以用来下载文件，上传发帖均可获得积分</p>
          </Drawer>
          <p @click="expShow = true">经验：{{this.exp}}</p>
          <Drawer title="关于经验" placement="left" :closable="false" v-model="expShow">
            <p>经验用来提升等级，上传发帖均可获得经验</p>
          </Drawer>
          <p @click="uploadFile = true">上传文件</p>
          <Modal
            v-model="uploadFile"
            title="上传文件"
            @on-ok="uploadOk('formValidate')"
            @on-cancel="uploadCancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
              </FormItem>
              <FormItem label="积分" prop="score">
                <Input v-model="formValidate.score" placeholder="请输入积分"></Input>
              </FormItem>
              <FormItem label="上传" prop="file">
                <Upload
                  multiple
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :max-size="2048"
                  :on-exceeded-size="handleMaxSize"
                  action="/api/upload/image">
                  <Button icon="ios-cloud-upload-outline">上传</Button>
                </Upload>
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="uploadCancel">取消</Button>
              <Button type="primary" size="large" @click="uploadOk('formValidate')">确定</Button>
            </div>
          </Modal>
          <p @click="toMyArticle">我的帖子</p>
          <p @click="blockRequest = true">申请版主</p>
          <Modal
            v-model="blockRequest"
            title="申请版主"
            @on-ok="blockOk"
            @on-cancel="blockCancel">
            <Form ref="moderator" :model="moderator" :label-width="80">
              <FormItem label="版块" prop="block">
                <Select v-model="moderator.block" placeholder="请选择一个版块">
                  <Option v-for="i in block" :key="i._id" :value="i.name">{{i.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="理由" prop="reason">
                <Input v-model="moderator.reason" placeholder="请输入申请理由"></Input>
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="moderatorCancel">取消</Button>
              <Button type="primary" size="large" @click="moderatorOk('moderator')">确定</Button>
            </div>
          </Modal>
          <p @click="exit()">退出</p>
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
        <Drawer title="公告" placement="left" :closable="false" v-model="announce">
          <Timeline>
            <TimelineItem :key="i._id" v-for="i in announcement">
              <p class="time">{{i.createDate}}</p>
              <p class="content">{{i.content}}</p>
            </TimelineItem>
          </Timeline>
        </Drawer>
      </div>
    </div>
</template>

<script>
    import { mapState } from  'vuex'
    export default {
        name: "userAside",
        data() {
          return {
            announce: false,
            pointShow: false,
            expShow: false,
            blockRequest: false,
            uploadFile: false,
            block: [],
            announcement: [],
            formValidate: {
              title: '',
              file: [],
              score: ''
            },
            moderator: {
              block: '',
              reason: '',
            },
            ruleValidate: {
              title: [
                { required: true, message: '标题不能为空', trigger: 'blur' }
              ],
              file: [
                { required: true, type:'array', message: '请选择文件', trigger: 'change' }
              ],
              score: [
                { required: true, message: '积分不能为空', trigger: 'blur' },
                { type: 'number', message: '请输入整数', trigger: 'blur', transform(value) {
                    return Number(value);
                  } }
              ]
            },
          }
        },
        created() {
          this.getBlock()
          this.getAnnounceList()
        },
        methods: {
          exit() {
            sessionStorage.removeItem('store');
            this.$store.commit('setUserInfo', '');
            window.location.reload();
          },
          blockOk () {
            this.$Message.info('申请成功');
          },
          blockCancel () {
            this.$Message.info('申请取消');
          },
          uploadOk (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.upload()
              }
            })
          },
          async moderatorOk () {
            let params = this.moderator;
            params.username = this.username
            params.id = this.id
            const res = await this.$store.dispatch("moderatorRequest", params)
            if(res.data.status == 1000){
              this.$message.success('申请成功')
              this.blockRequest = false
            }else{
              this.$message.error('上传失败')
            }
          },
          moderatorCancel () {
            this.blockRequest = false
            this.$Message.info('上传取消');
          },
          async upload() {
            let params = this.formValidate;
            params.author = this.username
            params.id = this.id
            const res = await this.$store.dispatch("uploadFile", params)
            if(res.data.status == 1000){
              this.$message.success('上传成功')
              this.$store.commit('setUpload')
              this.uploadFile = false
            }else{
              this.$message.error('上传失败')
            }
          },
          uploadCancel () {
            this.uploadFile = false
            this.$Message.info('上传取消');
          },
          handleSuccess (res, file) {
            file.url = res.data
            file.name = res.data
            this.formValidate.file.push(res.data)
          },
          handleRemove (file) {
            this.formValidate.file = []
          },
          handleMaxSize (file) {
            this.$Notice.warning({
              title: 'Exceeding file size limit',
              desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
          },
          async getBlock() {
            const res = await this.$store.dispatch("getBlockList");
            if (res.data.status == 1000) {
              this.block = res.data.data
            } else {
              this.$message.error("未找到任何版块");
            }
          },
          async getAnnounceList() {
            const res = await this.$store.dispatch('getAnnouncement');
            if (res.data.status == 1000) {
              this.announcement = res.data.data
            } else {
              this.$message.error("未找到公告");
            }
          },
          toMyArticle() {
            this.$router.push({
              path: 'articleList',
              query: {
                myArticle: true,
              }
            });
          }
        },
        computed: {
          ...mapState({
            username: state => state.userInfo.username,
            point: state => state.userInfo.point,
            exp: state => state.userInfo.exp,
            level: state => state.userInfo.exp >= 0 ? `Lv${state.userInfo.exp/100 + 1}` : '',
            avatar: state => state.userInfo.avatar,
            id: state => state.userInfo._id,
          })
        }
    }
</script>

<style lang="less" scoped>
  .userAside {
    width: 100%;
    height: 100%;
    padding: 30px 20px 40px 60px;
  }
  .time{
    font-size: 14px;
    font-weight: bold;
  }
  .content{
    padding-left: 5px;
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
