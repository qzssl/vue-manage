<template>
  <div class="order">
    <table-form 
           v-bind:tableData="tableData"
           v-bind:count='count'
           @expandChange='expandChange'
           v-on:handleCurrentChange='handleCurrentChange'>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名" >
              <span>{{ props.row.user_name }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ props.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.restaurant_address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="总价格"
        prop="total_amount">
      </el-table-column>
      <el-table-column
        label="订单状态"
        prop="status">
      </el-table-column>
    </table-form>
  </div>
</template>

<script>
import TableForm from '../common/Table.vue'
import { getOrderCount, getOrderList, getShopDetailById, getUserInfo, getAddressById } from '../api/api';
  export default {
    components:{TableForm},
    data() {
      return {
        count:4,
        restaurant_id:null,
        offset: 0,
        limit: 5,
        tableData: [],//表格数据
        expendRow:[],//展开行数据
      }
    },
    created(){
      this.restaurant_id = this.$route.query.restaurant_id;
      this.initData()
    },
    updated(){
      window.console.log("跟新后",this.tableData)

    },
    methods: {
      async initData(){
        try{
          const countData = await getOrderCount(this.restaurant_id);
          if (countData.status == 1) {
              this.count = countData.count;
          }else{
              throw new Error('获取数据失败');
          }
          this.getOrders();
        }catch(err){
          window.console.log('获取数据失败', err);
        }
      },
      async getOrders(){
        const Orders = await getOrderList(this.offset, this.limit,this.restaurant_id);
        // window.console.log(Orders)
        this.tableData = [];
        // this.tableData = [...Orders]
        Orders.forEach((item, index) => {
            const tableData = {};
            tableData.id = item.id;
            tableData.total_amount = item.total_amount;
            tableData.status = item.status_bar.title;
            tableData.user_id = item.user_id;
            tableData.restaurant_id = item.restaurant_id;
            tableData.address_id = item.address_id;
            tableData.index = index;
            this.tableData.push(tableData);
        })
      },
      expandChange(row,expandedRows){
        window.console.log("fu:",row,expandedRows)
        if(expandedRows){
          this.getExpandRowData(row);
        }else{
          const index = this.expandRow.indexOf(row.index)
          this.expandRow.splice(index,1)
        }
      },
      async getExpandRowData(row){
        const restaurant = await getShopDetailById(row.restaurant_id);
        const userInfo = await getUserInfo(row.user_id);
        const addressInfo = await getAddressById(row.address_id);
        this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}});
        this.$nextTick(() => {
            this.expendRow.push(row.index);
        })
        window.console.log(restaurant,userInfo,addressInfo)
      },
      handleCurrentChange(currentPage,offset){
        this.currentPage = currentPage;
        this.offset = offset;
        this.getOrders()
      }
    }
  }
</script>
<style scoped>
 .demo-table-expand {
    font-size: 0;
  }
	.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
	.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>