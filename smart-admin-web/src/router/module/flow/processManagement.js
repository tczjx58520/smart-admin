import Main from '@/components/main';
export const processManagement = [
  {
    path: '/processManagement',
    name: 'processManagement',
    component: Main,
    meta: {
      title: '流程管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/standingbook',
        name: 'standingbook',
        meta: {
          title: '流程台账',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/standingbook/standingbook')
      },
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
