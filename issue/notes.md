#### element-ui 组件 Breadcrumb 面包屑和导航关联的实现

路由配置 meta 原信息

```
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

```
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
