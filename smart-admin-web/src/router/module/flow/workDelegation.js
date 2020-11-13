import Main from '@/components/main';
export const workDelegation = [
  {
    path: '/workDelegation',
    name: 'workDelegationManage',
    component: Main,
    meta: {
      title: '工作委托管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/workDelegation',
        name: 'workDelegation',
        meta: {
          title: '工作委托',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/workDelegation/workDelegation')
      }
    ]
  }
];
