import Main from '@/components/main';
export const organization = [
  {
    path: '/organization',
    name: 'organization',
    component: Main,
    meta: {
      title: '岗位管理',
      icon: 'ios-paper-outline',
      roles: ['1-2-4']
    },
    children: [
      //  发送email
      {
        path: '/organization/organizationManage',
        name: 'organizationManage',
        meta: {
          title: '岗位管理',
          roles: ['1-2-4']
        },
        component: () => import('@/views/systemSetting/organizations/organization.vue')
      }
    ]
  }
];
