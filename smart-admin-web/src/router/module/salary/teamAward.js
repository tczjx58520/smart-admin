import Main from '@/components/main';
export const teamAward = [
  {
    path: '/teamAward',
    name: 'teamAwardManage',
    component: Main,
    meta: {
      title: '团队奖发放规则管理',
      icon: 'ios-paper-outline',
      roles: ['10-11-4', '10-12-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/teamAward',
        name: 'teamAward',
        meta: {
          title: '团队奖发放规则设置',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/salary/teamAward/teamAward.vue')
      }
    ]
  }
];
