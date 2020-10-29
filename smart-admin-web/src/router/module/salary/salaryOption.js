import Main from '@/components/main';
export const salaryOption = [
  {
    path: '/salaryOption',
    name: 'salaryOptionManage',
    component: Main,
    meta: {
      title: '指标集管理',
      icon: 'ios-paper-outline',
      roles: ['10-19-4']
    },
    children: [
      {
        path: '/salary/salaryOption',
        name: 'salaryOption',
        meta: {
          title: '指标集管理',
          roles: ['10-19-4']
        },
        component: () => import('@/views/salary/salaryOption/salaryOption.vue')
      }
    ]
  }
];
