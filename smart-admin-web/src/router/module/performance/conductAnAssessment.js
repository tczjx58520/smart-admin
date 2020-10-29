import Main from '@/components/main';
export const conductAnAssessment = [
  {
    path: '/conductAnAssessment',
    name: 'conductAnAssessmentManage',
    component: Main,
    meta: {
      title: '进行考核',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      //  发送email
      {
        path: '/performance/conductAnAssessment',
        name: 'conductAnAssessment',
        meta: {
          title: '进行考核',
          roles: ['1-3-4']
        },
        component: () => import('@/views/performance/conductAnAssessment/conductAnAssessment.vue')
      }
    ]
  }
];
