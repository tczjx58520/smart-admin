import Main from '@/components/main';
export const Journal = [
  {
    path: '/Journal',
    name: 'Journal',
    component: Main,
    meta: {
      title: '日志管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      //  发送email
      {
        path: '/Journal/JournalManage',
        name: 'JournalManage',
        meta: {
          title: '级别管理',
          roles: ['1-3-4']
        },
        component: () => import('@/views/systemSetting/Journal/Journal.vue')
      }
    ]
  }
];
