#### element-ui 组件 Breadcrumb 面包屑和导航关联的实现

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
