import Main from '@/components/main';
export const attendanceRecord = [
  {
    path: '/attendanceRecord',
    name: 'attendanceRecordManage',
    component: Main,
    meta: {
      title: '考勤记录',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/attendanceRecord',
        name: 'attendanceRecord',
        meta: {
          title: 'attendanceRecord',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/attendanceRecord/attendanceRecord.vue')
      }
    ]
  }
];
