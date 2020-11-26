import Main from '@/components/main';
export const goOutRegister = [
  {
    path: '/goOutRegister',
    name: 'goOutRegisterManage',
    component: Main,
    meta: {
      title: '外出登记管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/goOutRegister',
        name: 'goOutRegister',
        meta: {
          title: 'goOutRegister',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/goOutRegister/goOutRegister.vue')
      }
    ]
  }
];
