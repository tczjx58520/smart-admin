import Main from '@/components/main';
export const salaryManagement = [
  {
    path: '/salaryManagement',
    name: 'salaryManagement',
    component: Main,
    meta: {
      title: '薪酬管理',
      icon: 'ios-paper-outline',
      roles: ['10-15-4']
    },
    children: [
      {
        path: '/salaryManagement/mysalary',
        name: 'mysalary',
        meta: {
          title: '我的薪酬',
          roles: ['10-17-4', '10-18-4']
        },
        component: () => import('@/views/salary/mywelfare/mywelfare.vue')
      },
      {
        path: '/salaryManagement/salaryEntry',
        name: 'salaryEntry',
        meta: {
          title: '薪酬录入',
          roles: ['10-19-4']
        },
        component: () => import('@/views/salary/salaryEntry/salaryEntry.vue')
      },
      {
        path: '/salaryManagement/salaryjudge',
        name: 'salaryjudge',
        meta: {
          title: '薪酬审批',
          roles: ['10-20-4']
        },
        component: () => import('@/views/salary/salaryjudge/salaryjudge.vue')
      },
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
