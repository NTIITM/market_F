
<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
import axios from "axios";
import QS from "qs";

export default {
  data() {

    return {
      tableData:[],
      info: {
        name: '',
        phoneNumber: '',
        mailAddress: '',
        birth: '',
        academy: '',
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' },
        ],
        birth: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        mailAddress: [
          { required: true, message: '邮箱地址不可为空', trigger: 'blur' }
        ],
        academy: [
          { required: true, message: '学院不可为空', trigger: 'blur' }
        ]
      }
    };
  },
    computed:{
      decidedColor(index1,index2){
        if (this.tableData[index1][index2]){
          return "background-color: darkorange"
        }else {
          return "background-color: white"
        }
      }
    }
  ,
    mounted() {
      console.log(this)
      axios({
        url:"/teacher/CourseTable/all/"+localStorage.getItem("userId"),
        method:"get"
      }).then(res=>{
            if (res.data.errCode==="0"){
              this.tableData=JSON.parse(res.data.data);
            }
          }
      ).catch(err=>{
        console.log(err)
      })

  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url:"/teacher/changeInfo/"+localStorage.getItem("userId"),
            method:"post",
            data:this.info
          }).then(res=>{
            if (res.data.errCode==0){
              alert("修改成功")
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