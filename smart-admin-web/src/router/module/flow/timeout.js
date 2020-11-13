import Main from '@/components/main';
export const timeout = [
  {
    path: '/timeout',
    name: 'timeoutManage',
    component: Main,
    meta: {
      title: '办理时限管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/timeout',
        name: 'timeout',
        meta: {
          title: '办理时限',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/timeout/timeout')
      }
    ]
  }
];
