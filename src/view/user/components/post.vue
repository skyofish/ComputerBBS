<template>
    <div class="post">
      <p>发布帖子</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="标题" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="版块" prop="block">
          <Select v-model="formValidate.block" placeholder="请选择一个版块">
            <Option v-for="i in block" :key="i._id" :value="i.blockName">{{i.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="内容" prop="content">
          <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
        </FormItem>
        <FormItem label="图片" prop="img">
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
            :on-remove="handleRemove"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
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
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">发布</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
    import { mapState } from  'vuex'
    export default {
      name: "post",
      data () {
        return {
          formValidate: {
            title: '',
            block: '',
            content: '',
            images: []
          },
          ruleValidate: {
            title: [
              { required: true, message: '标题不能为空', trigger: 'blur' }
            ],
            block: [
              { required: true, message: '请选择一个版块', trigger: 'change' }
            ],
            content: [
              { required: true, message: '请输入发帖内容', trigger: 'blur' },
              { type: 'string', min: 10, message: '不少于十个字', trigger: 'blur' }
            ]
          },
          defaultList: [],
          imgName: '',
          visible: false,
          uploadList: [],
          block : []
        }
      },
      mounted () {
        this.uploadList = this.$refs.upload.fileList;
      },
      created() {
        this.getBlock()
      },
      methods: {
        handleSubmit (name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.post()
            }
          })
        },
        handleReset (name) {
          this.$refs[name].resetFields();
        },
        handleView (name) {
          this.imgName = name;
          this.visible = true;
        },
        handleRemove (file) {
          const fileList = this.$refs.upload.fileList;
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
          file.url = res.data
          file.name = res.data
          this.formValidate.images.push(res.data)
        },
        handleFormatError (file) {
          this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
          });
        },
        handleMaxSize (file) {
          this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: 'File  ' + file.name + ' is too large, no more than 2M.'
          });
        },
        handleBeforeUpload () {
          const check = this.uploadList.length < 5;
          if (!check) {
            this.$Notice.warning({
              title: 'Up to five pictures can be uploaded.'
            });
          }
          return check;
        },
        async post() {
          let params = this.formValidate;
          params.author = this.username;
          const res = await this.$store.dispatch("postArticle", params);
          if(res.data.status == 1000){
            this.$message.success('发布成功')
            this.$router.push('/')
          }else{
            this.$message.success('发布失败')
          }
        },
        async getBlock() {
          const res = await this.$store.dispatch("getBlockList");
          if (res.data.status == 1000) {
            this.block = res.data.data
          } else {
            this.$message.error("未找到任何版块");
          }
        }
      },
      computed: {
        ...mapState({
          username: state => state.userInfo.username,
        })
      }
    }
</script>

<style lang="less" scoped>
  .post {
    margin-top: 13px;
    background: white;
    padding: 50px 50px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    p{
      margin-bottom: 50px;
    }

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
</style>
