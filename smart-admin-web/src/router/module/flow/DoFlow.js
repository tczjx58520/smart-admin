import Main from '@/components/main';
export const DoFlow = [
  {
    path: '/DoFlow',
    name: 'DoFlowManage',
    component: Main,
    meta: {
      title: '流程已办管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/DoFlow',
        name: 'DoFlow',
        meta: {
          title: '流程已办',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/DoFlow/DoFlow')
      }
    ]
  }
];
