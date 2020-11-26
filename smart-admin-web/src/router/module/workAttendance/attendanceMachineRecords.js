import Main from '@/components/main';
export const attendanceMachineRecords = [
  {
    path: '/attendanceMachineRecords',
    name: 'attendanceMachineRecordsManage',
    component: Main,
    meta: {
      title: '考勤机记录',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/attendanceMachineRecords',
        name: 'attendanceMachineRecords',
        meta: {
          title: 'attendanceMachineRecords',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/attendanceMachineRecords/attendanceMachineRecords.vue')
      }
    ]
  }
];
