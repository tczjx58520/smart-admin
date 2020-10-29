import Main from '@/components/main';
export const flowClassification = [
  {
    path: '/flowClassification',
    name: 'flowClassificationManage',
    component: Main,
    meta: {
      title: '流程种类管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/flowClassification',
        name: 'flowClassification',
        meta: {
          title: '流程种类管理',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/flowClassification/flowClassification.vue')
      }
    ]
  }
];
