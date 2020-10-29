import Main from '@/components/main';
export const salaryEntry = [
  {
    path: '/salaryEntry',
    name: 'salaryEntryManage',
    component: Main,
    meta: {
      title: '薪酬录入',
      icon: 'ios-paper-outline',
      roles: ['10-19-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/salaryEntry',
        name: 'salaryEntry',
        meta: {
          title: '薪酬录入',
          roles: ['10-19-4']
        },
        component: () => import('@/views/salary/salaryEntry/salaryEntry.vue')
      }
    ]
  }
];
