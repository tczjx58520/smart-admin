import Main from '@/components/main';
export const typesOfComplaints = [
  {
    path: '/typesOfComplaints',
    name: 'typesOfComplaintsManages',
    component: Main,
    meta: {
      title: '投诉类型',
      icon: 'ios-paper-outline',
      roles: ['10-15-4']
    },
    children: [
      //  发送email
      {
        path: '/publicRelationShip/typesOfComplaints',
        name: 'typesOfComplaints',
        meta: {
          title: '投诉类型管理',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/publicRelationShip/typesOfComplaints/typesOfComplaints.vue')
      }
    ]
  }
];
