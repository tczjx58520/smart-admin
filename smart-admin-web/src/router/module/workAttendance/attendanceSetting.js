import Main from '@/components/main';
export const attendanceSetting = [
  {
    path: '/attendanceSetting',
    name: 'attendanceSettingManage',
    component: Main,
    meta: {
      title: '考勤设置',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/attendanceSetting',
        name: 'attendanceSetting',
        meta: {
          title: 'attendanceSetting',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/attendanceSetting/attendanceSetting.vue')
      }
    ]
  }
];
