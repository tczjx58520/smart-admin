import Main from '@/components/main';
export const storeIndividualAward = [
  {
    path: '/storeIndividualAward',
    name: 'storeIndividualAwardManage',
    component: Main,
    meta: {
      title: '店面个人奖发放规则管理',
      icon: 'ios-paper-outline',
      roles: ['10-11-4', '10-12-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/storeIndividualAward',
        name: 'storeIndividualAward',
        meta: {
          title: '店面个人奖发放规则设置',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/salary/storeIndividualAward/storeIndividualAward.vue')
      }
    ]
  }
];
