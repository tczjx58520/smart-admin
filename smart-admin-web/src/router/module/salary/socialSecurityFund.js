import Main from '@/components/main';
export const socialSecurityFund = [
  {
    path: '/socialSecurityFund',
    name: 'socialSecurityFundManage',
    component: Main,
    meta: {
      title: '社保公积金',
      icon: 'ios-paper-outline',
      roles: ['10-11-4', '10-12-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/socialSecurityFund',
        name: 'socialSecurityFund',
        meta: {
          title: '社保公积金',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/salary/socialSecurityFund/socialSecurityFund.vue')
      }
    ]
  }
];
