import Main from '@/components/main';
export const indicatorSingle = [
  {
    path: '/indicatorSingle',
    name: 'indicatorSingleManage',
    component: Main,
    meta: {
      title: '指标项管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      //  发送email
      {
        path: '/performance/indicatorSingle',
        name: 'indicatorSingle',
        meta: {
          title: '指标项列表',
          roles: ['1-3-4']
        },
        component: () => import('@/views/performance/indicatorSingle/indicatorSingle.vue')
      }
    ]
  }
];
