#### element-ui 组件 Breadcrumb 面包屑和导航关联的实现

路由配置 meta 原信息

```javascript
const routes = [
  {
    path: '/home',
    component: home,
    meta: []
  },
  {
    path: '/userList',
    component: userList,
    meta: { title: '数据管理', subtitle: '用户列表' }
  },
```

```
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
  <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
</el-breadcrumb>
```

>

#### 路由

```javascript
const routes = [
  {
    path: '/home',
    component: Page,
    children: [ //当 /home/userList 匹配成功，userList 会被渲染在 home 的 <router-view> 中
      {
        path: 'userList',
        component: UserList,
      }
    ]
  }
]

```
#### element-ui样式无法修改
> 原因element-ui样式是定义在全局中，使用scope时，局部样式被全局样式覆盖(vue默认全局样式覆盖局部样式)
###### 解决：
1.将样式定义到全局中 可以在一个组件中同时使用有作用域和无作用域的样式（或者在主页面定义样式）
```css
<style>
/* 全局样式 */
</style>

<style scoped>
/* 本地样式 */
</style>
```
增加权重来解决样式覆盖问题，需要给父级定义一个类
```javascript
<!--父级添加avatar-uploader类 -->
<el-upload
  :action="baseUrl+'/v1/adding/food'"
  :show-file-list="false"
  :on-success="handleUploadSuccess"
  :before-upload="beforeUpload"
  class="avatar-uploader">
  <i class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```
```css
.avatar-uploader .el-upload{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover{
  background-color: #20a00f;
}
```
2.使用深度作用选择器 
```css
<style scoped>
.avatar-uploader >>> .el-uploadb { /* ... */ }
</style>
/* 会被编译成 */
.avatar-uploader[data-v-082ae45a] .el-upload{/*  */}
```
>有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 操作符取而代之——这是一个 > >>> 的别名，同样可以正常工作。
> 写法为：父组件cssName+ /deep/+第三方库需要更改的cssName 
```css
<style scoped>
.avatar-uploader /deep/ .el-uploadb { /* ... */ }
</style>
```

#### 表单验证
>给表单添加 :model="specsForm" :rules="specsRules" ref="specsForm"
```html
<el-form :model="specsForm" :rules="specsRules" ref="specsForm" class="demo-ruleForm">
</el-form>
```
>el-form-item 添加prop(对应el-input中v-model的specs)，prop绑定的值必须可以通过.的方式从el-form上的model绑定的对象中找到
```html
<el-form-item label="规格" prop="specs" label-width="100px">
  <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
</el-form-item>
```
>确定按钮，addSpecs方法中specsForm对应的为form的ref="specsForm"
```html
<div class="specs-footer">
  <el-button @click="specsVisible = false">取消</el-button>
  <el-button type="primary" @click="addSpecs('specsForm')">确定</el-button>
</div>
```
>data中
```javascript
  export default {
    data() {
      return {
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
    methods:{
      addSpecs(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) { //如果通过验证
            alert('submit!');
          } else {
            window.console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
```
#### 强制组件重新渲染
>当table展开行时(展开行数据只有在展开时请求数据)，点击分页，由于上一页没有收起展开行，导致展开行没有数据，这时需要重新渲染组件
>解决：使用key,当点击分页时，当前组件重新渲染
```html
<el-table
  :data="tableData"
  :key="currentPage"
  :row-key="row => row.index"
  @expand-change = "expandChange"
  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
  style="width:100%">
  <slot></slot>
</el-table>
```
#### 父组件传值给子组件，在子组件中值改变了，需要在data设置，否则会报错
```javascript
props:{
  address:{type:String,default:''},
},
data(){
  return {
    city:{},
    addressData:this.address
  }
},
```