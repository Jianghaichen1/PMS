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
         <el-form :model="newsForm"
            :rules="newss"
             ref="newsForm" 
             label-width="100px"
              class="demo-newsForm">
              
                  <el-form-item label="名称"  prop="title">
                    <el-input v-model="newsForm.title" label-width="200px"></el-input>
                </el-form-item>
                <el-form-item label="内容"  prop="text">
                    <el-input v-model="newsForm.text" label-width="200px"></el-input>
                </el-form-item>
  
              <el-form-item label="日期" style="margin-left:30px ;"  required>
                  <el-col :span="11">
                  <el-form-item  prop="date">
                      <el-date-picker type="date" placeholder="选择日期" v-model="newsForm.date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                  </el-col>      
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
        default: "添加新闻信息",
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
          newsForm:{
                  id:'',
                  title:'',
                  text:'',
                  date:'',
                
          },
           newss: {
       
            title: [
              {   required: true, message: '请输入标题', trigger: 'blur' }
            ],  
            text: [
              {   required: true, message: '请输入内容', trigger: 'blur' }
            ],
            date: [
             {  required: true, message: '请输入时间', trigger: 'blur' }
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
        this.$refs.newsForm.validate((valid) => {
          if (valid) {
            console.log("获取输入的信息", this.newsForm);
            
            let {
              id,
                  title,
                  text,
                  date,
            } = this.newsForm;
            //判断当前的确定按钮类型：
            if (this.title === "添加新闻信息") {
              console.log("添加新闻信息");
              this.$api
                .addNews({
                  id,
                  title,
                  text,
                  date,
               
                })
                .then((res) => {
                  console.log("添加---实现---", res.data);
                  if (res.data.status === 200) {
                    //成功
                    this.$parent.http(1); //更新父组件列表数据
                    this.$message({
                      message: "添加新闻信息成功",
                      type: "success",
                    });
                    //清空表单
                    this.clearForm();
                  } else {
                    this.$message.error("错了哦，这是一条错误消息");
                  }
                });
            } else {
              console.log("编辑新闻信息");
              this.$api
                .updateNews({
                   id,  
                  title,
                  text,
                  date,
               
                })
                .then((res) => {
                  console.log(res.data);
                  if (res.data.status === 200) {
                    this.$parent.http(1); //更新父组件列表数据
                    this.$message({
                      message: "修改新闻信息成功",
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
        // this.$refs.NewsForm.resetFields();
         this.newsForm={
                  
                 title:'',
                 text:'',
                 dare:'',

        };
      },   
    },
   };
  </script>
  
  <style lang='less' scoped>
  </style>