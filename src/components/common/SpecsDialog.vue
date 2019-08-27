<template>
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
</template>
<script>
  export default {
    props:['specsVisible'],
    data(){
      return {
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