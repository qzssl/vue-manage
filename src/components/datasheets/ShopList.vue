<template>
<div class="shop">
  <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
  <!-- 通过设置 type="expand" 和 Scoped slot 可以开启展开行功能，el-table-column 的模板会被渲染成为展开行的内容，
  展开行可访问的属性与使用自定义列模板时的 Scoped slot 相同 -->
  <el-table 
    :data="tableData"
    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    style="width:100%">
    <el-table-column 
      type="expand">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="店铺名称">
            <span>{{ scope.row.name }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ scope.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品介绍">
            <span>{{ scope.row.description }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ scope.row.id }}</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <span>{{ scope.row.phone }}</span>
          </el-form-item>
          <el-form-item label="评分">
            <span>{{ scope.row.rating }}</span>
          </el-form-item>
          <el-form-item label="销售量">
            <span>{{ scope.row.recent_order_num }}</span>
          </el-form-item>
          <el-form-item label="分类">
            <span>{{ scope.row.category }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="店铺名称"
      prop="name">
    </el-table-column>

    <el-table-column
      label="店铺地址"
      prop="address">
    </el-table-column>

    <el-table-column
      label="店铺介绍"
      prop="description">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button 
          size="mini"
          @click="handleAdd(scope.$index,scope.row)">添加食品</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="Pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
  </div>
  <!-- 编辑框 -->
  <el-dialog title="修改店铺信息" :visible.sync="dialogVisible">
    <el-form :model="selectTable">
      <el-form-item label="店铺名称" label-width="100px">
        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" label-width="100px">
        <!-- el-autocomplete 是一个可带输入建议的输入框组件
        fetch-suggestions 是一个返回输入建议的方法属性 -->
        <el-autocomplete 
          v-model="address.address"
          :fetch-suggestions="querySearchAsync" 
          placeholder="请输入地址"
          style="width:100%"
          :debounce=0
          @select="addressSelect">
        </el-autocomplete>
        <span>当前城市：{{ city.name }}</span>
      </el-form-item>
      <el-form-item label="店铺介绍" label-width="100px">
        <el-input v-model="selectTable.description"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="selectTable.phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类" label-width="100px">
        <el-cascader
          :options="categoryOptions"
          v-model="selectedCategory"
          change-on-select
        ></el-cascader>
      </el-form-item>
      <el-form-item label="商铺图片" label-width="100px">
        <upload
          v-bind:actionUrl="actionUrl"
          v-bind:imageUrl="selectTable.image_path"
          v-on:handleAvatarSuccess="handleServiceAvatarScucess"></upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateShop">确 定</el-button>
    </div>
  </el-dialog>
</div>   
</template>
<script>
import { cityGuess, shopCount, getShopList, foodCategory, searchplace, updateShop, deleteShop } from '../api/api';
import Upload from '../common/Upload.vue'
import '../../../config/config'
import config from '../../../config/config';
export default {
  components:{ Upload },
  data(){
    return {
      actionUrl:'/v1/addimg/shop',//上传图片地址
      tableData: [],
      count:0,
      offset:0,
      limit:5,
      currentPage:1,
      city:{},
      baseUrl:config.baseUrl,
      baseImgPath:config.baseImgPath,
      selectTable:{},
      dialogVisible:false,
      categoryOptions:[],
      selectedCategory:[],
      address:{},
    }
  },
  created(){
    this.initData();
  },
  methods: {
    async initData(){
      this.city = await cityGuess();
      const count = await shopCount();
      if(count.status === 1){
        this.count = count.count
      }else{
        throw new Error('获取数据失败')
      }
      this.getShopInfo()
      // window.console.log(count,this.city)
    },
    async getShopInfo(){
      const {latitude,longitude} = this.city;
      const info = await getShopList(latitude,longitude,this.offset,this.limit)
      this.tableData = [];
      info.forEach(item => {
        const tableData = {}
        tableData.name = item.name;
        tableData.address = item.address;
        tableData.description = item.description;
        tableData.id = item.id;
        tableData.phone = item.phone;
        tableData.rating = item.rating;
        tableData.recent_order_num = item.recent_order_num;
        tableData.category = item.category;
        tableData.image_path = item.image_path;
        this.tableData.push(tableData)
      });
    },
    async getCategory(){
      const categories = await foodCategory();
      categories.forEach(item => {
        if (item.sub_categories.length) {
          const addnew = {
              value: item.name,
              label: item.name,
              children: []
          }
          item.sub_categories.forEach((subitem, index) => {
              if (index == 0) {
                  return
              }
              addnew.children.push({
                  value: subitem.name,
                  label: subitem.name,
              })
          })
          this.categoryOptions.push(addnew)
        }
     })
    },
    handleEdit(index, row) {
      this.selectTable = row;
      this.address.address = row.address;
      this.dialogVisible = true;
      this.selectedCategory = row.category.split('/');
      if(!this.categoryOptions.length){
        this.getCategory();
      }
      window.console.log(row)
    },
    handleAdd(index,row){
      this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id }})
    },
    async handleDelete(index, row) {
      try{
        const res = await deleteShop(row.id)
        if(res.status === 1){
          this.$message({
            type:'success',
            message:res.message
          })
          this.tableData.splice(index,1)
        }else{
          throw new Error(res.message)
        }
      }catch(err){
        this.$message({
          type: 'error',
          message: err.message
        });
        window.console.log(err)
      }
    },
    //分页
    handleCurrentChange(val){
      this.currentPage = val;
      this.offset = (val-1)*this.limit;
      this.getShopInfo()
    },
    async querySearchAsync(queryString,cb){
      if(queryString){
        try{
          const cityList = await searchplace(this.city.id, queryString);
          if(cityList instanceof Array){
            cityList.map(item=>{
              item.value = item.address;
              return item
            })
            cb(cityList)
          }
        }catch(err){
          window.console.log(err)
        }
      }
    },
    addressSelect(val){
      const { address, latitude, longitude } = val;
      this.address = { address, latitude, longitude }
    },
    //文件上传成功时的钩子
    handleServiceAvatarScucess(res){
      window.console.log(res)
      this.selectTable.image_path = res.image_path;
    },
    async updateShop(){
      this.dialogVisible = false
      try{
        Object.assign(this.selectTable,this.address);
        this.selectTable.category = this.selectedCategory.join('/')
        
        const res = await updateShop(this.selectTable)

        if(res.status === 1){
          this.$message({
            type:'success',
            message:res.success
          })
          this.getShopInfo()
        }else{
          this.$message({
            type:res.type,
            message:res.message
          })
        }
        // window.console.log("1",res)
      }catch(err){
        window.console.log('更新信息失败',err)
      }
    },
  }
}
</script>

<style scoped>
.shop{
  padding:20px
}
.el-table{
  background-color: #fff;
  border: 1px solid #dfe6ec;
  color: #1f2d3d;
}
.el-table .cell{
  text-align: center;
}
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
.table_container{
  padding: 20px;
}
.Pagination{
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>