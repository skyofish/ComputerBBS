<template>
    <div class="userRegister">
      <div class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="用户名" prop="username">
            <Input v-model="formValidate.username" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="mail">
            <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
          </FormItem>
          <FormItem label="号码" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入号码"></Input>
          </FormItem>
          <FormItem label="生日" prop="birth" style="text-align: left">
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.birth"></DatePicker>
          </FormItem>
          <FormItem label="性别" prop="gender" style="text-align: left">
            <RadioGroup v-model="formValidate.gender">
              <Radio label="male">男</Radio>
              <Radio label="female">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="图片" prop="avatar">
            <div class="demo-upload-list" v-for="item in uploadList">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag"
              action="/api/upload/image"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
              <img :src="imgName" v-if="visible" style="width: 100%">
            </Modal>
          </FormItem>
          <FormItem label="个人介绍" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入个人介绍。。。"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">注册</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "userRegister",
        data() {
          return {
            formValidate: {
              username: '',
              mail: '',
              phone: '',
              gender: '',
              birth: '',
              desc: '',
              password: '',
              avatar: ''
            },
            ruleValidate: {
              username: [
                { required: true, message: '名字不能为空', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '密码不能为空', trigger: 'blur' }
              ],
              mail: [
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
              ],
              phone: [
                { required: true, message: '号码不能为空', trigger: 'change' }
              ],
              gender: [
                { required: true, message: '请选择性别', trigger: 'change' }
              ],
              avatar: [
                { required: true, message: '请选择头像', trigger: 'change' }
              ],
              birth: [
                { required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请输入个人介绍', trigger: 'blur' },
                { type: 'string', min: 10, message: '介绍不得少于10个字', trigger: 'blur' }
              ]
            },
            defaultList: [],
            imgName: '',
            visible: false,
            uploadList: []
          }
        },
        mounted () {
          this.uploadList = this.$refs.upload.fileList;
        },
        methods: {
          handleSubmit (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.register();
              }
            })
          },
          handleReset (name) {
            this.$refs[name].resetFields();
            this.formValidate.avatar = ''
            this.uploadList = []
          },
          handleView (name) {
            this.imgName = name;
            this.visible = true;
          },
          handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.formValidate.avatar = ''
          },
          handleMaxSize (file) {
            this.$Notice.warning({
              title: 'Exceeding file size limit',
              desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
          },
          handleSuccess (res, file) {
            file.url = res.data
            file.name = res.data
            this.formValidate.avatar = res.data
          },
          handleFormatError (file) {
            this.$Notice.warning({
              title: 'The file format is incorrect',
              desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
          },
          handleBeforeUpload () {
            const check = this.formValidate.avatar ? false : true;
            if (!check) {
              this.$Notice.warning({
                title: '只能选一个头像'
              });
            }
            return check;
          },
          async register() {
            let params = this.formValidate;
            console.log(params)
            const res = await this.$store.dispatch("register", params)
            console.log(res)
            if(res.data.status == 1000){
              this.$message.success('注册成功')
              this.$router.push('/login')
            }else{
              alert(res.data.message)
            }
          }
        }
    }
</script>

<style lang="less" scoped>
  .userRegister {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url("~@images/registerBackground.jpg");
    background-size: 100% 100%;
    color: rgb(65, 130, 205);

    .content {
      width: 50%;
      margin: 3% auto 20px;
      font-size: 16px;

      .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
      }
      .demo-upload-list img{
        width: 100%;
        height: 100%;
      }
      .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
      }
      .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
      }
      .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
      }
    }
  }
</style>
