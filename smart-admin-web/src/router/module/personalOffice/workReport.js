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
        path: '/workReport/monthReport',
        name: 'monthReport',
        meta: {
          title: '月报',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/workReport/monthReport')
      },
      {
        path: '/workReport/yearReport',
        name: 'yearReport',
        meta: {
          title: '年报',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/workReport/yearReport')
      }
    ]
  }
];
