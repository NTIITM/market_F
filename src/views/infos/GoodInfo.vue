<template>
  <el-row>
    <el-col :span="8"><div class="grid-content bg-purple">
      <el-upload class="upload-demo"
                 ref="upload"
                 list-type="picture-card"
                 action="insertGoods"
                 :limit="9"
                 :on-preview="handlePictureCardPreview"
                 :before-upload="beforeupload"
                 :on-exceed="exceedHandle"
                 :auto-upload="false"
                 :multiple='true'>
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%"
             :src="dialogImageUrl"
             alt="">
      </el-dialog>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light">
      <el-form ref="form" :rules="rules"
               :model="form"
               label-width="80px">
        <!--  <el-form-item label="活动名称">-->
        <!--    <el-input v-model="form.name"-->
        <!--              name="names"-->
        <!--              style="width:360px;"></el-input>-->
        <!--  </el-form-item>-->
        <el-form-item label="商品名" prop="name">
          <el-input  v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input  v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="amount">
          <el-input v-model.number="form.amount"></el-input>
        </el-form-item>
        <el-form-item label="描述信息" prop="description">
          <el-input
              type="textarea"
              :rows="15"
              placeholder="请输入内容"
              v-model="form.description">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('form')">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div></el-col>
  </el-row>

</template>
<script>
import axios from "axios";
import QS from "qs";
import {mapMutations} from "vuex";

export default {
  data() {
    return {
      company_id: '10001',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      form: {// form里面的参数
        name: '',
        amount: '',
        price: '',
        description:''
      },
      param: '', // 表单要提交的参数
      src: '', // 展示图片的地址
      rules:{
        name: [
          { required: true, message: '名字不能为空'},
        ],
        amount: [
          { required: true, message: '数量不能为空'},
          { type: 'number', message: '数量必须为数字值'}
        ],
        price: [
          { required: true, message: '价格不能为空'},
          { type: 'number', message: '价格必须为数字值'}
        ],
        description: [
          { required: true, message: '描述不能为空'},
        ]

      }
  }
  },
  methods: {
    methods: {
      ...mapMutations(['changeLogin']),
      // 1，上传前移除事件
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      // 2，上传前事件
      beforeupload (file) {
        // 2.1，重新写一个表单上传的方法
        this.param = new FormData()
        this.fileList.push(file) // 把单个文件变成数组
        //let images = [...this.fileList] // 把数组存储为一个参数，便于后期操作
        // 2.2，遍历数组
        // images.forEach((img, index) => {
        //   this.param.append(`img_${index}`, img) // 把单个图片重命名，存储起来（给后台）
        // })
        return false
      },
      // 3，点击文件列表中已上传的文件时的钩子
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // // 4，表单提交的事件
      // onSubmit () {
      //   let _this = this
      //   // var names = _this.form.name
      //   var name = _this.ruleForm.name
      //   var amount = _this.ruleForm.amount
      //   var price = _this.ruleForm.price
      //   var description = _this.ruleForm.description
      //   this.$refs.upload.submit()
      //   // 4.1，下面append的东西就会到form表单数据的this.param中；
      //   //this.param.append('company_id', _this.company_id)
      //   this.param.append('caption', name)
      //   this.param.append('caption', amount)
      //   this.param.append('caption', price)
      //   this.param.append('caption', description)
      //   this.param.append('token', localStorage.getItem('Authorization'))
      //   // 4.2，赋予提交请求头，格式为：'multipart/form-data'（必须！！）
      //   let config = {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   }
      //   // 4.3，然后通过下面的方式把内容通过axios来传到后台
      //   axios.post('insertGoods', this.param, config).then(function (result) {
      //     console.log(result)
      //   })
      // },
      submitForm(formName) {
        this.$refs.upload.submit()
        console.log('5555',this.fileList[0])
        let formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('uid', localStorage.getItem("userId"));
        formData.append('amount', this.form.amount);
        formData.append('price', this.form.price);
        formData.append('description', this.form.description);
        formData.append('file', this.fileList[0]);
        formData.append('file', this.fileList[1]);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              url:"insertGoods",
              data: formData,
              method:"post",
              headers: {
                "Content-Type": 'multipart/form-data',
              }
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


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 5设置超过9张图给与提示
      exceedHandle () {
        alert('您现在选择已超过9张图，请重新选择')
      }
    }
  }
}
</script>

<style scoped>

</style>