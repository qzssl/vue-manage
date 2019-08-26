<template>
  <div class="add-shop">
    <el-row style="margin-top:12px">
      <el-col :span="12" :offset="4">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-form">
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <search-address v-on:address="formData.address" v-on:addressSelect="addressSelect"></search-address>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="formData.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="description">
            <el-input v-model="formData.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语" prop="promotion_info">
            <el-input v-model="formData.promotion_info"></el-input>
          </el-form-item>
          <category v-bind:selectedCategory="selectedCategory" v-on:handleChange="handleChange"></category>
          <el-form-item label="店铺特点" style="white-space: nowrap;">
            <span>品牌保证</span>
            <el-switch  v-model="formData.is_premium"></el-switch>
            <span>蜂鸟专送</span>
            <el-switch v-model="formData.delivery_mode"></el-switch>
            <span>新开店铺</span>
            <el-switch v-model="formData.new"></el-switch>
          </el-form-item>
          <el-form-item style="white-space: nowrap;">
            <span>外卖保</span>
            <el-switch v-model="formData.bao"></el-switch>
            <span>准时达</span>
            <el-switch v-model="formData.zhun"></el-switch>
            <span>开发票</span>
            <el-switch v-model="formData.piao"></el-switch>
          </el-form-item>
          <el-form-item label="配送费" prop="float_delivery_fee">
            <el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价" prop="float_minimum_order_amount">
            <el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-picker
              v-model="formData.startTime"
              :picker-options="{
                start:'05:30',
                step:'00:15',
                end:'23:30'
              }"
              placeholder="起始时间">
            </el-time-picker>
            <el-time-picker
              arrow-control
              v-model="formData.endTime"
              :picker-options="{
                start: '05:30',
                step: '00:15',
                end: '23:30',
                minTime: formData.startTime
              }"
              placeholder="结束时间">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="上传店铺头像">
            <upload v-bind:actionUrl="actionUrl"></upload>
          </el-form-item>
          <el-form-item label="上传营业执照">
            <upload v-bind:actionUrl="actionUrl"></upload>
          </el-form-item>
          <el-form-item label="上传餐饮服务许可证">
            <upload v-bind:actionUrl="actionUrl"></upload>
          </el-form-item>
          <el-form-item label="优惠活动">
            <el-select v-model="activityValue" @change="selectActivity" :placeholder="activityValue">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
						</el-select>
          </el-form-item>
          <el-table 
            :data="activities"
            style="min-width:600px;margin-bottom:20px;"
            align="center"
            :row-class-name="tableRowClassName"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
            <el-table-column
              prop="icon_name"
              label="活动标题"
              align="center"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="活动名称"
              align="center"
              width="120">
            </el-table-column>
            <el-table-column
              prop="description"
              align="center"
              label="活动详情">
            </el-table-column>
            <el-table-column
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button 
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>      
          </el-table>
          <el-form-item class="button-submit">
            <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchAddress from '../common/Address.vue'
import Category from '../common/Categories.vue'
import Upload from '../common/Upload.vue'
import '../../../config/config'
import { addShop } from '../api/api';

