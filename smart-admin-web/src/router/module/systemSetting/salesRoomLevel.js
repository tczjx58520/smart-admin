import Main from '@/components/main';
export const salesRoomLevel = [
  {
    path: '/salesRoomLevel',
    name: 'salesRoomLevelManage',
    component: Main,
    meta: {
      title: '门店级别管理',
      icon: 'ios-paper-outline',
      roles: ['1-4-4']
    },
    children: [
      //  发送email
      {
        path: '/systemSetting/salesRoomLevel',
        name: 'salesRoomLevel',
        meta: {
          title: '门店级别',
          roles: ['1-4-4']
        },
        component: () => import('@/views/systemSetting/salesroomLevel/salesroomLevel')
      }
    ]
  }
];
