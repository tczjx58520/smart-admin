import Main from '@/components/main';
export const salaryjudge = [
  {
    path: '/salaryjudge',
    name: 'salaryjudgeManage',
    component: Main,
    meta: {
      title: '薪酬审批',
      icon: 'ios-paper-outline',
      roles: ['10-20-4']
    },
    children: [
      //  发送email
      {
        path: '/salary/salaryjudge',
        name: 'salaryjudge',
        meta: {
          title: '薪酬审批',
          roles: ['10-20-4']
        },
        component: () => import('@/views/salary/salaryjudge/salaryjudge.vue')
      }
    ]
  }
];
