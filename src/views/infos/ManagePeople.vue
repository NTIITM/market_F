<template>
  <div>
    <div>
      <h2>用户管理</h2>

      <el-divider></el-divider>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input size="mini" v-model="queryName" @keydown.enter.native="getPersonInfo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getPersonInfo" icon="el-icon-search" size="mini" type="primary">查询</el-button>
          <el-button @click="resetQuery" icon="el-icon-refresh" size="mini" type="danger">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" label="1" @change="getPersonInfo">用户</el-radio>
          <el-radio v-model="radio" label="0" @change="getPersonInfo">管理员列表</el-radio>
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
          width="50">
      </el-table-column>
      <el-table-column
          prop="uid"
          label="用户ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型">
      </el-table-column>
      <el-table-column
          v-if="radio==1"
          prop="account"
          label="余额">
      </el-table-column>
      <el-table-column
          prop="phoneNumber"
          label="电话号码"
          width="300">
      </el-table-column>
      <el-table-column
          prop="mailAddress"
          label="邮箱"
          width="300">
      </el-table-column>
      <el-table-column
          prop="state"
          label="账号状态">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px" v-if="radio==1">
        <template slot-scope="scope">
          <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
            <div style="margin: 20px 0;"></div>
            <div class="block">
              <span class="demonstration">封号截至</span>
              <el-date-picker
                  v-model="rTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
            <span>&nbsp;</span>
            <el-input
                type="textarea"
                placeholder="请输入原因"
                v-model="reason"
                maxlength="30"
                show-word-limit
            >
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="editPeopleState(scope.row.uid,1)">确 定</el-button>
              </span>
          </el-dialog>
          <el-button @click="dialogVisible=true" icon="el-icon-user" size="mini" type="danger"  v-if="scope.row.stateCode==1">
            封号
          </el-button>
          <el-button @click="editPeopleState(scope.row.uid,0)" icon="el-icon-user" size="mini" type="primary" v-if="scope.row.stateCode==0">
            解封
          </el-button>
          <el-button @click="editGood(scope.row.id)" icon="el-icon-user" size="mini" type="success">
            个人商品
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block">
      <span class="demonstration">显示总数</span>
      <el-pagination
          @current-change="getPersonInfo"
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
      queryName: "",
      pageIndex: 1,
      pageTotal: 0,
      pageSize: 10,
      infoTotal: 0,
      radio: '1',
      dialogVisible: false,
      reason:'',
      rTime:'',

    }

  },

  methods: {
    indexMethod(index) {
      return index + (this.pageIndex - 1) * 10 + 1
    },
    editPeopleState(uid,state) {
      if (confirm("确定禁用/解封吗？")) {
        axios({
          url: "editPersonStates",
          params: {
            uid:uid,
            type:state ,
            reason:this.reason,
            rTime:this.rTime
          },
          method: "get"
        }).then(res => {
          if (res.data.errCode == 0) {
            alert("成功")
            this.$router.go(0)
          } else {
            alert("失败")
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },

    editGood(courseId) {
      axios({
        url: "manageGetGoods",
        data: QS.stringify({
          studentId: +localStorage.getItem("userId"),
          courseId: courseId,

        }),
        method: "post"
      }).then(res => {
        if (res.data.errCode == 0) {
          alert("上传成功")
          this.$router.go(0)
        } else {
          alert("上传失败")
        }
      }).catch(err => {
        console.log(err)
      })
    },

    resetQuery() {
      this.queryName = ""
      this.getPersonInfo()
    },
    getPersonInfo() {
      axios({
        url: "/getAllPerson",
        method: "get",
        params: {
          userId: "",
          pageIndex: this.pageIndex,
          pageSize: 10,
          key: this.queryName,
          type: this.radio
        }
      }).then(res => {
        if (res.data.errCode == 0) {
          console.log(res.data)
          this.tableData = res.data.data
          this.pageSize = res.data.respPage.pageSize
          this.infoTotal = res.data.respPage.totalCount
          this.pageTotal = Math.ceil(res.data.respPage.totalCount / this.pageSize)
        }
      })
    },
  },
  mounted() {
    this.getPersonInfo()
  },

}
</script>

<style scoped>

</style>