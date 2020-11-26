import Main from '@/components/main';
export const punchTheClock = [
  {
    path: '/punchTheClock',
    name: 'punchTheClockManage',
    component: Main,
    meta: {
      title: '上下班打卡',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/punchTheClock',
        name: 'punchTheClock',
        meta: {
          title: '在岗状态',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/punchTheClock/punchTheClock.vue')
      }
    ]
  }
];
