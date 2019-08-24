<template>
<div class="user">
  <!-- 在el-table-column中用prop属性来对应对象中的键名即可填入数据，
  用label属性来定义表格的列名。可以使用width属性来定义列宽 -->
  <el-table
    :data="tableData"
    stripe
    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    style="width:100%">
    <el-table-column highlight-current-row type="index" width="100"></el-table-column>
    <el-table-column prop="registe_time" label="注册日期" width="220"></el-table-column>
    <el-table-column prop="username" label="用户姓名" width="220"></el-table-column>
    <el-table-column prop="city" label="注册地址"></el-table-column>
  </el-table>
  <div class="pagination" style="text-align:left;margin-top:10px">
    <el-pagination
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
  </div>
</div>   
</template>

<script>
import {getUserList,getUserCount} from '../api/api'

export default {
  components: {},
  data() {
    return {
      tableData:[],
      offset:0,
      limit:10,//每页显示条数
      currentPage:1,//当前页
      count:0
    }
  },
  created() {
    
  },
  mounted(){
    this.initData();
  },
  methods:{
    initData(){
      this.getCount()
      this.getUsers()
    },
    getCount() {
      getUserCount().then(res=>{
        if(res.status === 1){
          this.count = res.count
        }
      })
      .catch(err=>{
        window.console.log(err)
      })
    },
    getUsers() {
      getUserList(this.offset,this.limit).then(res=>{
        this.tableData = [];
        res.forEach(element => {
          const tableData = {}
          tableData.username = element.username
          tableData.registe_time = element.registe_time
          tableData.city = element.city
          this.tableData.push(tableData)
        });
      })
      .catch(err=>{
        window.console.log(err)
      })
    },
    handleCurrentChange(val){
      // window.console.log(val)
      this.currentPage = val;
      this.offset = (val-1)*this.limit;
      this.getUsers();
    }
  }
}
</script>
<style scoped>
.user{
  padding:20px
}
.el-table{
  background-color: #fff;
  border: 1px solid #dfe6ec;
  color: #1f2d3d;
}
</style>