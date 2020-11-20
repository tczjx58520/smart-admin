import Main from '@/components/main';
export const workOvertimeRegistration = [
  {
    path: '/workOvertimeRegistration',
    name: 'workOvertimeRegistrationManage',
    component: Main,
    meta: {
      title: '加班登记',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/workOvertimeRegistration',
        name: 'workOvertimeRegistration',
        meta: {
          title: 'workOvertimeRegistration',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/workOvertimeRegistration/workOvertimeRegistration.vue')
      }
    ]
  }
];
