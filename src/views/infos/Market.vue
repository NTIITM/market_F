<template>
  <div>
  <div>
    <h2>历史购买记录</h2>

    <el-divider></el-divider>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="商品名">
        <el-input size="mini" v-model="queryName" @keydown.enter.native="getGoodInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getGoodInfo" icon="el-icon-search" size="mini" type="primary">查询</el-button>
        <el-button @click="resetQuery" icon="el-icon-refresh" size="mini" type="danger">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <el-row>
    <el-col :span="4" v-for="(item, index) in tableData" :key="item.sid" >
      <el-card :body-style="{ padding: '0px' }">
        <img :src="`http://localhost:8083${item.pic_url}`" class="image" width="200px" height="300px">
        <div style="padding: 14px;">
          <span>{{item.name}}</span>
          <div class="bottom clearfix">
            <i >{{ item.price }}元</i>
            <el-button type="text" class="button" @click="getDetail(item.sid)">详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
    <div class="block">
      <span class="demonstration">显示总数</span>
      <el-pagination
          @current-change="getCourseInfo"
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

export default {
  data() {
    return {
      loading: false,
      tableData:[],
      queryName:"",
      pageIndex:1,
      pageTotal:0,
      pageSize:10,
      infoTotal:0,
    }
  },
  mounted() {
    this.getGoodInfo()
  },
  methods:{

    resetQuery(){
      this.queryName=""
      this.getGoodInfo()
    },
    getDetail(sid){
      this.$router.push({path:"/index/GoodDetail",query:{sid}})
    },
    getGoodInfo() {
      axios({
        url:"/getGoods",
        method:"get",
        params:{
          uid:localStorage.getItem("userId"),
          key:this.queryName,
          pageIndex:this.pageIndex,
          pageSize:10,
          queryName:this.queryName
        }
      }).then(res=>{
        if (res.data.errCode==0){
          this.tableData = res.data.data
          this.pageSize = res.data.respPage.pageSize
          this.infoTotal = res.data.respPage.totalCount
          this.pageTotal = Math.ceil(res.data.respPage.totalCount/this.pageSize)
          this.tableData = res.data.data

        }
      })
    }
  }
}
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
