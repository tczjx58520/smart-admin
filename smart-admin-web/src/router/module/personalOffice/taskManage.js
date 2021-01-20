import Main from '@/components/main';
export const TaskManage = [
  {
    path: '/taskManage',
    name: 'taskManage',
    component: Main,
    meta: {
      title: '任务管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      // {
      //   path: '/taskManage/assignment',
      //   name: 'assignment',
      //   meta: {
      //     title: '布置任务',
      //     roles: ['1-3-4']
      //   },
      //   component: () => import('@/views/personalOffice/taskManagement/assignment')
      // },
      {
        path: '/taskManage/taskList',
        name: 'taskList',
        meta: {
          title: '任务列表',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/taskManagement/taskList')
      },
      {
        path: '/taskManage/taskDetail',
        name: 'taskDetail1',
        meta: {
          title: '任务详情',
          roles: ['1-3-4'],
          hideInMenu: true
        },
        component: () => import('@/views/personalOffice/taskManagement/taskDetail')
      }
    ]
  }
];
