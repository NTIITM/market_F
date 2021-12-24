<template>
  <div>
    <div>
      <h2>录商品信息管理</h2>

      <el-divider></el-divider>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="商品名">
          <el-input size="mini" v-model="queryName" @keydown.enter.native="getGoodInfo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getGoodInfo" icon="el-icon-search" size="mini" type="primary">查询</el-button>
          <el-button @click="resetQuery" icon="el-icon-refresh" size="mini" type="danger">重置</el-button>
          <el-button @click="addGood" icon="el-icon-search" size="mini" type="success">添加商品</el-button>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" label="1" @change="getGoodInfo">已授权</el-radio>
          <el-radio v-model="radio" label="0" @change="getGoodInfo">未授权</el-radio>
          <el-radio v-model="radio" label="2" @change="getGoodInfo">下架</el-radio>
        </el-form-item>
      </el-form>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          type=index
          :index="indexMethod"
          label="序号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="sid"
          label="商品ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="商品"
          width="300">
      </el-table-column>
      <el-table-column
          prop="price"
          label="价格">
      </el-table-column>
      <el-table-column
          prop="amount"
          label="数量">
      </el-table-column>
      <el-table-column
          v-if="radio!=2"
          prop="state"
          label="发布状态">
      </el-table-column>
      <el-table-column
          v-if="radio==2"
          prop="reason"
          label="下架原因">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px">
        <template slot-scope="scope">
          <el-button @click="editGood(scope.row.id)" icon="el-icon-user" size="mini" type="success">
            详情
          </el-button>
<!--          <el-button @click="editGood(scope.row.id)" icon="el-icon-user" size="mini" type="success">-->
<!--            修改-->
<!--          </el-button>-->
          <el-button @click="deleteGood(scope.row.sid)" icon="el-icon-user" size="mini" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block">
      <span class="demonstration">显示总数</span>
      <el-pagination
          @current-change="getGoodInfo"
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="infoTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import QS from "qs";

export default {
  data() {
    return {
      tableData: [],
      queryName:"",
      pageIndex:1,
      pageTotal:0,
      pageSize:10,
      infoTotal:0,
      radio:'1'

    }

  },

  methods:{
    indexMethod(index){
      return index+(this.pageIndex-1)*10+1
    },
    addGood(){


    },
    deleteGood(sid){
      if (confirm("重新发布需要再次验证，确定删除吗？")){
        axios({
          url:"deleteManageGoods",
          params:{
            sid:sid,
            key:this.queryName,
          },
          method:"get"
        }).then(res=>{
          if (res.data.errCode==0){
            alert("删除成功")
            this.$router.go(0)
          }else {
            alert("删除失败")
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },

    editGood(courseId){
      axios({
        url:"student/chooseCourse",
        data:QS.stringify({
          studentId:+localStorage.getItem("userId"),
          courseId:courseId,

        }),
        method:"post"
      }).then(res=>{
        if (res.data.errCode==0){
          alert("上传成功")
          this.$router.go(0)
        }else {
          alert("上传失败")
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    resetQuery(){
      this.queryName=""
      this.getGoodInfo()
    },
    getGoodInfo() {
      axios({
        url:"/getManageGoods",
        method:"get",
        params:{
          userId:localStorage.getItem("userId"),
          pageIndex:this.pageIndex,
          pageSize:10,
          key:this.queryName,
          type:this.radio
        }
      }).then(res=>{
        if (res.data.errCode==0){
          console.log(res.data)
          this.tableData = res.data.data
          this.pageSize = res.data.respPage.pageSize
          this.infoTotal = res.data.respPage.totalCount
          this.pageTotal = Math.ceil(res.data.respPage.totalCount/this.pageSize)
        }
      })
    },
  },
  mounted() {
    this.getGoodInfo()
  },

}
</script>

<style scoped>

</style>