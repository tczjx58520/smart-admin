import Main from '@/components/main';
export const examination = [
  {
    path: '/examination',
    component: Main,
    name: 'examination',
    meta: {
      title: '考试管理',
      icon: 'icon iconfont iconxitongjiankong',
      roles: ['59-70-4', '59-71-4', '59-72-4', '59-73-4']
    },
    children: [
      {
        path: '/examination/questionManager',
        name: 'questionManager',
        meta: {
          title: '题库管理',
          roles: ['59-70-4']
        },
        component: () => import('@/views/personnelManagement/examination/questionManager')
      },
      {
        path: '/examination/questionList',
        name: 'questionList',
        meta: {
          title: '题库列表',
          roles: ['59-70-4'],
          hideInMenu: true
        },
        component: () => import('@/views/personnelManagement/examination/questionList')
      },
      {
        path: '/examination/myTest',
        name: 'myTest',
        meta: {
          title: '我的考试',
          roles: ['59-71-4']
        },
        component: () => import('@/views/personnelManagement/examination/myTest')
      },
      {
        path: '/examination/test',
        name: 'test',
        meta: {
          title: '考试',
          roles: ['59-71-4'],
          hideInMenu: true
        },
        component: () => import('@/views/personnelManagement/examination/test')
      },
      {
        path: '/examination/testTask',
        name: 'testTask',
        meta: {
          title: '考试任务',
          roles: ['59-72-4']
        },
        component: () => import('@/views/personnelManagement/examination/testTask')
      },
      {
        path: '/examination/testType',
        name: 'testType',
        meta: {
          title: '考试类型',
          roles: ['59-73-4']
        },
        component: () => import('@/views/personnelManagement/examination/testType')
      }

    ]
  }
];
