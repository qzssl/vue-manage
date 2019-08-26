<template>
<!-- cascader 联级选择器 -->
<!-- value / v-model	选中项绑定值 -->
<!-- options	可选项数据源，键名可通过 Props 属性配置 -->
  <el-form-item label="店铺分类">
    <el-cascader
      :options="categoryOptions"
      v-model="selected"
      @change="handleChange"
    ></el-cascader>
  </el-form-item>
</template>
<script>
import { foodCategory } from '../api/api';
  export default {
    props:{
      selectedCategory:{type:Array,default:()=>{return ['请选择']}}
    },
    data(){
      return {
        categoryOptions:[],
        selected:this.selectedCategory
      }
    },
    created(){
      this.getCategory()
    },
    methods:{
      async getCategory(){
        const categories = await foodCategory()
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
      handleChange(val){
        // window.console.log(val)
        this.$emit('handleChange',val)
      }
    }
  }
</script>