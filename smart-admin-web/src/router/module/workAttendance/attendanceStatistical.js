import Main from '@/components/main';
export const attendanceStatistical = [
  {
    path: '/attendanceStatistical',
    name: 'attendanceStatisticalManage',
    component: Main,
    meta: {
      title: '考勤统计管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/attendanceStatistical',
        name: 'attendanceStatistical',
        meta: {
          title: 'attendanceStatistical',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/attendanceStatistical/attendanceStatistical.vue')
      }
    ]
  }
];
