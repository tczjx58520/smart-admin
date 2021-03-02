import Main from '@/components/main';
export const processDo = [
  {
    path: '/processDo',
    name: 'processDo',
    component: Main,
    meta: {
      title: '流程办理',
      icon: 'ios-paper-outline',
      roles: ['31-32-4', '31-33-4', '31-34-4', '31-35-4', '31-36-4', '31-37-4']
    },
    children: [
      {
        path: '/processDo/flowStart',
        name: 'flowStart',
        meta: {
          title: '流程发起',
          roles: ['31-32-4']
        },
        component: () => import('@/views/flow/flowStart/flowStart.vue')
      },
      {
        path: '/processDo/actionflowStart',
        name: 'actionflowStart',
        meta: {
          title: '新建流程工单',
          roles: ['31-32-4'],
          hideInMenu: true
        },
        component: () => import('@/views/flow/flowStart/actionFlowStart')
      },
      {
        path: '/processDo/toDoFlow',
        name: 'toDoFlow',
        meta: {
          title: '流程代办',
          roles: ['31-33-4']
        },
        component: () => import('@/views/flow/toDoFlow/toDoFlow')
      },
      {
        path: '/processDo/DoFlow',
        name: 'DoFlow',
        meta: {
          title: '流程已办',
          roles: ['31-34-4']
        },
        component: () => import('@/views/flow/DoFlow/DoFlow')
      },
      {
        path: '/processDo/workDelegation',
        name: 'workDelegation',
        meta: {
          title: '工作委托',
          roles: ['31-35-4']
        },
        component: () => import('@/views/flow/workDelegation/workDelegation')
      },
      {
        path: '/processDo/flowWatch',
        name: 'flowWatch',
        meta: {
          title: '流程阅看',
          roles: ['31-36-4']
        },
        component: () => import('@/views/flow/flowWatch/flowWatch')
      },
      {
        path: '/processDo/recall',
        name: 'recall',
        meta: {
          title: '流程召回',
          roles: ['31-37-4']
        },
        component: () => import('@/views/flow/recall/recall')
      }
    ]
  }
];
