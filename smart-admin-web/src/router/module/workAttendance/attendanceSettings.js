import Main from '@/components/main';
export const attendanceSettings = [
  {
    path: '/attendanceSettings',
    name: 'attendanceSettings',
    component: Main,
    meta: {
      title: '考勤设置',
      icon: 'ios-paper-outline',
      roles: ['42-54-4', '42-55-4', '42-56-4', '42-57-4', '42-58-4']
    },
    children: [
      {
        path: '/attendanceSettings/attendanceSetting',
        name: 'attendanceSetting',
        meta: {
          title: 'attendanceSetting',
          roles: ['42-54-4']
        },
        component: () => import('@/views/attendance/attendanceSetting/attendanceSetting.vue')
      },
      {
        path: '/attendanceSettings/scheduleSetting',
        name: 'scheduleSetting',
        meta: {
          title: 'scheduleSetting',
          roles: ['42-55-4']
        },
        component: () => import('@/views/attendance/scheduleSetting/scheduleSetting.vue')
      },
      {
        path: '/attendanceSettings/holidayRecords',
        name: 'holidayRecords',
        meta: {
          title: 'holidayRecords',
          roles: ['42-56-4']
        },
        component: () => import('@/views/attendance/holidayRecords/holidayRecords.vue')
      },
      {
        path: '/attendanceSettings/setAttendancePerson',
        name: 'setAttendancePerson',
        meta: {
          title: 'setAttendancePerson',
          roles: ['42-57-4']
        },
        component: () => import('@/views/attendance/setAttendancePerson/setAttendancePerson.vue')
      },
      {
        path: '/attendanceSettings/phoneAttendanceSetting',
        name: 'phoneAttendanceSetting',
        meta: {
          title: '在岗状态',
          roles: ['42-58-4']
        },
        component: () => import('@/views/attendance/phoneAttendanceSetting/phoneAttendanceSetting.vue')
      }
    ]
  }
];
