import Main from '@/components/main';
export const salarycount = [
  {
    path: '/salarycount',
    name: 'salarycountManage',
    component: Main,
    meta: {
      title: '薪酬统计',
      icon: 'ios-paper-outline',
      roles: ['10-21-4', '10-22-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/salarycount',
        name: 'salarycount',
        meta: {
          title: '薪酬统计',
          roles: ['10-21-4', '10-22-4']
        },
        component: () => import('@/views/salary/salarycount/salarycount.vue')
      }
    ]
  }
];
