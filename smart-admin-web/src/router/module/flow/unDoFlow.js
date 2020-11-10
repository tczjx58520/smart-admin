import Main from '@/components/main';
export const toDoFlow = [
  {
    path: '/toDoFlow',
    name: 'toDoFlowManage',
    component: Main,
    meta: {
      title: '流程代办管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/toDoFlow',
        name: 'toDoFlow',
        meta: {
          title: '流程代办',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/toDoFlow/toDoFlow')
      }
    ]
  }
];
