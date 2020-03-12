<template>
    <div class="personalInfo">
      <div class="content">
        <img src="@images/touxiang3.jpg" alt="">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="用户名" prop="username">
            <Input v-model="formValidate.username" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="mail">
            <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="号码" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入号码"></Input>
          </FormItem>
          <FormItem label="日期" prop="date" style="text-align: left">
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
          </FormItem>
          <FormItem label="性别" prop="gender" style="text-align: left">
            <RadioGroup v-model="formValidate.gender">
              <Radio label="male">男</Radio>
              <Radio label="female">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="个人介绍" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入个人介绍。。。"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
            <Button @click="back()" style="margin-left: 8px">返回</Button>
          </FormItem>
        </Form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "personalInfo",
        data() {
          return {
            formValidate: {
              username: 'skyofish',
              mail: '2222@qq.com',
              phone: '1111111111',
              gender: 'male',
              date: '2020-3-10',
              desc: '人在塔在',
              password: '2222222222'
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
              date: [
                { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请输入个人介绍', trigger: 'blur' },
                { type: 'string', min: 20, message: '介绍不得少于10个字', trigger: 'blur' }
              ]
            }
          }
        },
        created() {
          this.getUserInfo();
        },
        methods: {
          getUserInfo() {

          },
          handleSubmit (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.$Message.success('Success!');
              } else {
                this.$Message.error('Fail!');
              }
            })
          },
          handleReset (name) {
            this.$refs[name].resetFields();
          },
          back() {
            this.$router.go(-1)
          }
        }
    }
</script>

<style lang="less" scoped>
  .personalInfo {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    .content {
      width: 50%;
      margin: 10% auto 20px;
      font-size: 16px;

      img {
        width: 150px;
        height: 150px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        border: 5px solid white;
        background: white;
      }
    }
  }
</style>
