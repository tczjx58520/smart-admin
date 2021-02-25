import Main from '@/components/main';
export const salaryManagement = [
  {
    path: '/salaryManagement',
    name: 'salaryManagement',
    component: Main,
    meta: {
      title: '薪酬管理',
      icon: 'ios-paper-outline',
      roles: ['19-20-4', '19-120-4', '19-21-4', '19-22-4', '19-23-4']
    },
    children: [
      {
        path: '/salaryManagement/mysalary',
        name: 'mysalary',
        meta: {
          title: '我的薪酬',
          roles: ['19-20-4', '19-120-4']
        },
        component: () => import('@/views/salary/mywelfare/mywelfare.vue')
      },
      {
        path: '/salaryManagement/salaryEntry',
        name: 'salaryEntry',
        meta: {
          title: '薪酬录入',
          roles: ['19-21-1']
        },
        component: () => import('@/views/salary/salaryEntry/salaryEntry.vue')
      },
      {
        path: '/salaryManagement/salaryjudge',
        name: 'salaryjudge',
        meta: {
          title: '薪酬审批',
          roles: ['19-22-4']
        },
        component: () => import('@/views/salary/salaryjudge/salaryjudge.vue')
      },
      {
        path: '/salary/salarycount',
        name: 'salarycount',
        meta: {
          title: '薪酬统计',
          roles: ['19-23-4']
        },
        component: () => import('@/views/salary/salarycount/salarycount.vue')
      },
      {
        path: '/salary/repRewardList',
        name: 'repRewardList',
        meta: {
          title: '店面奖金统计',
          roles: ['19-119-4']
        },
        component: () => import('@/views/salary/repRewardList/repRewardList.vue')
      }
    ]
  }
];
