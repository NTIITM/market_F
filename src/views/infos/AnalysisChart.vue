<template>
  <div>
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
        <el-form-item>
          <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="50%"
          >
            <el-transfer v-model="sids" :data="goodList" :titles="['可查看商品', '选择查看的商品']"></el-transfer>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
          </el-dialog>
          <el-button type="primary" @click="dialogVisible = true">选择查看的商品</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="getData" size="mini" type="success">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="myChart" :style="{width: '1000px', height: '700px'}">
    </div>

  </div>
</template>
<script>
// 引入 ECharts 主模块
import axios from "axios";
import QS from "qs";

var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend')

export default {
  name: 'Echarts',
  data () {
    return {
      msg: 'Welcome use Echarts',
      tableData:[],
      queryBeginTime: "",
      queryEndTime: "",
      goodList:[],
      sids:[],
      dialogVisible:false,
    }
  },
  created() {

  },
  mounted() {
    axios({
      url:"/getGoodsList",
      method:"get",
      params:{
        uid:localStorage.getItem("userId")
      }
    }).then(res=>{
      if (res.data.errCode==0){
        console.log(res.data.data)
        res.data.data.forEach(
            item=>{
              this.goodList.push({
                key:item.sid,
                label:item.name,
              })}
        )}
    })
  },
  methods: {
    async getData(){
      let xArray = []
      let data = []
      let legend=[]
      await axios({
        url:"/getGoodsBuyed",
        method:"get",
        params:{
          startTime:this.queryBeginTime,
          endTime:this.queryEndTime,
          sids: this.sids.join(','),
        }
      }).then(res=>{
        if (res.data.errCode==0){
          console.log(res.data.data)
          res.data.data.sids.forEach(sid=>{
            let name = this.goodList.filter(singleRoom=>{
              return singleRoom.key==sid
            }).pop().label
            legend.push(name)
            data.push({
              type:'line',
              data:res.data.data.dataList.shift(),
              name:name ,
              areaStyle: {}
            })
          })
          xArray=res.data.data.time

        }
      })
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption(
          {

            title: {
              text: '销量'
            },
            tooltip: {},
            legend: {
              data:legend
            },
            xAxis: {
              axisLabel:{
                interval:0,
                rotate:30
              },
              data: xArray
            },
            yAxis: {},
            series: data
          }
      );
      this.$forceUpdate()
    },

  }
}
</script>