import Main from '@/components/main';
export const attendanceManagers = [
  {
    path: '/attendanceManagers',
    name: 'attendanceManagers',
    component: Main,
    meta: {
      title: '个人考勤',
      icon: 'ios-paper-outline',
      roles: ['42-50-4', '42-51-4', '42-52-4', '42-53-4']
    },
    children: [
      {
        path: '/attendanceManagers/jobStatus',
        name: 'jobStatus',
        meta: {
          title: '在岗状态',
          roles: ['42-50-4']
        },
        component: () => import('@/views/attendance/jobStatus/jobStatus.vue')
      },
      {
        path: '/attendanceManagers/attendanceRecord',
        name: 'attendanceRecord',
        meta: {
          title: 'attendanceRecord',
          roles: ['42-51-4']
        },
        component: () => import('@/views/attendance/attendanceRecord/attendanceRecord.vue')
      },
      {
        path: '/attendanceManagers/attendanceStatistical',
        name: 'attendanceStatistical',
        meta: {
          title: 'attendanceStatistical',
          roles: ['42-52-4']
        },
        component: () => import('@/views/attendance/attendanceStatistical/attendanceStatistical.vue')
      },
      {
        path: '/attendanceManagers/attendanceMachineRecords',
        name: 'attendanceMachineRecords',
        meta: {
          title: 'attendanceMachineRecords',
          roles: ['42-53-4']
        },
        component: () => import('@/views/attendance/attendanceMachineRecords/attendanceMachineRecords.vue')
      }
    ]
  }
];
