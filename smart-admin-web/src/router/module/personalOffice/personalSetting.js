import Main from '@/components/main';
export const PersonalSetting = [
  {
    path: '/personalSetting',
    name: 'personalSetting',
    component: Main,
    meta: {
      title: '个人设置',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/personalSetting/definedGroup',
        name: 'definedGroup',
        meta: {
          title: '自定义群组',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/personalSetting/definedGroup')
      },
      {
        path: '/personalSetting/passwordManage',
        name: 'passwordManage',
        meta: {
          title: '密码管理',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/personalSetting/passwordManage')
      }
    ]
  }
];
