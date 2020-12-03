import Main from '@/components/main';
// export const level = [
//   {
//     path: '/empInduction',
//     name: 'empInductionManager',
//     component: Main,
//     meta: {
//       title: '员工入职管理',
//       icon: 'ios-paper-outline',
//       roles: ['1-8-4']
//     },
//     children: [
//       //  发送email
//       {
//         path: '/personnelManagement/empInduction',
//         name: 'empInduction',
//         meta: {
//           title: '员工入职',
//           roles: ['1-8-4']
//         },
//         component: () => import('@/views/personnelManagement/empInduction/empInduction')
//       }
//     ]
//   }
// ];
// 系统监控
export const personnelRelations = [
  {
    path: '/personnelRelations',
    component: Main,
    name: 'personnelRelations',
    meta: {
      title: '人事关系',
      icon: 'icon iconfont iconxitongjiankong',
      roles: ['1-8-4']
    },
    children: [
      {
        path: '/personnelRelations/empInduction',
        name: 'empInduction',
        meta: {
          title: '员工入职',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/empInduction/empInduction')
      },
      {
        path: '/personnelRelations/contractManagement',
        name: 'contractManagement',
        meta: {
          title: '合同管理',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/empContract/empContract')
      },
      {
        path: '/personnelRelations/regularWorker',
        name: 'regularWorkerManagement',
        meta: {
          title: '员工转正管理',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/regularWorker/regularWorker')
      },
      {
        path: '/personnelRelations/jobTransfer',
        name: 'jobTransferManagement',
        meta: {
          title: '员工转岗管理',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/jobTransfer/jobTransfer')
      },
      {
        path: '/personnelRelations/empQuit',
        name: 'empQuitManagement',
        meta: {
          title: '员工离职管理',
          roles: ['1-8-4']
        },
        component: () => import('@/views/personnelManagement/empQuit/empQuit')
      }
    ]
  }
];
