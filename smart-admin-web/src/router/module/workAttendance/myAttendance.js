import Main from '@/components/main';
export const myAttendance = [
  {
    path: '/myAttendance',
    name: 'myAttendanceManage',
    component: Main,
    meta: {
      title: '上下班打卡',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/myAttendance',
        name: 'myAttendance',
        meta: {
          title: '在岗状态',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/myAttendance/myAttendance.vue')
      }
    ]
  }
];
