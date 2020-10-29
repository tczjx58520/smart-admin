import Main from '@/components/main';
export const groupmanage = [
  {
    path: '/group',
    name: 'group',
    component: Main,
    meta: {
      title: '群组管理',
      icon: 'ios-paper-outline',
      roles: ['1-6-4']
    },
    children: [
      //  发送email
      {
        path: '/group/groupmanage',
        name: 'groupmanage',
        meta: {
          title: '群组管理',
          roles: ['1-6-4']
        },
        component: () => import('@/views/systemSetting/groupmanage/groupmanage.vue')
      }
    ]
  }
];
