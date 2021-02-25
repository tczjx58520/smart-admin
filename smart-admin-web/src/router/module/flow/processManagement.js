import Main from '@/components/main';
export const processManagement = [
  {
    path: '/processManagement',
    name: 'processManagement',
    component: Main,
    meta: {
      title: '流程管理',
      icon: 'ios-paper-outline',
      roles: ['31-38-4', '31-39-4']
    },
    children: [
      {
        path: '/flow/standingbook',
        name: 'standingbook',
        meta: {
          title: '流程台账',
          roles: ['31-38-4']
        },
        component: () => import('@/views/flow/standingbook/standingbook')
      },
      {
        path: '/flow/timeout',
        name: 'timeout',
        meta: {
          title: '办理时限',
          roles: ['31-39-4']
        },
        component: () => import('@/views/flow/timeout/timeout')
      }
    ]
  }
];
