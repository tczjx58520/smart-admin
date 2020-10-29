import Main from '@/components/main';
export const welfare = [
  {
    path: '/welfare',
    name: 'welfareManage',
    component: Main,
    meta: {
      title: '福利设置',
      icon: 'ios-paper-outline',
      roles: ['10-16-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/welfare',
        name: 'welfare',
        meta: {
          title: '福利设置',
          roles: ['10-16-4']
        },
        component: () => import('@/views/salary/welfare/welfare.vue')
      }
    ]
  }
];