export default {
  components: {SearchAddress,Category,Upload},
  data(){
    return {
      actionUrl:'/v1/addimg/shop',
      formData:{
        name:'',//店铺名称
        address:'',//地址
        latitude:'',
        longitude:'',
        description: '', //介绍
        phone: '',
        promotion_info:'',//店铺标语
        float_delivery_fee: 5, //运费
        float_minimum_order_amount: 20, //起价
        is_premium: true,//品牌保证
        delivery_mode:true,//蜂鸟专送
        new:true,//新开店铺
        bao:true,//外卖保
        zhun:true,//准时到达
        piao:true,//开发票
        startTime:'',
        endTime:'',
        image_path:'',//店铺头像
        business_license_image:'',//营业执照
        catering_service_license_image:''//餐饮服务许可证
      },
      rules:{
        name:[{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: ['blur','change'] }],
        phone: [
					{ required: true, message: '请输入联系电话' },
					{ type: 'number', message: '电话号码必须是数字' }
        ],
      },
      options:[
        {value: '满减优惠',label: '满减优惠',title:'减'}, 
        {value: '优惠大酬宾',label: '优惠大酬宾',title:'特'}, 
        {value: '新用户立减',label: '新用户立减',title:'新'}, 
        {value: '进店领券',label: '进店领券',title:'领'}
      ],
      activityValue:'满减优惠',//选择框选中的值
      activities:[ //表格优惠活动内容
        {icon_name: '减',name: '满减优惠',description: '满30减5，满60减8',}
      ],
      selectedCategory: ['快餐便当', '简餐'], //店铺分类选中值
    }
  },
  methods:{
    //下拉框优惠活动选择值
    selectActivity(){
      this.$prompt('请输入活动详情','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消'
      }).then(({value}) => {
        if(value == null){
          this.$message({
            type:'info',
            message:'请输入活动详情'
          })
          return
        }
        let newObj = {}
        this.options.forEach(item => {
          if(Object.is(item.value,this.activityValue)){
            newObj= {icon_name: item.title,name: item.value,description: value,}
          }
        });
        this.activities.push(newObj);
      })
      .catch(()=>{
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      })
    },
    tableRowClassName(row) {
      if (row.rowIndex === 1) {
        return 'info-row';
      } else if (row.rowIndex === 3) {
        return 'positive-row';
      }
      return '';
    },
    //选择地址
    addressSelect(val){
      const { address, latitude, longitude } = val;
      // this.formData = {address,latitude,longitude};
      this.formData.address = address;
      this.formData.latitude = latitude;
      this.formData.longitude = longitude;
      window.console.log(val)
    },
    //选择分类
    handleChange(val){
      this.selectedCategory = [...val]
      // window.console.log(this.selectedCategory)
    },
    submitForm(formData){
      this.$refs[formData].validate(async volid=>{
        window.console.log("验证",volid)
        if(volid){
          Object.assign(this.formData,{activities:this.activities},
          {category:this.selectedCategory.join('/')})
          try{
            let result = await addShop(this.formData);
            if(result.status === 1){
              this.$message({
                type:'success',
                message:'添加成功'
              });
              this.formData = {
                name: '', //店铺名称
                address: '', //地址
                latitude: '',
                longitude: '',
                description: '', //介绍
                phone: '',
                promotion_info: '',
                float_delivery_fee: 5, //运费
                float_minimum_order_amount: 20, //起价
                is_premium: true,
                delivery_mode: true,
                new: true,
                bao: true,
                zhun: true,
                piao: true,
                startTime: '',
                endTime: '',
                image_path: '',
                business_license_image: '',
                catering_service_license_image: '',
              };
              this.selectedCategory = ['快餐便当', '简餐'];
              this.activities = [{
                icon_name: '减',
                name: '满减优惠',
                description: '满30减5，满60减8',
              }];
            }else{
              this.$message({
                type:'error',
                message:result.message
              })
            }
          }catch(err){
            window.console.log(err)
          }
        }else{
          this.$notify.error({
            title: '错误',
            message: '请检查输入是否正确',
            offset: 100
					});
					return false;
        }
      })
    },
    handleDelete(index){
      this.activities.splice(index,1)
    }
  }
}
</script>
<style scoped>
.button-submit{
  text-align: center;
}
</style>    
<style>
.el-table{
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  border: 1px solid #dfe6ec;
  font-size: 14px;
  color: #1f2d3d;
}
.demo-form .el-switch{
  margin:0 5px;
  height: 22px;
}
.demo-form .el-input-number__decrease{
  /* border-radius: 4px 0 0 4px; */
  border-left: 1px solid #DCDFE6;
  border-radius: 0%;
  right: 42px;
  left: inherit;
}
.demo-form .el-input__inner{
  padding-left: 15px;
  padding-right: 100px;
  text-align: left;
}
.demo-form .el-date-editor{
  width: 193px;
}
.demo-form .el-date-editor:last-child{
  margin-left: 5px;
}
.demo-form .el-input__prefix{
  left: inherit;
  right: 5px;
}
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}
</style>