<template>
  <div class="home-container">
    <section>
      <h1>数据统计</h1>
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="4">
          <div class="home-data bg-today">
            <span class="data-num">当天数据:</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="home-data bg-gray">
            <span class="data-add">{{userCount}}</span>新增用户
          </div>
        </el-col>
        <el-col :span="4">
          <div class="home-data bg-gray">
            <span class="data-add">{{orderCount}}</span>新增订单
          </div>
        </el-col>
        <el-col :span="4">
          <div class="home-data bg-gray">
            <span class="data-add">{{adminCount}}</span>新增管理员
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="home-data bg-total">
            <span class="data-num">总数据:</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="home-data bg-gray">
            <span class="data-add">{{allUserCount}}</span>注册用户
          </div>
        </el-col>
        <el-col :span="4">
          <div class="home-data bg-gray">
            <span class="data-add">{{allOrderCount}}</span>订单
          </div>
        </el-col>
        <el-col :span="4">
          <div class="home-data bg-gray">
            <span class="data-add">{{allAdminCount}}</span>管理员
          </div>
        </el-col>
      </el-row>
    </section>
    <div class="trend">
      <chart :sevenDate='sevenDate' :sevenDay='sevenDay'></chart>
    </div>
  </div>
</template>

<script>
import chart from '../common/Tendency.vue'
import {userCount,orderCount,adminCount,getUserCount,getOrderCount,getAdminCount} from '../api/api'
import dtime from 'time-formater'

export default {
  components: {chart},
  data() {
    return {
      userCount:0,
      orderCount:0,
      adminCount:0,
      allUserCount:0,
      allOrderCount:0,
      allAdminCount:0,
      sevenDay: [],
      sevenDate: [[],[],[]],
    }
  },
  mounted() {
    this.initData();
    for(let i=6;i>-1;i--){
      const date = dtime(new Date().getTime()-84600000*i).format('YYYY-MM-DD');
      this.sevenDay.push(date)
    }
    this.getSevenData();
  },
  methods:{
    initData(){
      const today = dtime(new Date()).format('YYYY-MM-DD')
      Promise.all([
        userCount(today),
        orderCount(today),
        adminCount(today),
        getUserCount(),
        getOrderCount(),
        getAdminCount()
      ])
      .then((res)=>{
        this.userCount = res[0].count;
        this.orderCount = res[1].count;
        this.adminCount = res[2].count;
        this.allUserCount = res[3].count;
        this.allOrderCount = res[4].count;
        this.allAdminCount = res[5].count;
      })
      .catch((err)=>{
        window.console.log(err)
      })
    },
    getSevenData() {
      const apiArr = [[],[],[]];
      this.sevenDay.forEach(item=>{
        apiArr[0].push(userCount(item))
        apiArr[1].push(orderCount(item))
        apiArr[2].push(adminCount(item))
      })

      const promiseArr = [...apiArr[0],...apiArr[1],...apiArr[2]]

      Promise.all(promiseArr).then(res=>{
        const resArr = [[],[],[]];
        res.forEach((item,index)=>{
          if(item.status === 1){
            resArr[Math.floor(index/7)].push(item.count)
          }
        })
        this.sevenDate = resArr;
      })
      .catch(err=>{
        window.console.log(err)
      })
    }
  }
}
</script>
<style scoped>
section {
  padding: 20px;
  margin-bottom: 40px;
}
.home-container h1 {
  font-size: 30px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 400;
}
.el-col-4 {
  padding: 0 10px;
}
.home-data {
  font-size: 14px;
  color: #666;
  text-align: center;
  border-radius: 6px;
  padding: 4px 0;
}
.bg-today {
  background: #ff9800;
}
.bg-gray {
  background: #e5e9f2;
  padding: 0;
}
.bg-total {
  background: #20a0ff;
}
.data-num {
  font-size: 22px;
  color: #fff;
}
.data-add {
  font-size: 26px;
  color: #333;
}
</style>