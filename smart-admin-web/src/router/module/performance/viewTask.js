import Main from '@/components/main';
export const viewTask = [
  {
    path: '/viewTask',
    name: 'viewTaskManage',
    component: Main,
    meta: {
      title: '考核任务查看',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      //  发送email
      {
        path: '/performance/viewTask',
        name: 'viewTask',
        meta: {
          title: '考核任务查看',
          roles: ['1-3-4']
        },
        component: () => import('@/views/performance/viewTask/viewTask.vue')
      }
    ]
  }
];
