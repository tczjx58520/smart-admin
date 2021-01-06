import Main from '@/components/main';
export const traning = [
  {
    path: '/traning',
    component: Main,
    name: 'traning',
    meta: {
      title: '员工培训',
      icon: 'icon iconfont iconxitongjiankong',
      roles: ['1-8-4']
    },
    children: [
      {
        path: '/traning/trainingMaterials',
        name: 'trainingMaterials',
        meta: {
          title: '培训资料分类列表',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/traning/traning')
      },
      {
        path: '/traning/trainingMaterialsList',
        name: 'trainingMaterialsList',
        meta: {
          title: '培训资料列表',
          roles: ['1-8-4'],
          hideInMenu: true
        },
        component: () => import('@/views/personnelManagement/traning/traningDetail')
      },
      {
        path: '/traning/myTraning',
        name: 'myTraning',
        meta: {
          title: '我的培训',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/traning/myTraning')
      },
      {
        path: '/traning/traningType',
        name: 'traningType',
        meta: {
          title: '培训类型',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/traning/traningType')
      },
      {
        path: '/traning/traningTask',
        name: 'traningTask',
        meta: {
          title: '培训任务',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/traning/traningTask')
      },
      {
        path: '/traning/traningTaskDetail',
        name: 'taskDetail',
        meta: {
          title: '培训任务详情',
          roles: ['1-8-4'],
          hideInMenu: true
        },
        component: () => import('@/views/personnelManagement/traning/taskDetail')
      }
    ]
  }
];
