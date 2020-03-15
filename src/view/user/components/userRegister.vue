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
              password: ''
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
              birth: [
                { required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请输入个人介绍', trigger: 'blur' },
                { type: 'string', min: 10, message: '介绍不得少于10个字', trigger: 'blur' }
              ]
            }
          }
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
      margin: 10% auto 20px;
      font-size: 16px;
    }
  }
</style>
