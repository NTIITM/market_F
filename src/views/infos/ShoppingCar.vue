<template>
  <div>
    <div>
      <h2>购物车</h2>

      <el-divider></el-divider>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="商品名">
          <el-input size="mini" v-model="queryName" @keydown.enter.native="getGoodInfo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getGoodInfo" icon="el-icon-search" size="mini" type="primary">查找</el-button>
          <el-button @click="buyGood" icon="el-icon-search" size="mini" type="primary">购买</el-button>
        </el-form-item>
        <el-form-item>
          <span>总金额:{{money}}</span>
        </el-form-item>
      </el-form>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          width="55">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.chosen"></el-checkbox>
        </template>

      </el-table-column>
      <el-table-column
          type=index
          label="序号"
          width="180">
      </el-table-column>
      <el-table-column
          label="商品名"
          prop="name"
          width="180">
      </el-table-column>
      <el-table-column
          prop="price"
          label="单价"
      >
      </el-table-column>
      <el-table-column
          prop="amount"
          label="购买数量"
      >
      </el-table-column>
      <el-table-column
          prop="totalPrice"
          label="总价">
      </el-table-column>

      <el-table-column align="center" label="操作" width="300px">
        <template slot-scope="scope">
          <el-button @click="updateCarList(scope.row,2)" icon="el-icon-user" size="mini" type="success">
            增加
          </el-button>
          <el-button @click="updateCarList(scope.row,3)" icon="el-icon-user" size="mini" type="success">
            减少
          </el-button>
          <el-button @click="updateCarList(scope.row,1)" icon="el-icon-user" size="mini" type="success">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

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
      radio:'1',
    }

  },
  computed:{
    money:{
      deep:true,
      get(){
        let total = 0
        console.log(this.tableData)
        this.tableData.forEach(item=>{
          if (item.chosen==true)total+=item.amount*item.price
        })
        return total
      }

    }
  },

  methods:{
    buyGood(){
      let sids = []
      this.tableData.forEach(item=>{
        if (item.chosen==true)
          sids.push(item.sid)
      })
      axios({
        url:"buyGood",
        method:"get",
        params:{
          uid:'',
          sid:sids.join(','),

        }
      }).then(res=>{
        if (res.data.errCode==0){
          alert("购买成功")
          this.$router.go(0)
        }
      })

    },

    updateCarList (row,type){
      axios({
        url:"updateCarList",
        method:"get",
        params:{
          uid:'',
          sid:row.sid,
          type:type
        }
      }).then(res=>{
        if (res.data.errCode==0){
          switch (type){
            case 1:{
              this.$router.go(0)
              break
            }
            case 2:{
             row.amount++
              if (row.amount==0){
                this.$forceUpdate()
              }
              break
            }
            case 3:{
              row.amount--
              break
            }
          }
        }
      })
    },
    resetQuery(){
      this.queryName=""
      this.getGoodInfo()
    },
    getGoodInfo() {
      axios({
        url:"/getShoppingCarList",
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
    },
  },
  mounted() {
    this.getGoodInfo()
  },

}
</script>

<style scoped>

</style>