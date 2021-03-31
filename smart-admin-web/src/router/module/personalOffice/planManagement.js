import Main from '@/components/main';
export const PlanManagement = [
  {
    path: '/planManagement',
    name: 'planManagement',
    component: Main,
    meta: {
      title: '计划管理',
      icon: 'ios-paper-outline',
      roles: ['101-110-4', '101-111-4', '101-112-4', '101-113-4', '101-114-4', '101-115-4']
    },
    children: [
      {
        path: '/planManagement/personalPlan',
        name: 'personalPlan',
        meta: {
          title: '个人计划',
          roles: ['101-110-4']
        },
        component: () => import('@/views/personalOffice/planManagement/personalPlan')
      },

      {
        path: '/planManagement/viewPlan',
        name: 'viewPlan',
        meta: {
          title: '查看计划',
          roles: ['101-110-4'],
          hideInMenu: true
        },
        component: () => import('@/views/personalOffice/planManagement/viewPlan')
      },
      {
        path: '/planManagement/organizePlan',
        name: 'organizePlan',
        meta: {
          title: '组织计划',
          roles: ['101-111-4']
        },
        component: () => import('@/views/personalOffice/planManagement/organizePlan')
      },
      {
        path: '/planManagement/workSummary',
        name: 'workSummary',
        meta: {
          title: '工作总结',
          roles: ['101-112-4']
        },
        component: () => import('@/views/personalOffice/planManagement/workSummary')
      },
      {
        path: '/planManagement/workreport',
        name: 'workreport',
        meta: {
          title: '工作汇报',
          roles: ['101-113-4']
        },
        component: () => import('@/views/personalOffice/planManagement/workReport')
      },
      {
        path: '/planManagement/reviewPlan',
        name: 'reviewPlan',
        meta: {
          title: '评阅计划',
          roles: ['101-114-4']
        },
        component: () => import('@/views/personalOffice/planManagement/reviewPlan')
      },
      {
        path: '/planManagement/sharedPlan',
        name: 'sharedPlan',
        meta: {
          title: '共享的计划',
          roles: ['101-115-4']
        },
        component: () => import('@/views/personalOffice/planManagement/sharedPlan')
      }

    ]
  }
];
