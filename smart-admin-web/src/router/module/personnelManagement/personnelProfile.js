import Main from '@/components/main';
export const personnelProfile = [
  {
    path: '/personnelProfile',
    component: Main,
    name: 'personnelProfile',
    meta: {
      title: '人事概况',
      icon: 'icon iconfont iconxitongjiankong',
      roles: ['1-8-4']
    },
    children: [
      {
        path: '/personnelProfile/personnelPro',
        name: 'personnelPro',
        meta: {
          title: '人事概况',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/personnelProfile/index')
      }
    ]
  }
];
