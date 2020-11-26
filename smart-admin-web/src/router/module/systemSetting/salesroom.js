import Main from '@/components/main';
export const salesroom = [
  {
    path: '/salesroom',
    name: 'salesroomManage',
    component: Main,
    meta: {
      title: '权限组管理',
      icon: 'ios-paper-outline',
      roles: ['1-4-4']
    },
    children: [
      //  发送email
      {
        path: '/systemSetting/salesroom',
        name: 'salesroom',
        meta: {
          title: '权限组',
          roles: ['1-4-4']
        },
        component: () => import('@/views/systemSetting/salesroom/salesroom')
      }
    ]
  }
];
