
<template>
  <div class="admin">
    <table-form 
      v-bind:tableData="tableData"
      v-bind:count='count'
      v-bind:limit="limit"
      v-on:handleCurrentChange='handleCurrentChange'>
      <el-table-column label="姓名" prop="user_name">
      </el-table-column>
      <el-table-column label="注册日期" prop="create_time"></el-table-column>
      <el-table-column label="地址" prop="city"></el-table-column>
      <el-table-column label="权限" prop="admin"></el-table-column>
    </table-form>
  </div>
</template>

<script>
import TableForm from '../common/Table'
import { getAdminCount, getAdminList } from '../api/api';
export default {
  components: {TableForm},
  data(){
    return {
      count:0,
      tableData:[],
      offset:0,
      limit:20,
    }
  },
  created(){
    this.initData()
  },
  methods:{
    async initData(){
      try{
        const res =  await getAdminCount();
        if(res.status === 1){
          this.count = res.count
          this.getAdmin()
        }else{
          this.$message({
            type:'error',
            message:'获取数据失败'
          })
        }
      }catch(err){
        throw new Error('获取数据失败',err)
      }
    },
    async getAdmin(){
      const admin = await getAdminList(this.offset,this.limit)
      window.console.log(admin)
      this.tableData = [];
      if(admin.status === 1){
        admin.data.forEach((item,index)=>{
          const tableData = {}
          tableData.user_name = item.user_name
          tableData.create_time = item.create_time
          tableData.city = item.city
          tableData.admin = item.admin
          tableData.index = index
          this.tableData.push(tableData)
        })
      }else{
        this.$message({
          type:'error',
          message:'获取数据失败'
        })
      }
      
    },
    handleCurrentChange(offset){
      this.offset = offset
      this.getAdmin()
    }
  }
}
</script>
<style scoped>
</style>