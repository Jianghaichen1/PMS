<template>
    <div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="clearForm"
      > 
        <!-- 内容区域 -->
        <span>
           <el-form :model="expertForm"
              :rules="experts"
               ref="expertForm" 
               label-width="100px"
                class="demo-expertForm">
                
                    <el-form-item label="账号"  prop="username">
                      <el-input v-model="expertForm.username" label-width="200px"></el-input>
                  </el-form-item>
                  <el-form-item label="密码"  prop="password">
                      <el-input v-model="expertForm.password" label-width="200px"></el-input>
                  </el-form-item>
                    <el-form-item label="姓名"  prop="name">
                      <el-input v-model="expertForm.name" label-width="200px"></el-input>
                  </el-form-item>
                    <el-form-item  label="性别" prop="sex">
                      <el-radio-group v-model="expertForm.sex">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="邮箱"  prop="email">
                    <el-input v-model="expertForm.email"></el-input>
                </el-form-item>
              

                <el-form-item label="出生日期" style="margin-left:30px ;"  required>
                    <el-col :span="11">
                    <el-form-item  prop="time">
                        <el-date-picker type="date" placeholder="选择日期" v-model="expertForm.time" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>      
                </el-form-item>    
                <el-form-item label="手机"  prop="phone">
                    <el-input v-model="expertForm.phone"></el-input>
                </el-form-item>
                 <el-form-item label="简介"  prop="ji">
                    <el-input v-model="expertForm.ji"></el-input>
                </el-form-item>
                <el-form-item label="擅长"  prop="hobby">
                    <el-input v-model="expertForm.hobby"></el-input>
                </el-form-item>
                
  
                  
                </el-form>
        </span>
        <!-- 弹框底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="clearForm">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
  
   
       
  
       
      </el-dialog>
    </div>
  </template>
  
  <script>
  
  
  
  export default {
    props: {
      title: {
        type: String,
        default: "添加用户信息",
      },
      rowData: {
        type: Object,
        default: function () {
          return {};
        },
      },
    },
    data() {
      return {
        dialogVisible: false, //外弹框
        innerVisible: false, //内弹框
          expertForm:{
                  id:'',
                  username:'',
                  password:'',
                  name:'',
                  sex:'',
                  email:'',
                  phone:'',
                  time:'',
                  ji:'',
                  hobby:'',
                
          },
           experts: {
               //校验规则
            username: [
              {   required: true, message: '请输入账号', trigger: 'blur' }
            ],
            password: [
              {   required: true, message: '请输入密码', trigger: 'blur' }
            ],  
            name: [
              {   required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            phone: [
           { required: true, min: 11, max: 11, message: '请输入11位号码', trigger: 'blur' }
          ],   
          }
       
       
      };
    },
   methods:{
      
  
      //自定义事件--通知父亲--修改dialogVisible
      close() {
        this.$emit("changeDialog");
      },
          //修改奖惩数据
      submitForm() {
        this.$refs.expertForm.validate((valid) => {
          if (valid) {
            console.log("获取输入的信息", this.expertForm);
            
            let {
                   id,
                  username,
                  password,
                  name,
                  sex,
                  email,
                  phone,
                  time,
                  ji,
                  hobby,
                 
            } = this.expertForm;
            //判断当前的确定按钮类型：
            if (this.title === "添加用户信息") {
              console.log("添加用户信息");
              this.$api
                .addExpert({
                  id,
                  username,
                  password,
                  name,
                  sex,
                  email,
                  phone,
                  time,
                  ji,
                  hobby,
                
                })
                .then((res) => {
                  console.log("添加---实现---", res.data);
                  if (res.data.status === 200) {
                    //成功
                    this.$parent.http(1); //更新父组件列表数据
                    this.$message({
                      message: "添加用户信息成功",
                      type: "success",
                    });
                    //清空表单
                    this.clearForm();
                  } else {
                    this.$message.error("错了哦，这是一条错误消息");
                  }
                });
            } else {
              console.log("编辑用户信息");
              this.$api
                .updateExpert({
                   id,  
                  username,
                  password,
                  name,
                  sex,
                  email,
                  phone,
                  time,
                  ji,
                  hobby,
                 
                })
                .then((res) => {
                  console.log(res.data);
                  if (res.data.status === 200) {
                    this.$parent.http(1); //更新父组件列表数据
                    this.$message({
                      message: "修改用户信息成功",
                      type: "success",
                    });
                    //清空表单
                    this.clearForm();
                  } else {
                    //修改失败了--
                  }
                });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      /**
       * 清空表单数据列表
       */
      clearForm() {
        this.dialogVisible = false; //1.关闭弹框
        // 清空表单  1 使用element里面的重置表单  2 自己手动初始化goodsForm
        // this.$refs.userForm.resetFields();
         this.expertForm={
                  
                  username:'',
                  password:'',
                  name:'',
                  sex:'',
                  email:'',
                  phone:'',
                  time:'',
                  ji:'',
                  hobby:'',
                
        };
      },   
    },
   };
  </script>
  
  <style lang='less' scoped>
  </style>