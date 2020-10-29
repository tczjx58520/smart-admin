import Main from '@/components/main';
export const mysalary = [
  {
    path: '/mysalary',
    name: 'mysalaryManage',
    component: Main,
    meta: {
      title: '我的薪酬',
      icon: 'ios-paper-outline',
      roles: ['10-17-4', '10-18-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/mysalary',
        name: 'mysalary',
        meta: {
          title: '我的薪酬',
          roles: ['10-17-4', '10-18-4']
        },
        component: () => import('@/views/salary/mywelfare/mywelfare.vue')
      }
    ]
  }
];
