import Main from '@/components/main';
export const processDesign = [
  {
    path: '/processDesign',
    name: 'processDesignManage',
    component: Main,
    meta: {
      title: '流程设计',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/processDesign',
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
