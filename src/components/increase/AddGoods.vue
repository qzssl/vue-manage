<template>
  <div class="add-goods">
    <el-row style="margin-top:20px">
      <el-col :span="14" :offset="4">
        <header class="category-header">选择食品种类</header>
        <el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="category-form">
          <el-row class="category-select">
            <el-form-item label="食品种类">
                <el-select v-model="selectCategory" style="width:100%">
                  <el-option
                    v-for="(item,index) in category"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-row>
          <el-row :class="editVisible?'showEdit':''" class="category-edit">
            <div class="add-category">
              <el-form-item label="食品种类" prop="name">
                <el-input v-model="categoryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="种类描述" prop="description">
                <el-input v-model="categoryForm.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addCategory('categoryForm')">提交</el-button>
              </el-form-item>
            </div>
          </el-row>
          <div class="category-button" @click="showButton">
            <i :class="editVisible?'el-icon-caret-top':'el-icon-caret-bottom'" class="edit_icon"></i>
            <span>添加食品种类</span>
          </div>
        </el-form>
      </el-col>
      <el-col :span="14" :offset="4">
        <header class="category-header">添加食品</header>
        <el-form :model="foodForm" ref="foodForm" :rules="foodRules" label-width="110px" class="food-form">
          <el-form-item label="食品名称" prop="name">
            <el-input v-model="foodForm.name"></el-input>
          </el-form-item>
          <el-form-item label="食品活动" prop="activity">
            <el-input v-model="foodForm.activity"></el-input>
          </el-form-item>
          <el-form-item label="食品详情" prop="description">
            <el-input v-model="foodForm.description"></el-input>
          </el-form-item>
          <el-form-item label="上传食品图片" prop="image_path">
            <upload v-bind:actionUrl = "actionUrl" v-on:handleAvatarSuccess="successUploadImage"></upload>
          </el-form-item>
          <el-form-item label="食品特点">
            <el-select v-model="foodForm.attributes" multiple placeholder="请选择" @change="selectAttributes">
              <el-option
                v-for="(item, index) in attributes"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品规格">
            <el-radio class="radio" v-model="foodSpecs" label="one">单规格</el-radio>
            <el-radio class="radio" v-model="foodSpecs" label="more">多规则</el-radio>
          </el-form-item>
          <el-row v-if="foodSpecs == 'one'" >
            <el-form-item label="包装费">
              <el-input-number v-model="foodForm.foodSpecs[0].packing_fee" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number v-model="foodForm.foodSpecs[0].price" :min="0" :max="10000"></el-input-number>
            </el-form-item>
          </el-row>
          <el-row v-else>
            <specs v-bind:position="'top'" v-bind:specsTable="foodForm.foodSpecs"
            v-on:delectSpecs="delectSpecs" v-on:addSpecs="addSpecs"></specs>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="addFood('foodForm')">确认添加食品</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCategory, addCategory, addFood } from '../api/api';
