import Main from '@/components/main';
export const phoneAttendanceSetting = [
  {
    path: '/phoneAttendanceSetting',
    name: 'phoneAttendanceSettingManage',
    component: Main,
    meta: {
      title: '手机打卡设置',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/phoneAttendanceSetting',
        name: 'phoneAttendanceSetting',
        meta: {
          title: '在岗状态',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/phoneAttendanceSetting/phoneAttendanceSetting.vue')
      }
    ]
  }
];
