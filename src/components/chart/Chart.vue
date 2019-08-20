<template>
  <div class="line">
    <div ref="line" style="width:90%;height:450px"></div>
  </div>
</template>

<script>
//按需 引入echarts主模块
import echarts from 'echarts/lib/echarts'
//引入柱状图和折线图
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
//引入提示框和标题组件
import 'echarts/lib/component/tooltip' //气泡提示框，鼠标悬浮交互时的信息提示,常用于展现更详细的数据
import 'echarts/lib/component/title' //标题，每个图表最多仅有一个标题控件，每个标题控件可设主副标题
import 'echarts/lib/component/legend' //图例，每个图表最多仅有一个图例,表述数据和图形的关联
import 'echarts/lib/component/toolbox' //辅助工具箱，辅助功能，如添加标线，框选缩放等
import 'echarts/lib/component/markPoint' //系列中的数据标注内容

export default {
  components: {},
  props: ['sevenDate', 'sevenDay'],
  mounted() {
    this.myChart = echarts.init(this.$refs.line);
    this.initData();
  },
  methods: {
    initData() {
      const colors = ['#5793f3', '#675bba', '#d14a61'];
      const option = {
        color:colors,
        title:{text:'走势图',subtext:''},
        tooltip:{trigger:'axis'},
        legend:{data:['新注册用户','新增订单','新增管理员']},
        toolbox:{
          show:true,
          feature:{
            dataZoom:{yAxisIndex:'none'},
            dataView:{readOnly:false},
            magicType:{type:['bar','line']},
            restore:{},
          }
        },
        //横坐标
        xAxis:{type:'category',boundaryGap:false,data:this.sevenDay},
        yAxis:[
          {
            type:'value',
            name:'用户',
            min:0,
            max:200,
            position:'left',
            axisLine:{lineStyle:{color:'#999'}},
            axisLabel:{formatter:'{value}'}
          },
          {
            type:'value',
            name:'订单',
            min:0,
            max:200,
            position:'right',
            axisLine:{lineStyle:{color:'#999'}},
            axisLabel:{formatter:'{value}'}
          }
        ],
        series:[
          {
            name:'新注册用户',
            type:'line',
            data:this.sevenDate[0],
            yAxisIndex:1,
            markPoint:{
              data:[
                {type:'max',name:'最大值'},
                {type:'min',name:'最小值'}
              ]
            }
          },
          {
            name:'新增订单',
            type:'line',
            data:this.sevenDate[1],
            yAxisIndex: 1,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
          },
          {
            name:'新增管理员',
            type:'line',
            data:this.sevenDate[2],
            yAxisIndex: 1,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
          }
        ]
      }
      this.myChart.setOption(option)
    }
  },
  watch: {
    sevenDate: function (){
        this.initData()
    },
    sevenDay: function (){
        this.initData()
    }
  }
}
</script>
<style scoped>
.line{
    display: flex;
    justify-content: center;
}
</style>