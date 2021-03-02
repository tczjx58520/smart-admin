import Main from '@/components/main';
export const indicatorSet = [
  {
    path: '/indicatorSet',
    name: 'indicatorSetManage',
    component: Main,
    meta: {
      title: '指标集管理',
      icon: 'ios-paper-outline',
      roles: ['13-16-4']
    },
    children: [
      //  发送email
      {
        path: '/performance/indicatorSet',
        name: 'indicatorSet',
        meta: {
          title: '指标集管理',
          roles: ['13-16-4']
        },
        component: () => import('@/views/performance/indicatorSet/indicatorSet.vue')
      }
    ]
  }
];
