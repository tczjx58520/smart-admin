import Main from '@/components/main';
export const processSettings = [
  {
    path: '/processSettings',
    name: 'processSettings',
    component: Main,
    meta: {
      title: '流程管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/processSettings/flowClassification',
        name: 'flowClassification',
        meta: {
          title: '流程种类管理',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/flowClassification/flowClassification.vue')
      },
      {
        path: '/processSettings/processDesign',
        name: 'processDesign',
        meta: {
          title: '流程设计',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/processDesign/processDesign.vue')
      }
    ]
  }
];
