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
          prop="sgid"
          label="记录ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="amount"
          label="购买数量"
          >
      </el-table-column>
      <el-table-column
          prop="total_price"
          label="总价">
      </el-table-column>

      <el-table-column
          prop="create_time"
          label="创建时间">
      </el-table-column>

    </el-table>
    <div class="block">
      <span class="demonstration">显示总数</span>
      <el-pagination
          @current-change="getGoodInfo()"
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
import {mapActions, mapMutations, mapState} from "vuex";
import store from "../../store";
import router from "../../router";
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

    }

  },

  methods:{
    indexMethod(index){
      return index+(this.pageIndex-1)*10+1
    },


    resetQuery(){
      this.queryName=""
      this.getGoodInfo()
    },
    getGoodInfo() {
      console.log(this.pageIndex)
      axios({
        url:"getBuyedGoods",
        method:"get",
        params:{
          uid:'',
          pageIndex:this.pageIndex,
          pageSize:10,
          queryName:this.queryName
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
  created() {
    this.resetQuery()
  }
}
</script>

<style scoped>

</style>