import Main from '@/components/main';
export const publicEvents = [
  {
    path: '/publicEvents',
    name: 'publicEvents',
    component: Main,
    meta: {
      title: '公共事件',
      icon: 'ios-paper-outline',
      roles: ['94-95-4']
    },
    children: [
      //  assetDetail
      {
        path: '/publicRelationShip/publicEventsList',
        name: 'publicEventsList',
        meta: {
          title: '公共事件列表',
          roles: ['94-95-4']
        },
        component: () => import('@/views/publicRelationShip/publicEventsList/publicEventsList.vue')
      },
      {
        path: '/publicRelationShip/publicEventsDetail',
        name: 'publicEventsDetail',
        meta: {
          title: '公共事件详情',
          roles: ['94-95-4'],
          hideInMenu: true,
          noKeepAlive: true
        },
        component: () => import('@/views/publicRelationShip/publicEventsList/publicEventsDetail.vue')
      },
      {
        path: '/publicRelationShip/followPublicEvents',
        name: 'followPublicEvents',
        meta: {
          title: '公共事件跟进',
          roles: ['94-95-4'],
          hideInMenu: true,
          noKeepAlive: true
        },
        component: () => import('@/views/publicRelationShip/followPublicEvents/followPublicEvents.vue')
      }
    ]
  }
];
