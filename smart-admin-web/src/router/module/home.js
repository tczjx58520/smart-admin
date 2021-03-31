import Main from '@/components/main';
// 首页
export const home = [
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      title: '首页',
      noKeepAlive: true,
      hideInMenu: true,
      noValidatePrivilege: true,
      icon: 'icon iconfont iconxitongshezhi',
      roles: ['1-10-4']
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
          noValidatePrivilege: true,
          noKeepAlive: true,
          roles: ['1-10-4']
        },
        component: () => import('@/views/home')
      }
    ]
  }
];
