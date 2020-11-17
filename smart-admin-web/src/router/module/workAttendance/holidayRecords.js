import Main from '@/components/main';
export const holidayRecords = [
  {
    path: '/holidayRecords',
    name: 'holidayRecordsManage',
    component: Main,
    meta: {
      title: '假期管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/holidayRecords',
        name: 'holidayRecords',
        meta: {
          title: 'holidayRecords',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/holidayRecords/holidayRecords.vue')
      }
    ]
  }
];
