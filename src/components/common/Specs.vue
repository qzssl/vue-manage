<template>
  <div class="specs">
    <div class="specs-add" v-show="position == 'top'">
      <el-button type="primary" @click="specsVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
    </div>
    <el-table :data="specsTable" style="margin-bottom:20px" :row-class-name="tableRowClassName" 
    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column label="规格" prop="specs"></el-table-column>
      <el-table-column label="包装费" prop="packing_fee"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="delectSpecs(scope.$index)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="specs-add" v-show="position == 'bottom'">
      <el-button type="primary" @click="specsVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
    </div>
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
  export default {
    props:{
      position:{type:String,default:'top'},
      specsTable:{type:Array,default:()=>{return []}},//表格数据
    },
    data(){
      return {
        specsVisible:false,
        specsData:this.specs,
        specsForm:{ //表单的数据
          specs: '',
          packing_fee: 0,
          price: 20,
        },
        specsRules:{//表单规格验证规则
          specs:[
            {required:true,message:'请输入规格',trigger:'blur'},
          ]
        },
      }
    },
    methods:{
      //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
      tableRowClassName(index){
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      //删除规格
      delectSpecs(index) {
        // this.specsTable.specs.splice(index, 1);
        this.$emit('delectSpecs',index)
      },
      //添加规格
      addSpecs(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) { //验证通过
            this.$emit('addSpecs',this.specsForm)
            this.specsForm.specs = '';
            this.specsForm.packing_fee = 0;
            this.specsForm.price = 20;
            this.specsVisible = false;
          } else {
            return false;
          }
        });
      },
    }
  }
</script>
<style scoped>
.specs-add{
  text-align: center;
}
.specs-footer{
  text-align: right;
  margin-top: 30px;
}

</style>
<style>
.specs .el-table{
  background-color: #fff;
  border: 1px solid #dfe6ec;
  color: #1f2d3d;
}
.el-input-number__decrease{
  border-left: 1px solid #DCDFE6;
  border-radius: 0%;
  right: 42px;
  left: inherit;
}

.el-input-number .el-input__inner{
  padding-left: 15px;
  padding-right: 100px;
  text-align: left;
}

.el-form-item{
  margin-bottom: 22px;
}
</style>