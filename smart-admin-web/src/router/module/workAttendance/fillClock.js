import Main from '@/components/main';
export const fillClock = [
  {
    path: '/fillClock',
    name: 'fillClockManage',
    component: Main,
    meta: {
      title: '补卡登记管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/fillClock',
        name: 'fillClock',
        meta: {
          title: 'fillClock',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/fillClock/fillClock.vue')
      }
    ]
  }
];
