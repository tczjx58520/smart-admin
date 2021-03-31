import Main from '@/components/main';
export const Statistic = [
  {
    path: '/statistic',
    name: 'statistic',
    component: Main,
    meta: {
      title: '统计',
      icon: 'ios-paper-outline',
      roles: ['101-117-4', '101-118-4']
    },
    children: [
      {
        path: '/statistic/taskStatistic',
        name: 'taskStatistic',
        meta: {
          title: '任务统计',
          roles: ['101-117-4']
        },
        component: () => import('@/views/personalOffice/statistics/taskStatistic')
      },
      {
        path: '/statistic/workReportStatistic',
        name: 'workReportStatistic',
        meta: {
          title: '工作汇报统计',
          roles: ['101-118-4']
        },
        component: () => import('@/views/personalOffice/statistics/workReportStatistic')
      }
    ]
  }
];
