import Main from '@/components/main';
export const publicRelationsContact = [
  {
    path: '/publicRelationsContact',
    name: 'publicRelationsContact',
    component: Main,
    meta: {
      title: '公共关系联系人',
      icon: 'ios-paper-outline',
      roles: ['10-15-4']
    },
    children: [
      //  发送email
      {
        path: '/publicRelationShip/publicRelationsContactList',
        name: 'publicRelationsContactList',
        meta: {
          title: '公共关系联系人列表',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/publicRelationShip/publicRelationsContactList/publicRelationsContactList.vue')
      }
    ]
  }
];