import Upload from '../common/Upload.vue'
import Specs from '../common/Specs.vue'
export default {
  components: { Upload, Specs },
  data(){
    return {
      actionUrl:'/v1/addimg/food',
      categoryForm:{
        description:"",//种类描述
        name:"",//种类名称
        restaurant_id:""//店铺id
      },
      category:[],//种类选项
      selectCategory:'',//选中的种类
      editVisible:false,//是否显示种类
      foodForm:{
        name:'',//食品名称
        description:'',//食品详情
        activity:'',//食品活动
        image_path:'',//食品图片
        attributes:[],//食品特点
        foodSpecs:[{specs: '默认',packing_fee: 0,price: 20}],//食品规格
      },
      foodRules:{ //规则
        name:[{required:true,message:'请输入食品名称',trigger:'blur'}]
      },
      attributes:[{value:'新',label:'新品'},{value:'招牌',label:'招牌'}],
      foodSpecs:'one',
    }
  },
  created(){
    const that = this;
    if(this.$route.query.restaurant_id){
      this.categoryForm.restaurant_id = this.$route.query.restaurant_id;
    }else{
      this.categoryForm.restaurant_id = Math.ceil(Math.random()*10);
      this.$msgbox({
        title:'提示',
        message:'添加食品需要选择一个商铺，现在就去选择商铺吗？',
        showCancelButton:true,
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        beforeClose:(action, instance, done) => {
          if(Object.is(action,'confirm')){
            that.$router.push('/shopList');
            done();//关闭
          }else{
            done();
          }
        }
      }).catch(()=>{ //取消按钮
        this.$message({
          type:'info',
          message:'取消'
        });
      })
    }
    this.initData()
  },
  methods:{
    async initData(){
      const result = await getCategory(this.categoryForm.restaurant_id);
      if(result.status === 1){
        this.category = [...result.category_list]
      }else{
        throw new Error(result)
      }
    },
    //隐藏或显示食品种类
    showButton(){
      this.editVisible = !this.editVisible;
    },
    //添加食品种类
    addCategory(categoryForm){
      this.$refs[categoryForm].validate(async (valid)=>{
        if(valid){
          try{
            const result = await addCategory(this.categoryForm)
            if(result.status === 1){
              this.initData()
              this.categoryForm.name = '';
              this.categoryForm.description = '';
              this.editVisible = false;
              this.$message({
                type:'success',
                message:'添加成功'
              })
            }else{
              this.$message({
                type:'error',
                message:result.message
              })
            }
          }catch(err){
            this.$message({
              type:'error',
              message:err
            })
          }
          
        }
      })
    },
    //上传图片
    successUploadImage(res){
      // window.console.log(res)
      this.categoryForm.image_path = res.image_path
    },
    //选择食品特点
    selectAttributes(val){
      this.foodForm.attributes = [...val]
    },
    //删除规格
    delectSpecs(index){
      this.foodForm.foodSpecs.splice(index,1)
    },
    //添加规格
    addSpecs(specsForm){
      this.foodForm.foodSpecs.push({...specsForm})
    },
    //确认添加食品
    async addFood(formName){
      this.$refs[formName].validate(async (volid) => {
        if(volid){
          let category_id = ''
          this.category.forEach(item=>{
            if(Object.is(item.name,this.selectCategory)){
              category_id = item.id
              return false
            }
          })
          const params = {
						...this.foodForm,
						restaurant_id: this.categoryForm.restaurant_id,
          }
          if(category_id){
            params['category_id'] = category_id
          }
          try{
            const result = await addFood(params)
            if (result.status == 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              this.foodForm = {
                name: '',
                description: '',
                image_path: '',
                activity: '',
                attributes: [],
                specs: [{specs: '默认',packing_fee: 0,price: 20,}],
              }
            }else{
              this.$message({
                type: 'error',
                message: result.message
              });
            }
          }catch(err){
            window.console.log(err)
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.category-header{
  text-align: center;
  margin-bottom: 10px;
}
.category-form{
  min-width: 400px;
  margin-bottom: 30px;
}
.category-form:hover{
  box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
  border-radius: 6px;
  transition: all .4s;
}
.category-select{
  border:1px solid #eaeefb;
  padding:10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.category-button{
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all .4s;
}
.category-button:hover{
  background: #f9fafc;
}
.category-button:hover .span,.category-button:hover .edit_icon{
  color:#20a0ff;
}
.category-button span{
  font-size: 14px;
  color:#999;
}
.category-button .edit_icon{
  color:#ccc;
  transition: all 400ms;
}
.category-edit{
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
  
}
.showEdit{
  height: 185px;
}
.add-category{
  padding: 10px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
}
.food-form .el-input-number__decrease{
  border-left: 1px solid #DCDFE6;
  border-radius: 0%;
  right: 42px;
  left: inherit;
}
.food-form .el-input__inner{
  padding-left: 15px;
  padding-right: 100px;
  text-align: left;
}
</style>