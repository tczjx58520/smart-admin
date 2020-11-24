import Main from '@/components/main';
export const setAttendancePerson = [
  {
    path: '/setAttendancePerson',
    name: 'setAttendancePersonManage',
    component: Main,
    meta: {
      title: '设置考勤人员管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/setAttendancePerson',
        name: 'setAttendancePerson',
        meta: {
          title: 'setAttendancePerson',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/setAttendancePerson/setAttendancePerson.vue')
      }
    ]
  }
];
