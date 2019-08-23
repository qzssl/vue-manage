<template>
  <div class="foods">
    <!--expand-change 当用户对某一行展开或者关闭的时候会触发该事件 -->
    <el-table 
    :data="tableData"
    :row-key="row => row.index"
    @expand-change = "expandChange"
    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    style="width:100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ scope.row.name }}</span>
            </el-form-item>
            <el-form-item label=" 餐馆名称">
              <span>{{ scope.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="食品 ID">
              <span>{{ scope.row.item_id }}</span>
            </el-form-item>
            <el-form-item label="餐馆 ID">
              <span>{{ scope.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ scope.row.description }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ scope.row.restaurant_address }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ scope.row.rating }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ scope.row.category_name }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ scope.row.month_sales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="食品名称" prop="name"></el-table-column>
      <el-table-column label="食品介绍" prop="description"></el-table-column>
      <el-table-column label="评分" prop="rating"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
    </div>
    <el-dialog title="修改食品信息" :visible.sync="dialogVisible">
      <el-form :model="selectTable" label-width="100px">
        <el-form-item label="食品名称">
          <el-input v-model="selectTable.name"></el-input>
        </el-form-item>
        <el-form-item label="食品介绍">
          <el-input v-model="selectTable.description"></el-input>
        </el-form-item>
        <el-form-item label="食品分类">
          <el-select
            @change="handleSelect"
            @visible-change="handleChange"
            v-model="selectIndex" 
            placeholder="请选择">
            <el-option v-for="(item,index) in selectCategory" :key="index" :label="item.name" :value="item.name">{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品图片">
          <el-upload
            :action="baseUrl+'/v1/addimg/food'"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            class="avatar-uploader">
            <img v-if="selectTable.image_path" :src="baseImgPath+selectTable.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-table :data="specs" style="margin-bottom:20px" :row-class-name="tableRowClassName" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column label="规格" prop="specs">
        </el-table-column>
        <el-table-column label="包装费" prop="packing_fee">
        </el-table-column>
        <el-table-column label="价格" prop="price">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="delectSpecs(scope.$index)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="specs-add">
        <el-button
        type="primary"
        @click="specsVisible = true"
        style="margin-bottom: 10px;"
      >添加规格</el-button>
      </div>
      <div class="specs-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateFood">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加规格" :visible.sync="specsVisible">
      <el-form :model="specsForm" :rules="specsRules" ref="specsForm" class="demo-ruleForm">
        <el-form-item label="规格" prop="specs" label-width="100px">
          <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装费" label-width="100px">
          <el-input-number :min="0" :max="100" v-model="specsForm.packing_fee"></el-input-number>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input-number :min="0" :max="10000" v-model="specsForm.price"></el-input-number>
        </el-form-item>
        <div class="specs-footer">
          <el-button @click="specsVisible = false">取消</el-button>
          <el-button type="primary" @click="addSpecs('specsForm')">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getFoodsCount, getFoods, getShopDetailById, getCategoryById, getMenu, updateFood, deleteFood } from '../api/api';
