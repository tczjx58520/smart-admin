import Main from '@/components/main';
export const customerCenter = [
  {
    path: '/customerCenter',
    name: 'customerCenter',
    component: Main,
    meta: {
      title: '客户中心',
      icon: 'ios-paper-outline',
      roles: ['94-100-4']
    },
    children: [
      //  发送email
      {
        path: '/publicRelationShip/customerCenterChart',
        name: 'customerCenterChart',
        meta: {
          title: '客户中心图表',
          roles: ['94-100-4']
        },
        component: () => import('@/views/publicRelationShip/customerCenter/customerCenter.vue')
      }
    ]
  }
];
