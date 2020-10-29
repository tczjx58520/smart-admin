import Main from '@/components/main';
export const collectAccounts = [
  {
    path: '/collectAccounts',
    name: 'collectAccountsManage',
    component: Main,
    meta: {
      title: '套账',
      icon: 'ios-paper-outline',
      roles: ['10-15-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/collectAccounts',
        name: 'collectAccounts',
        meta: {
          title: '套账',
          roles: ['10-15-4']
        },
        component: () => import('@/views/salary/collectAccounts/collectAccounts.vue')
      }
    ]
  }
];
