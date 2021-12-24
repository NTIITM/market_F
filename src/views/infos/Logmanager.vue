<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="查询日期">
        <el-date-picker
            v-model="queryBeginTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
        </el-date-picker>
        <span>-</span>
        <el-date-picker
            v-model="queryEndTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="查询条件">
        <el-input  size="mini" v-model="queryInfo" @keydown.enter.native="getData"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getData"  size="mini" type="success">查询</el-button>
        <el-button @click=""  size="mini" type="danger">刷新列表</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe>
      <el-table-column label="ID" prop="uid" width="200"></el-table-column>
      <el-table-column label="用户名" prop="name" width="200"></el-table-column>
<!--      <el-table-column label="类型" prop="LogType" width="200"></el-table-column>-->
      <el-table-column label="IP地址" prop="LoginIp" width="200"></el-table-column>
      <el-table-column label="详情" prop="LoginResult" width="200"></el-table-column>
      <el-table-column label="操作时间" prop="CreateTime" width="200"></el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration">显示总数</span>
      <el-pagination
          @current-change="getData"
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
      tableData:[],
      queryInfo: "",
      queryBeginTime: "",
      queryEndTime: "",
      pageIndex:1,
      pageTotal:0,
      pageSize:10,
      infoTotal:0,
      // visible:false,
    }
  },

  mounted() {
    this.getData()
  },
  methods:{

    getData(){
      console.log(this.pageIndex)
      axios({
        url:"admin/getAdminLogs",
        method:"get",
        params:{
          startTime:this.queryBeginTime,
          endTime:this.queryEndTime,
          key:this.queryInfo,
          pageIndex:this.pageIndex
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
    }

  }}
</script>