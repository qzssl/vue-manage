<template>
  <div>
    <!-- el-autocomplete 是一个可带输入建议的输入框组件
    fetch-suggestions 是一个返回输入建议的方法属性 -->
    <el-autocomplete
      v-model="addressData"
      :fetch-suggestions="querySearchAsync" 
      placeholder="请输入地址"
      style="width:100%"
      @select="addressSelect">
    </el-autocomplete>
    <span>当前城市：{{ city.name }}</span>
  </div>
</template>
<script>
import { searchplace, cityGuess } from '../api/api';
  export default {
    props:{
      address:{type:String,default:''},
    },
    data(){
      return {
        city:{},
        addressData:this.address
      }
    },
    created(){
      this.initData()
    },
    methods:{
      async initData(){
        this.city = await cityGuess();
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
        // const { address, latitude, longitude } = val;
        // this.address = { address, latitude, longitude }
        this.$emit('addressSelect',val)
      }
    }
  }
</script>