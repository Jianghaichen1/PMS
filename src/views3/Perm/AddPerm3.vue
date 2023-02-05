<template>
    <div class="add-goods">
      
      <div class="title">
          <h1 style="color: #02A7F0;">个人信息修改</h1>
      
        </div>
      <!-- 表单数据 -->
      <div class="myform">
         <el-form :model="permForm"
              :rules="rules"
               ref="permForm" 
               label-width="100px"
                class="demo-ruleForm">
                    <el-form-item label="姓名" class="username" prop="username">
                      <el-input v-model="permForm.username" label-width="200px"></el-input>
                  </el-form-item>
                  <el-form-item label="头像" class="Uimg" prop="Uimg">
                       <el-button  type="primary" @click="innerVisibleImg = true" >上传图片</el-button>
                        <img :src="permForm.Uimg" height="100px" alt="">
                  </el-form-item>
                    <el-form-item class="Usex" label="性别" prop="Usex">
                      <el-radio-group v-model="permForm.Usex">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                      </el-radio-group>
                  </el-form-item>
              
                   <el-form-item label="邮箱" class="Ueamil" prop="Uemail">
                      <el-input v-model="permForm.Uemail"></el-input>
                  </el-form-item>
                
  
                  <el-form-item label="出生日期" style="margin-left:30px ;" class="Uyear" required>
                      <el-col :span="11">
                      <el-form-item  prop="Uyear">
                          <el-date-picker type="date" placeholder="选择日期" v-model="permForm.Uyear" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                      </el-col>      
                  </el-form-item>    
                  <el-form-item label="手机" class="Uphone" prop="Uphone">
                      <el-input v-model="permForm.Uphone"></el-input>
                  </el-form-item>
                   <el-form-item label="简介" class="Uji" prop="Uji">
                      <el-input v-model="permForm.Uji"></el-input>
                  </el-form-item>
                  <el-form-item label="擅长" class="Uhobby" prop="Uhobby">
                      <el-input v-model="permForm.Uhobby"></el-input>
                  </el-form-item>
                  <el-form-item label="番茄类型" class="Utype" prop="Utype">
                      <el-input v-model="permForm.Utype"></el-input>
                  </el-form-item>
                      <el-form-item>
                        <el-button class="sure" type="primary" @click="successForm">
                          确定</el-button>
                        <el-button  class="reset" @click="clearForm">重置</el-button>
                      </el-form-item>
          </el-form>
            <!-- 1. 内弹框 --- 上传图片 -->
        <el-dialog
          width="40%"
          title="上传图片"
          :visible.sync="innerVisibleImg"
          append-to-body
        >
          <PermUpdate @sendImg="sendImg" ref="upload" />
          <span slot="footer" class="dialog-footer">
            <el-button @click="innerVisibleImg = false">取 消</el-button>
            <el-button type="primary" @click="showImg">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
  
  import M from 'minimatch';
import PermUpdate from './PermUpdate.vue';
  export default {
    components: {
              //注册组件
              PermUpdate
            },
    data() {
      return {
        innerVisibleImg: false, //图片弹框
        imgUrl:'',
          permForm: {
            username:" ",
            Username:'',
            Usex: '',
            Uemail: '',
            Uji: '',
            Uimg:'',
            Uyear:'',
            Uhobby: '',
            Utype: '',   
          },
  
           dialogVisible:false,
           rules: {
               //校验规则
            username: [
              { required: true, message: '请输入名字', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            Did: [{ required: true, message: '请输入Did', trigger: 'blur' }],
            Usex: [{required: true,trigger: 'blur'}],
            Unation: [ {  required: true, message: '请输入民族', trigger: 'blur' }],
            Uvocation: [{  required: true, message: '请输入学历', trigger: 'blur' } ],
            Uimg: [{  required: true, message: '请上传头像', trigger: 'blur'  }],
            Uyear: [ {  required: true, message: '请输入生日', trigger: 'blur' }],
            Uhome: [{  required: true, message: '请输入家庭地址', trigger: 'blur'  }],
            Uphone: [  {  required: true, message: '请输入手机号', trigger: 'blur'  }]
          
          }
        };
      }, 
    methods: {
      /**
       * 显示图片的地址
       */
       sendImg(val) {
        console.log("显示图片的地址", val);
        this.imgUrl = val;
      },
      /**
       * 显示图片--确定按钮
       */
      showImg() {
        this.innerVisibleImg = false;
        this.permForm.img = this.imgUrl;
        //清空图片上传的列表
        this.$refs.upload.fileList = [];
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      successForm(){
        this.$message({
                    message: "修改信息成功",
                    type: "success",
                  });
              //清理数据
              this.clearForm();
      },
      clearForm() {
         this.permForm={
            username: "",
          
            Usex: "",
            Uemial: "",
            Uji:"",
            Uimg:"",
            Uhobby:"",
            Uyear:"",
            Utype: "",
            Uphone: "",   
        };
      },   
    },
   
  };
  </script>
  
  <style lang='less' scoped>
    .title1{
      margin-left: 130px;
      height: 25px;
      width: 80px;
      margin-top: -30px;
      border: 2px solid #02A7F0;
      border-radius: 10px;
      
    }
  .add-goods {
    margin: 20px;
  }
  .title {
    padding: 10px;
    background: #fff;
    border: 1px solid #eee;
    margin-bottom: 20px;
  }
  .myform {
    background: #fff;
    padding: 10px;
    padding-right: 30px;
  }
  .line{
      text-align: center;
  }
  .sure{
      margin-left: 600px;
  }
  </style>