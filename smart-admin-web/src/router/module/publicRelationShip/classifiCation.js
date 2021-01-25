import Main from '@/components/main';
export const classifiCation = [
  {
    path: '/classifiCation',
    name: 'classifiCation',
    component: Main,
    meta: {
      title: '分类',
      icon: 'ios-paper-outline',
      roles: ['10-15-4']
    },
    children: [
      //  发送email
      {
        path: '/publicRelationShip/classifiCationManage',
        name: 'classifiCationManage',
        meta: {
          title: '分类管理',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/publicRelationShip/classifiCation/classifiCation.vue')
      }
    ]
  }
];
