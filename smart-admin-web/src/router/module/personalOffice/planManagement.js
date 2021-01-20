import Main from '@/components/main';
export const PlanManagement = [
  {
    path: '/planManagement',
    name: 'planManagement',
    component: Main,
    meta: {
      title: '计划管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/planManagement/personalPlan',
        name: 'personalPlan',
        meta: {
          title: '个人计划',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/planManagement/personalPlan')
      },

      {
        path: '/planManagement/viewPlan',
        name: 'viewPlan',
        meta: {
          title: '查看计划',
          roles: ['1-3-4'],
          hideInMenu: true
        },
        component: () => import('@/views/personalOffice/planManagement/viewPlan')
      },
      {
        path: '/planManagement/organizePlan',
        name: 'organizePlan',
        meta: {
          title: '组织计划',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/planManagement/organizePlan')
      },
      {
        path: '/planManagement/workSummary',
        name: 'workSummary',
        meta: {
          title: '工作总结',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/planManagement/workSummary')
      },
      {
        path: '/planManagement/workreport',
        name: 'workreport',
        meta: {
          title: '工作汇报',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/planManagement/workReport')
      },
      {
        path: '/planManagement/reviewPlan',
        name: 'reviewPlan',
        meta: {
          title: '评阅计划',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/planManagement/reviewPlan')
      },
      {
        path: '/planManagement/sharedPlan',
        name: 'sharedPlan',
        meta: {
          title: '共享的计划',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/planManagement/sharedPlan')
      }

    ]
  }
];
