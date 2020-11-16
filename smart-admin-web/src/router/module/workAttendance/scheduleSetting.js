import Main from '@/components/main';
export const scheduleSetting = [
  {
    path: '/scheduleSetting',
    name: 'scheduleSettingManage',
    component: Main,
    meta: {
      title: '排版管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/attendance/scheduleSetting',
        name: 'scheduleSetting',
        meta: {
          title: 'scheduleSetting',
          roles: ['1-3-4']
        },
        component: () => import('@/views/attendance/scheduleSetting/scheduleSetting.vue')
      }
    ]
  }
];
