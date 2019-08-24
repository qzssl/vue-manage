<template>
  <div class="table-container">
    <!--expand-change 当用户对某一行展开或者关闭的时候会触发该事件 -->
    <el-table
      :data="tableData"
      :key="currentPage"
      :row-key="row => row.index"
      @expand-change = "expandChange"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width:100%">
      <slot></slot>
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
export default {
  props:{
    tableData:{type:Array,default:()=> {return []}},
    count:{type:Number,default:0},
    limit:{type:Number,default:5}
  },
  data(){
    return {
      currentPage:1,
      offset:0,
    }
  },
  methods:{
    expandChange(row,expandedRows){
      this.$emit('expandChange',row,expandedRows)
    },
    handleCurrentChange(val){
      this.currentPage = val
      this.offset = (val-1)*this.limit
      this.$emit('handleCurrentChange',this.offset)
    }

  }
}
</script>
<style scoped>
.table-container{
  padding: 20px;
}
.table-container .el-table{
  background-color: #fff;
  border: 1px solid #dfe6ec;
  color: #1f2d3d;
}
</style>