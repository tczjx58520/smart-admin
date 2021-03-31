import Main from '@/components/main';
export const assetInformation = [
  {
    path: '/assetInformation',
    name: 'assetInformation',
    component: Main,
    meta: {
      title: '资产信息',
      icon: 'ios-paper-outline',
      roles: ['85-92-4', '85-93-4']
    },
    children: [
      //  assetDetail
      {
        path: '/assetInformation/assetManage',
        name: 'assetManage',
        meta: {
          title: '资产管理',
          roles: ['85-92-4']
        },
        component: () => import('@/views/assetManagement/assetManage/assetManage.vue')
      },
      {
        path: '/assetInformation/assetDetail',
        name: 'assetDetail',
        meta: {
          title: '资产明细',
          roles: ['85-92-4'],
          hideInMenu: true,
          noKeepAlive: true
        },
        component: () => import('@/views/assetManagement/assetDetail/assetDetail.vue')
      },
      {
        path: '/assetInformation/assetDetailDetailed',
        name: 'assetDetailDetailed',
        meta: {
          title: '资产明细详情',
          roles: ['85-92-4'],
          hideInMenu: true,
          noKeepAlive: true
        },
        component: () => import('@/views/assetManagement/assetDetail/assetDetailDetailed.vue')
      },
      {
        path: '/assetInformation/assetHistory',
        name: 'assetHistory',
        meta: {
          title: '历史记录',
          roles: ['85-93-4']
        },
        component: () => import('@/views/assetManagement/assetHistory/assetHistory.vue')
      }
    ]
  }
];
