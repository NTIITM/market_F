<template>
  <div>
    <div>
      <h2>课程管理</h2>

      <el-divider></el-divider>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="课程名">
          <el-input size="mini" v-model="queryName" @keydown.enter.native="getCourseInfo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getCourseInfo" icon="el-icon-search" size="mini" type="primary">查询</el-button>
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
          prop="id"
          label="课程ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="courseName"
          label="课程名"
          width="300">
      </el-table-column>
      <el-table-column
          prop="teacherId"
          label="教师ID">
      </el-table-column>
      <el-table-column
          prop="scores"
          label="学分">
      </el-table-column>
      <el-table-column
          prop="endTime"
          label="选课截止时间">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px">
        <template slot-scope="scope">
          <el-button @click="chooseCourse(scope.row.id)" icon="el-icon-user" size="mini" type="success">
            选课
          </el-button>
        </template>
      </el-table-column>

    </el-table>
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
    chooseCourse(courseId){
      axios({
        url:"student/chooseCourse",
        data:QS.stringify({
          studentId:+localStorage.getItem("userId"),
          courseId:courseId,

        }),
        method:"post"
      }).then(res=>{
        if (res.data.errCode==0){
          alert("选课成功")
          this.$router.go(0)
        }else {
          alert("选课失败")
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    resetQuery(){
      this.queryName=""
      this.getCourseInfo()
    },
    getCourseInfo() {
      console.log(this.pageIndex)
      axios({
        url:"/student/getCourseToChoose",
        method:"get",
        params:{
          studentId:localStorage.getItem("userId"),
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
    this.getCourseInfo()
  },
  created() {
    this.resetQuery()
  }
}
</script>

<style scoped>

</style>