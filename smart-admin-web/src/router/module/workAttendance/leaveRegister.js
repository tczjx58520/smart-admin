import Main from '@/components/main';
export const leaveRegister = [
  {
    path: '/leaveRegister',
    name: 'leaveRegisterManage',
    component: Main,
    meta: {
      title: '请假登记',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/leaveRegister',
        name: 'leaveRegister',
        meta: {
          title: '请假登记',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/leaveRegister/leaveRegister.vue')
      }
    ]
  }
];
