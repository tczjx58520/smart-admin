import Main from '@/components/main';
export const jobStatus = [
  {
    path: '/jobStatus',
    name: 'jobStatusManage',
    component: Main,
    meta: {
      title: '在岗状态',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/jobStatus',
        name: 'jobStatus',
        meta: {
          title: '在岗状态',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/jobStatus/jobStatus.vue')
      }
    ]
  }
];
