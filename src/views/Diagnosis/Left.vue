<template>
     
    <div class="left"> 
        <el-table
            :data="tableData"
            style="width: 100%"
            max-height="250">
        
            <el-table-column
            prop="name"
            label="姓名"
            width="120">
            </el-table-column>
            <el-table-column
            fixed="right"
            width="120">
            <template slot-scope="scope">
                <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                移除
                </el-button>
            </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    data() {
      return {
        
       
      }
    }
  }
</script>
<style>
.left{
    width: 200px;
    height:200px;
  }
</style>