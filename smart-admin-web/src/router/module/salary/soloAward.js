import Main from '@/components/main';
export const soloAward = [
  {
    path: '/soloAward',
    name: 'soloAwardManage',
    component: Main,
    meta: {
      title: '个人奖发放规则管理',
      icon: 'ios-paper-outline',
      roles: ['10-11-4', '10-12-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/soloAward',
        name: 'soloAward',
        meta: {
          title: '个人奖发放规则设置',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/salary/soloAward/soloAward.vue')
      }
    ]
  }
];
