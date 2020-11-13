import Main from '@/components/main';
export const flowWatch = [
  {
    path: '/flowWatch',
    name: 'flowWatchManage',
    component: Main,
    meta: {
      title: '流程阅看管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/flowWatch',
        name: 'flowWatch',
        meta: {
          title: '流程阅看',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/flowWatch/flowWatch')
      }
    ]
  }
];
