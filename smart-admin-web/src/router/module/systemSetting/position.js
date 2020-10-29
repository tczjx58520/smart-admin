import Main from '@/components/main';
export const position = [
  {
    path: '/position',
    name: 'position',
    component: Main,
    meta: {
      title: '岗位管理',
      icon: 'ios-paper-outline',
      roles: ['1-5-4']
    },
    children: [
      //  发送email
      {
        path: '/position/PositionList',
        name: 'PositionList',
        meta: {
          title: '岗位管理',
          roles: ['1-5-4']
        },
        component: () => import('@/views/systemSetting/employee/position/position-list.vue')
      }
    ]
  }
];
