import Main from '@/components/main';
export const examination = [
  {
    path: '/examination',
    component: Main,
    name: 'examination',
    meta: {
      title: '考试管理',
      icon: 'icon iconfont iconxitongjiankong',
      roles: ['1-8-4']
    },
    children: [
      {
        path: '/examination/questionManager',
        name: 'questionManager',
        meta: {
          title: '题库管理',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/examination/questionManager')
      },
      {
        path: '/examination/questionList',
        name: 'questionList',
        meta: {
          title: '题库列表',
          roles: ['1-8-4'],
          hideInMenu: true
        },
        component: () => import('@/views/personnelManagement/examination/questionList')
      },
      {
        path: '/examination/myTest',
        name: 'myTest',
        meta: {
          title: '我的考试',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/examination/myTest')
      },
      {
        path: '/examination/test',
        name: 'test',
        meta: {
          title: '考试',
          roles: ['1-8-4'],
          hideInMenu: true
        },
        component: () => import('@/views/personnelManagement/examination/test')
      },
      {
        path: '/examination/testTask',
        name: 'testTask',
        meta: {
          title: '考试任务',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/examination/testTask')
      },
      {
        path: '/examination/testType',
        name: 'testType',
        meta: {
          title: '考试类型',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/examination/testType')
      }

    ]
  }
];
