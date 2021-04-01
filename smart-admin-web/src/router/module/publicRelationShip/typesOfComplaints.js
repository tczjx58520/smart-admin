import Main from '@/components/main';
export const typesOfComplaints = [
  {
    path: '/typesOfComplaints',
    name: 'typesOfComplaintsManages',
    component: Main,
    meta: {
      title: '投诉类型',
      icon: 'ios-paper-outline',
      roles: ['94-97-4']
    },
    children: [
      //  发送email
      {
        path: '/publicRelationShip/typesOfComplaints',
        name: 'typesOfComplaints',
        meta: {
          title: '投诉类型管理',
          roles: ['94-97-4']
        },
        component: () => import('@/views/publicRelationShip/typesOfComplaints/typesOfComplaints.vue')
      }
    ]
  }
];
