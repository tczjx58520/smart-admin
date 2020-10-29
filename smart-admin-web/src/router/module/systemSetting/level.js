import Main from '@/components/main';
export const level = [
  {
    path: '/level',
    name: 'level',
    component: Main,
    meta: {
      title: '级别管理',
      icon: 'ios-paper-outline',
      roles: ['1-8-4']
    },
    children: [
      //  发送email
      {
        path: '/level/levelManage',
        name: 'levelManage',
        meta: {
          title: '级别管理',
          roles: ['1-8-4']
        },
        component: () => import('@/views/systemSetting/employee/level/level-list.vue')
      }
    ]
  }
];
