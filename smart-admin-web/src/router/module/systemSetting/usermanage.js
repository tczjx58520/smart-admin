import Main from '@/components/main';
export const usermanage = [
  {
    path: '/user',
    name: 'user',
    component: Main,
    meta: {
      title: '用户管理',
      icon: 'ios-paper-outline',
      roles: ['1-7-4']
    },
    children: [
      //  发送email
      {
        path: '/usermanage/usermanage',
        name: 'usermanage',
        meta: {
          title: '权限组',
          roles: ['1-7-4']
        },
        component: () => import('@/views/systemSetting/usermanage/usermanage.vue')
      }
    ]
  }
];
