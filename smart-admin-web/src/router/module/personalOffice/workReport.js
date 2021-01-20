import Main from '@/components/main';
export const WorkReport = [
  {
    path: '/workReport',
    name: 'workReport',
    component: Main,
    meta: {
      title: '工作汇报',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/workReport/dayReport',
        name: 'dayReport',
        meta: {
          title: '日报',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/workReport/dayReport')
      },
      {
        path: '/workReport/weekReport',
        name: 'weekReport',
        meta: {
          title: '周报',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/workReport/weekReport')
      },
      {
        path: '/workReport/monthReport',
        name: 'monthReport',
        meta: {
          title: '月报',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/workReport/monthReport')
      }
    ]
  }
];
