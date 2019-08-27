<template>
  <div class="chart">
    <div ref="chartpie" class="chartpie" style="width:90%;height:450px;"></div>
  </div>
</template>
<script>
  import echart from 'echarts/lib/echarts'
  //引入饼图
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
import { getUserCity } from '../api/api';
  export default {
    data(){
      return{
        pieData:{}
      }
    },
    created(){
      
    },
    mounted(){
      this.myChart = echart.init(this.$refs.chartpie)
      this.initData()
    },
    methods:{
      async initData(){
        try{
          const res = await getUserCity();
          if (res.status == 1) {
            this.pieData = res.user_city;
          }else{
            throw new Error(res)
          }
        }catch(err){
          window.console.log('获取用户分布信息失败',err);
        }
        const option = {
          title:{text:'用户分布',subtext:'',x:'center'},
          tooltip : {trigger: 'item',formatter: "{a} <br/>{b} : {c} ({d}%)"},
          legend: {orient: 'vertical',left: 'left',data: ['北京','上海','深圳','杭州','其他']},
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:this.pieData.beijing, name:'北京'},
                {value:this.pieData.shanghai, name:'上海'},
                {value:this.pieData.shenzhen, name:'深圳'},
                {value:this.pieData.hangzhou, name:'杭州'},
                {value:this.pieData.qita, name:'其他'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        this.myChart.setOption(option)
      }
    },
    watch:{
      pieData(){
        this.initData()
      }
    }
  }
</script>
<style scoped>

</style>