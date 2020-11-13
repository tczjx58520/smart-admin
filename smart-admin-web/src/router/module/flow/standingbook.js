import Main from '@/components/main';
export const standingbook = [
  {
    path: '/standingbook',
    name: 'standingbookManage',
    component: Main,
    meta: {
      title: '流程台账管理',
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
      }
    ]
  }
];
