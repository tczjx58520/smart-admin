import Main from '@/components/main';
export const recall = [
  {
    path: '/recall',
    name: 'recallManage',
    component: Main,
    meta: {
      title: '流程代办管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/recall',
        name: 'recall',
        meta: {
          title: '流程代办',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/recall/recall')
      }
    ]
  }
];
