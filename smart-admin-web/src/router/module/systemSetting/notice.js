import Main from '@/components/main';
export const notice = [
  {
    path: '/notice',
    name: 'noticeManage',
    component: Main,
    meta: {
      title: '内部消息',
      icon: 'ios-paper-outline',
      roles: ['1-9-4']
    },
    children: [
      //  发送email
      {
        path: '/notice/noticeList',
        name: 'noticeList',
        meta: {
          title: '内部消息',
          roles: ['1-9-4']
        },
        component: () => import('@/views/systemSetting/email/email-list.vue')
      },
      {
        path: '/notice/notice',
        name: 'notice',
        meta: {
          title: '编辑内部消息',
          roles: ['1-9-4'],
          hideInMenu: true
        },
        component: () => import('@/views/systemSetting/email/send-mail.vue')
      }
    ]
  }
];
