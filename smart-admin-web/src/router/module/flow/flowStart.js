import Main from '@/components/main';
export const flowStart = [
  {
    path: '/flowStart',
    name: 'flowStartManage',
    component: Main,
    meta: {
      title: '流程发起',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/flowStart',
        name: 'flowStart',
        meta: {
          title: '流程发起',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/flowStart/flowStart.vue')
      },
      {
        path: '/flow/actionflowStart',
        name: 'actionflowStart',
        meta: {
          title: '新建流程工单',
          roles: ['1-3-4'],
          hideInMenu: true
        },
        component: () => import('@/views/flow/flowStart/actionFlowStart')
      }
    ]
  }
];
