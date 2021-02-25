import Main from '@/components/main';
export const basicSettings = [
  {
    path: '/basicSettings',
    name: 'basicSettings',
    component: Main,
    meta: {
      title: '基础设置',
      icon: 'ios-paper-outline',
      roles: ['19-24-4', '19-25-4', '19-26-4', '19-27-4', '19-28-4', '19-29-4', '19-30-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/socialSecurityFund',
        name: 'socialSecurityFund',
        meta: {
          title: '社保公积金',
          roles: ['19-24-4']
        },
        component: () => import('@/views/salary/socialSecurityFund/socialSecurityFund.vue')
      },
      {
        path: '/salary/welfare',
        name: 'welfare',
        meta: {
          title: '福利设置',
          roles: ['19-25-4']
        },
        component: () => import('@/views/salary/welfare/welfare.vue')
      },
      {
        path: '/salary/salaryOption',
        name: 'salaryOption',
        meta: {
          title: '指标集管理',
          roles: ['19-26-4']
        },
        component: () => import('@/views/salary/salaryOption/salaryOption.vue')
      },
      {
        path: '/salary/collectAccounts',
        name: 'collectAccounts',
        meta: {
          title: '套账',
          roles: ['19-27-4']
        },
        component: () => import('@/views/salary/collectAccounts/collectAccounts.vue')
      },
      {
        path: '/salary/teamAward',
        name: 'teamAward',
        meta: {
          title: '团队奖发放规则设置',
          roles: ['19-28-4']
        },
        component: () => import('@/views/salary/teamAward/teamAward.vue')
      },
      {
        path: '/salary/soloAward',
        name: 'soloAward',
        meta: {
          title: '个人奖发放规则设置',
          roles: ['19-29-4']
        },
        component: () => import('@/views/salary/soloAward/soloAward.vue')
      },
      {
        path: '/salary/storeIndividualAward',
        name: 'storeIndividualAward',
        meta: {
          title: '店面个人奖发放规则设置',
          roles: ['19-30-4']
        },
        component: () => import('@/views/salary/storeIndividualAward/storeIndividualAward.vue')
      }
    ]
  }
];
