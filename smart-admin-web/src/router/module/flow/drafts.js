import Main from '@/components/main';
export const drafts = [
  {
    path: '/drafts',
    name: 'draftsManage',
    component: Main,
    meta: {
      title: '草稿箱管理',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/flow/drafts',
        name: 'drafts',
        meta: {
          title: '草稿箱',
          roles: ['1-3-4']
        },
        component: () => import('@/views/flow/drafts/drafts')
      }
    ]
  }
];
