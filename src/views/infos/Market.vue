<template>
  <el-row>
    <el-col :span="4" v-for="(item, index) in tableData" :key="item.sid" :offset="index > 0 ? 2 : 0">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="`http://localhost:8083${item.pic_url}`" class="image">
        <div style="padding: 14px;">
          <span>{{item.name}}</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      currentDate: '2021-06-01',
      tableData:[]
    }
  },
  mounted() {
    this.getGoodInfo()
  },
  methods:{
    getGoodInfo() {
      axios({
        url:"/getGoods",
        method:"get",
        params:{
          uid:'',
          key:this.queryName
        }
      }).then(res=>{
        if (res.data.errCode==0){
          res.data.data.forEach(item=>{
            item.chosen = 0
          })
          console.log(res.data.data)
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
