import Main from '@/components/main';
export const employeeFile = [
  {
    path: '/employeeFile',
    component: Main,
    name: 'employeeFile',
    meta: {
      title: '员工档案',
      icon: 'icon iconfont iconxitongjiankong',
      roles: ['1-8-4']
    },
    children: [
      {
        path: '/employeeFile/staffAccount',
        name: 'staffAccount',
        meta: {
          title: '员工台账',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/staffAccount/staffAccount')
      },
      {
        path: '/employeeFile/myCard',
        name: 'myCardManagement',
        meta: {
          title: '我的卡片',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/myCard/myCard')
      }
    ]
  }
];
