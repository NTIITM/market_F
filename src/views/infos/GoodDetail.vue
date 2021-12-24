<template>
  <el-row>
    <el-col :span="8"><div class="grid-content bg-purple">
      <div class="block">
        <span class="demonstration"></span>
        <el-carousel trigger="click" height="500px">
          <el-carousel-item v-for="item in ruleForm.pic_url" :key="item" >

            <img :src="`http://localhost:8083${item}`" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    </el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light">
      <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名" prop="name">
          <label v-text="ruleForm.name"  style="width: 300px"></label>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <label v-text="ruleForm.price"  style="width: 300px"></label>
        </el-form-item>
        <el-form-item label="数量" prop="amount">
          <label v-text="ruleForm.amount"  style="width: 300px"></label>
        </el-form-item>
        <el-form-item label="描述信息" prop="description">
          <label v-text="ruleForm.description"  style="width: 300px"></label>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$router.go(-1)">返回</el-button>
          <el-button @click="addGood" v-if="userType==1">加入购物车</el-button>
        </el-form-item>

      </el-form>



    </div></el-col>
  </el-row>

</template>
<script>
import axios from "axios";
import QS from "qs";

export default {
  data() {
    return {
      ruleForm:{},
      userType:localStorage.getItem('userType')
    }
  },
  created() {
    this.getGoodInfo(this.$route.query.sid)
  },

  methods: {
    addGood(){
        axios({
          url:"updateCarList",
          method:"get",
          params:{
            uid:localStorage.getItem("userId"),
            sid:this.$route.query.sid,
            type:0
          }
        }).then(res=>{
          if (res.data.errCode==0){
            alert("加入成功")
            this.$router.go(-1)}
        })
      },

    getGoodInfo(sid){
      axios({
        url:"/getGoodsDetail",
        method:"get",
        params:{
          sid:sid
        }
      }).then(res=>{
        if (res.data.errCode==0){
          console.log(res.data)
          this.ruleForm = res.data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>