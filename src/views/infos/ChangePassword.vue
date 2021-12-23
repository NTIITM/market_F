<template>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="旧密码" prop="pass">
    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off" STYLE="width: 300px"></el-input>
  </el-form-item>
<el-form-item label="新密码" prop="pass">
  <el-input type="password" v-model="ruleForm.pass" autocomplete="off" STYLE="width: 300px"></el-input>
</el-form-item>
<el-form-item label="确认密码" prop="checkPass">
  <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" STYLE="width: 300px"></el-input>
</el-form-item>

<el-form-item>
  <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
  <el-button @click="resetForm('ruleForm')">重置</el-button>
</el-form-item>
</el-form>
</template>
<script>
import axios from "axios";
import QS from "qs";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPass:'',
        pass: '',
        checkPass: '',
      },
      rules: {
        oldPass: [{
          required: true, message: '密码不能为空', trigger: 'blur'}]
      },
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],

    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let password_md5_old = this.$md5(this.ruleForm.oldPass);
          let password_md5_check = this.$md5(this.ruleForm.checkPass);
          axios({
            url:"/teacher/changePassword/"+localStorage.getItem("userId"),
            method:"post",
            data:QS.stringify({
              oldPass:password_md5_old,
              pass:password_md5_check
            })
          }).then(res=>{
            if (res.data.errCode==0){
              alert("修改成功")
              this.resetForm()
            }else{
              alert(res.data.errMsg)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>

</style>