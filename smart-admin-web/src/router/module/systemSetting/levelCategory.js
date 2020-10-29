import Main from '@/components/main';
export const levelCategory = [
  {
    path: '/levelCategory',
    name: 'levelCategory',
    component: Main,
    meta: {
      title: '级别管理',
      icon: 'ios-paper-outline',
      roles: ['1-2-4']
    },
    children: [
      //  发送email
      {
        path: '/levelCategory/levelCategorylManage',
        name: 'levelCategoryManage',
        meta: {
          title: '级别种类管理',
          roles: ['1-2-4']
        },
        component: () => import('@/views/systemSetting/employee/levelCategory/level-category-list.vue')
      }
    ]
  }
];
