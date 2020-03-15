<template>
    <div class="userLogin">
      <div class="content">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="username">
            <Input type="text" v-model="formInline.username" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
            <router-link to="userRegister"><Button>注册</Button></router-link>
          </FormItem>
        </Form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "userLogin",
        data () {
        return {
          formInline: {
            username: '',
            password: ''
          },
          ruleInline: {
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.login();
            }
          })
        },
        async login() {
          let params = this.formInline;
          const res = await this.$store.dispatch("login", params)
          console.log(res)
          if (res.data.status == 1000) {
            this.$Message.success('成功!');
            const userInfo = res.data.data;
            console.log(res.data.data)
            this.$store.commit('setUserInfo', userInfo)
            sessionStorage.setItem("store",JSON.stringify(this.$store.state))
            this.$router.push('/')
          } else {
            alert(res.data.message)
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  .userLogin {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url("~@images/loginBackground.jpg");
    background-size: 100% 100%;
    color: rgb(65, 130, 205);

    .content {
      width: 30%;
      margin: 15% auto 20px;
      font-size: 16px;
    }
  }
</style>
