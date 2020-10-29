import Main from '@/components/main';
export const assessmentTask = [
  {
    path: '/assessmentTask',
    name: 'assessmentTaskManage',
    component: Main,
    meta: {
      title: '考核任务管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      //  发送email
      {
        path: '/performance/assessmentTask',
        name: 'assessmentTask',
        meta: {
          title: '考核任务管理',
          roles: ['1-3-4']
        },
        component: () => import('@/views/performance/assessmentTask/assessmentTask.vue')
      }
    ]
  }
];
