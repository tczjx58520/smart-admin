import Main from '@/components/main';
export const salesroom = [
  {
    path: '/salesroom',
    name: 'salesroomManage',
    component: Main,
    meta: {
      title: '门店管理',
      icon: 'ios-paper-outline',
      roles: ['1-11-4']
    },
    children: [
      //  发送email
      {
        path: '/systemSetting/salesroom',
        name: 'salesroom',
        meta: {
          title: '门店管理',
          roles: ['1-11-4']
        },
        component: () => import('@/views/systemSetting/salesroom/salesroom')
      }
    ]
  }
];
