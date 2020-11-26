import Main from '@/components/main';
export const businessTravel = [
  {
    path: '/businessTravel',
    name: 'businessTravelManage',
    component: Main,
    meta: {
      title: '出差登记管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/businessTravel',
        name: 'businessTravel',
        meta: {
          title: 'businessTravel',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/businessTravel/businessTravel.vue')
      }
    ]
  }
];
