import Main from '@/components/main';
export const role = [
  {
    path: '/role',
    name: 'role',
    component: Main,
    meta: {
      title: '权限组管理',
      icon: 'ios-paper-outline',
      roles: ['1-4-4']
    },
    children: [
      //  发送email
      {
        path: '/role/roleManage',
        name: 'roleManage',
        meta: {
          title: '权限组',
          roles: ['1-4-4']
        },
        component: () => import('@/views/systemSetting/role/role')
      }
    ]
  }
];
