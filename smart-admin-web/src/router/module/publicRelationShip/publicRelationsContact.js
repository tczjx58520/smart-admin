import Main from '@/components/main';
export const publicRelationsContact = [
  {
    path: '/publicRelationsContact',
    name: 'publicRelationsContact',
    component: Main,
    meta: {
      title: '公共关系联系人',
      icon: 'ios-paper-outline',
      roles: ['94-96-4']
    },
    children: [
      //  发送email
      {
        path: '/publicRelationShip/publicRelationsContactList',
        name: 'publicRelationsContactList',
        meta: {
          title: '公共关系联系人列表',
          roles: ['94-96-4']
        },
        component: () => import('@/views/publicRelationShip/publicRelationsContactList/publicRelationsContactList.vue')
      }
    ]
  }
];
