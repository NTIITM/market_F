<template>
  <el-descriptions class="margin-top" title="个人信息" :column="3" :size="'medium'">
    <template slot="extra">
      <el-button type="primary" size="small">操作</el-button>
    </template>
    <el-descriptions-item label="用户名">{{user.name}}</el-descriptions-item>
    <el-descriptions-item label="ID">{{ user.uid }}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{ user.phoneNumber }}</el-descriptions-item>
    <el-descriptions-item label="余额">{{user.account}}</el-descriptions-item>
    <el-descriptions-item label="账户类型">
      <el-tag size="small">{{user.type==1?"个人":"管理员"}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="邮箱">{{ user.mailAddress }}</el-descriptions-item>
  </el-descriptions>
</template>
<script>
import axios from "axios";

export default {
  data () {
    return {
      user:{},
      size: ''
    };
  },
  created() {
    this.getPersonInfo()
  },
  methods:{
    getPersonInfo() {
      axios({
        url:"/getperson",
        method:"get",
        params:{
          uid:'',
        }
      }).then(res=>{
        if (res.data.errCode==0){
          this.user = res.data.data
        }
      })
    }
  }
}
</script>