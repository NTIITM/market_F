<template>
  <el-row>
    <el-col :span="8"><div class="grid-content bg-purple">
      <el-upload
          class="upload-demo"
          action="updateGoods"
          :on-success="imgSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
        <el-button size="small" type="primary" @click="changeFile($event)">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名" prop="name">
          <el-input  v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input  v-model.number="ruleForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="amount">
          <el-input v-model.number="ruleForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="描述信息" prop="description">
          <el-input
              type="textarea"
              :rows="15"
              placeholder="请输入内容"
              v-model="ruleForm.description">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

      </el-form>



    </div></el-col>
  </el-row>

</template>
<script>
import axios from "axios";
import QS from "qs";

export default {
  data() {
    return {
      fileList:[]
      ,ruleForm: {
        name: '',
        amount: '',
        price: '',
        description:''
      },
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
    changeFile(e){
      console.log(e.target)
    },
    submitForm(formName) {
      console.log(this.fileList)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url:"updateGoods",
            data:QS.stringify({
              file:this.fileList,
              name:this.ruleForm.name,
              amount:this.ruleForm.amount,
              price:this.ruleForm.price,
              description:this.ruleForm.description
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


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    imgSuccess(){

    }
  }
}
</script>

<style scoped>

</style>