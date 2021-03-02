import Main from '@/components/main';
export const organization = [
  {
    path: '/organization',
    name: 'organization',
    component: Main,
    meta: {
      title: '组织架构管理',
      icon: 'ios-paper-outline',
      roles: ['1-5-4']
    },
    children: [
      //  发送email
      {
        path: '/organization/organizationManage',
        name: 'organizationManage',
        meta: {
          title: '组织架构管理',
          roles: ['1-5-4']
        },
        component: () => import('@/views/systemSetting/organizations/organization.vue')
      }
    ]
  }
];
