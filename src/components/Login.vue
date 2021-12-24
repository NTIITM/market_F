<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">WELCOME</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="account" placeholder="用户名" clearable @on-blur="verifyAccount"/>
                <p class="error">{{accountError}}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"/>
                <p class="error">{{pwdError}}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登录</Button>
          <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>
        </div>

    </div>
</template>

<script>
import QS from 'qs'
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
    name: 'login',
    data() {
        return {
            account: '',
            pwd: '',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {}
        }
    },
    created() {
        this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        verifyAccount(e) {
            if (this.account === 'admin') {
                this.accountError = ''
            } else {
                this.accountError = ''
            }
        },
        verifyPwd(e) {
            if (this.pwd === '') {
                this.pwdError = '密码不应为空'
            } else {
                this.pwdError = ''
            }
        },
        register() {
          console.log('注册账号')
          this.$router.push({
            path: '/Register'
          })

        },
        forgetPwd() {
            console.log('忘记密码')
          if(this.account === ''){
            this.$notify({
              title: '跳转失败',
              message: "输入用户名或邮箱再去重置密码吧",
              type: 'error'
            });

          }else {
            this.$router.push({
              path: '/ResetPassword',
              query: {
                userid: this.account,
              }
            })
          }
        },
        submit() {
            if (this.account  !== '' && this.pwd !== '') {
                let password_md5 = this.$md5(this.pwd);
              console.log(password_md5)
                axios({
                  url:'/login',
                  params:{
                    userId:this.account,
                    password:password_md5
                  }
              }).then(response=> {
                // console.log(response.data)
                console.log('success',response)
                // console.log(response.data.data)

                // console.log(response.data.data.errCode==="0")
                if (response.data.errCode === "0"){
                  this.isShowLoading = true
                  // 登录成功 设置用户信息
                  localStorage.setItem('userName', response.data.data.userName)
                  localStorage.setItem('userType', response.data.data.userType)
                  localStorage.setItem('userImg', response.data.data.userImg)
                  localStorage.setItem('userId', response.data.data.userId)
                  // 登录成功 假设这里是后台返回的 token
                  localStorage.setItem('token', response.data.data.token)

                  // this.$router.push({path: this.redirect || '/'})
                  this.$router.push({path: '/index'})
                }else {
                  this.accountError=response.data.errMsg
                }
              }) .catch(error=> {
                console.log('err',error)
              });

            } else {
                if (this.account === '') {
                    this.accountError = '请输入账号'
                } 

                if (this.pwd === '') {
                    this.pwdError = '请输入密码'
                } 
            }
        }
    }
}
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
}
.login-vue .input-c {
    margin: auto;
    width: 200px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 200px;
}
.login-vue .account {
    margin-top: 30px;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>


