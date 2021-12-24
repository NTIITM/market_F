<template>
  <div class="login-wrap" :style="bg">
    <div class="ms-title">畅购二手商城-欢迎注册</div>
    <div class="ms-login">
      <el-form ref="form" :model="form" :rules="rules">
        <div v-if="errorInfo" style="margin-bottom: 5px;">
          <span>{{errInfo}}</span>
        </div>
        <el-form-item prop="userId">
          <el-input v-model="form.uid" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input v-model="form.name" placeholder="用户姓名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
<!--        <el-form-item prop="sex">-->
<!--          <el-select class="select-sex" v-model="form.sex" placeholder="性别">-->
<!--            <el-option label="男" value="男"></el-option>-->
<!--            <el-option label="女" value="女"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="手机号"></el-input>
        </el-form-item>
<!--        <el-form-item prop="academy">-->
<!--          <el-input v-model="form.academy" placeholder="专业"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="电子邮箱"></el-input>
        </el-form-item>
<!--        <el-form-item prop="birth">-->
<!--          <el-input v-model="form.birth" placeholder="生日"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          <el-button @click="onCancle()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import Util from '../../utils/utils';

export default {
  data() {
    var reg01 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电子邮箱'));
      } else if (this.form.email!=''&&!reg01.test(this.form.email)) {
        callback(new Error('请输入正确的电子邮箱'));
      } else {
        callback();
      }
    };
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (this.form.phone!=''&&!reg.test(this.form.phone)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    return {
      errorInfo: false,
      bg:{},
      form: {
        uid: '',
        realName: '',
        password: '',
        email: '',
        phone: '',
        card: '',
        sex: '',
        address: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入登录名', trigger: 'blur'},
          {min: 4, message: '登录名最少4个字符', trigger: 'blur'},
          {max: 20, message: '登录名最多20个字符', trigger: 'blur'}
        ],
        realName: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'},
          {min: 2, message: '姓名最少2个字符', trigger: 'blur'},
          {max: 20, message: '姓名最多20个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '密码最少6个字符', trigger: 'blur'},
          {max: 20, message: '密码最多20个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, validator: validateEmail, trigger: 'blur'}
        ],
        phone: [
          {required: true, validator: validatePhone, trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请输入性别', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入家庭住址', trigger: 'blur'},
          {min: 10, message: '家庭地址最少10个字符', trigger: 'blur'},
          {max: 50, message: '家庭地址最多50个字符', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
  },
  methods: {
    onSubmit(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$http.post('register', self.form).then(function (response) {
            console.log(response);
            if (response.data.code == -1) {
              self.errorInfo = true;
              self.errInfo = response.data.msg;
              self.$message.error(response.data.msg);
            } else if (response.data.code == 0) {
              self.$message.success(response.data.msg);
              self.$router.push('/login');
            }
          }).then(function (error) {
            console.log(error);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    onCancle() {
      this.$router.push('/login');
    },
    getDateTimes(str) {
      var str = new Date(str);
      return str;
    }
  }
}
</script>


<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -320px;
  text-align: center;
  font-size: 30px;
  color: #fff;

}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 490px;
  margin: -250px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.ms-login span {
  color: red;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.select-sex {
  width: 300px;
}
</style>