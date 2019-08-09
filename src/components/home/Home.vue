<template>
  <div class="home-container">
    <h1>数据统计</h1>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="4">
        <div class="home-data bg-today">
          <span class="data-num">当天数据:</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="home-data bg-gray">
          <span class="data-add">61</span>新增数据
        </div>
      </el-col>
      <el-col :span="4">
        <div class="home-data bg-gray">
          <span class="data-add">16</span>新增订单
        </div>
      </el-col>
      <el-col :span="4">
        <div class="home-data bg-gray">
          <span class="data-add">78</span>新增管理员
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
          <span class="data-add">34280</span>注册用户
        </div>
      </el-col>
      <el-col :span="4">
        <div class="home-data bg-gray">
          <span class="data-add">11052</span>订单
        </div>
      </el-col>
      <el-col :span="4">
        <div class="home-data bg-gray">
          <span class="data-add">48339</span>管理员
        </div>
      </el-col>
    </el-row>
    <div class="trend">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>
<style scoped>
.home-container {
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