import '../../../config/config'
import config from '../../../config/config';
export default {
  components: {},
  data() {
    return {
      baseUrl:config.baseUrl,
      baseImgPath:config.baseImgPath,
      tableData:[],offset:0,limit:5,
      count:0,
      restaurant_id:null,//店铺id
      expandRow:[], //展开行数据
      selectTable:{}, // 食品信息
      currentPage:1,
      dialogVisible:false,//控制弹框是否显示
      selectCategory:[],//分类
      selectIndex:null,
      specsVisible:false,//控制规格是否显示
      specsForm:{
        specs:'',
        packing_fee:0,
        price:20,
      },//规格
      specsRules:{
        specs:[
           {required:true,message:'请输入规格',trigger:'blur'},
        ]
      },//表单规格验证规则
    }
  },
  created(){
    this.restaurant_id = this.$route.query.restaurant_id
    this.initData()
  },
  computed: {
    //规格
    specs() {
      let specs = [];
      if(this.selectTable.specfoods){
        this.selectTable.specfoods.forEach(item => {
          specs.push({
            specs:item.specs_name,
            packing_fee:item.packing_fee,
            price:item.price
          })
        })
      }
      return specs
    }
  },
  methods: {
    async initData(){
      try{
        const count = await getFoodsCount(this.restaurant_id)
        if(count.status === 1){
          this.count = count.count
        }else{
          throw new Error('获取数据失败')
        }
        this.getFoods()
      }catch(err){
        window.console.log('获取数据失败',err)
      }
    },
    async getFoods(){
      const foods = await getFoods(this.offset,this.limit,this.restaurant_id)
      this.tableData = [];
      foods.forEach((item, index) => {
          const tableData = {};
          tableData.name = item.name;
          tableData.item_id = item.item_id;
          tableData.description = item.description;
          tableData.rating = item.rating;
          tableData.month_sales = item.month_sales;
          tableData.restaurant_id = item.restaurant_id;
          tableData.category_id = item.category_id;
          tableData.image_path = item.image_path;
          tableData.specfoods = item.specfoods;
          tableData.index = index;
          this.tableData.push(tableData);
      })
    },
    //对某一行展开或者关闭的时候会触发该事件
    expandChange(row,expandedRows){
      if(expandedRows){
        this.getExpandRowData(row);
      }else{
        const index = this.expandRow.indexOf(row.index)
        this.expandRow.splice(index,1)
      }
    },
    async getExpandRowData(row){
      const shop = await getShopDetailById(row.restaurant_id)
      const category = await getCategoryById(row.category_id)
      this.selectTable = {...row,...{restaurant_name: shop.name, restaurant_address: shop.address,category_name:category.name}}
      this.tableData.splice(row.index,1,{...this.selectTable})
      this.$nextTick(() => {
        this.expandRow.push(row.index)
      })
    },
    //下拉框出现/隐藏时触发，出现则为 true，隐藏则为 false
    async handleChange(val) {
      if(!val){
        return
      }
      const menu = await getMenu(this.selectTable.restaurant_id)
      this.selectCategory = [...menu]
    },
    //选择品类列表
    handleSelect(index){
      this.selectIndex = index
    },
    //点击编辑
    handleEdit(index,row){
      this.dialogVisible = true
      this.getExpandRowData(row)
    },
    //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    tableRowClassName(index){
      if (index === 1) {
        return 'info-row';
      } else if (index === 3) {
        return 'positive-row';
      }
      return '';
    },
    //图片上传成功
    handleUploadSuccess(res){
      if(res.status === 1){
        this.selectTable.image_path = res.image_path;
      }else{
        this.$message.error("上传图片失败")
      }
    },
    //图片上传之前
    beforeUpload(file){
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    //删除规格
    delectSpecs(index) {
      this.specs.splice(index, 1);
    },
    //添加规格
    addSpecs(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) { //验证通过
          this.specs.push({...this.specsForm});
          this.specsForm = {specs:'',packing_fee:0,price:20};
          this.specsVisible = false
        } else {
          return false;
        }
      });
    },
    //编辑确定按钮
    async updateFood() {
      this.dialogVisible = false;
      try{
        const subData = {
          new_category_id:this.selectTable.category_id,
          specs:this.specs
        } 
        const postData = {...this.selectTable,...subData}
        const res = await updateFood(postData);
        if(res.status === 1){
          this.$message({
            type: "success",
            message: res.success
          })
          this.getFoods();
        }else{
          this.$message({
            type: "error",
            message: res.message
          });
        }
      }catch(err){
        window.console.log("更新餐馆信息失败", err)
      }
    },
    //删除食品列表
    async handleDelete(index,row){
      try{
        const del = await deleteFood(row.item_id)
        if (del.status == 1) {
          this.$message({
            type: "success",
            message: "删除食品成功"
          });
          this.tableData.splice(index, 1);
        } else {
          throw new Error(del.message);
        }
      }catch(err){
        this.$message({
          type: 'error',
          message: err.message
        });
      }
    },
    //分页
    handleCurrentChange(val){
      this.currentPage = val
      this.offset = (val-1)*this.limit
      this.getFoods()
    }
  }
}
</script>
<style>
.foods{
  padding:20px
}
.el-table{
  background-color: #fff;
  border: 1px solid #dfe6ec;
  color: #1f2d3d;
}
.demo-table-expand{
  font-size:0;
}
.demo-table-expand label{
  width: 90px;
  color:#99a9bf;
}
.demo-table-expand .el-form-item{
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.page{
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover{
  background-color: #20a0ff;
}
.avatar-uploader-icon{
  font-size: 28px;
  color:#8c939d;
  width:120px;
  height:120px;
  line-height: 120px;
  text-align: center;
}
.avatar{
  width:120px;
  height:120px;
  display: block;
}
.specs-add{
  text-align: center;
}
.demo-ruleForm .el-input-number__decrease{
  /* border-radius: 4px 0 0 4px; */
  border-left: 1px solid #DCDFE6;
  border-radius: 0%;
  right: 42px;
  left: inherit;
}
.demo-ruleForm .el-input__inner{
  padding-left: 15px;
  padding-right: 100px;
  text-align: left;
}
.specs-footer{
  text-align: right;
  margin-top: 30px;
}
</style>