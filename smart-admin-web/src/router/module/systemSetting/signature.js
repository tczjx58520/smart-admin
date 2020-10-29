import Main from '@/components/main';
export const signature = [
  {
    path: '/signature',
    name: 'signature',
    component: Main,
    meta: {
      title: '签章管理',
      icon: 'ios-paper-outline',
      roles: ['1-2-1']
    },
    children: [
      //  发送email
      {
        path: '/signature/signatureManage',
        name: 'signatureManage',
        meta: {
          title: '签章列表',
          roles: ['1-2-1']
        },
        component: () => import('@/views/systemSetting/employee/signature/signature-list.vue')
      }
    ]
  }
];
