import Main from '@/components/main';
export const customerComplaints = [
  {
    path: '/customerComplaints',
    name: 'customerComplaints',
    component: Main,
    meta: {
      title: '客户投诉',
      icon: 'ios-paper-outline',
      roles: ['10-11-4']
    },
    children: [
      //  assetDetail
      {
        path: '/publicRelationShip/customerComplaintsList',
        name: 'customerComplaintsList',
        meta: {
          title: '客户投诉列表',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/publicRelationShip/customerComplaints/customerComplaintsList.vue')
      },
      {
        path: '/publicRelationShip/customerComplaintsDetail',
        name: 'customerComplaintsDetail',
        meta: {
          title: '客户投诉详情',
          roles: ['10-11-4', '10-12-4'],
          hideInMenu: true,
          noKeepAlive: true
        },
        component: () => import('@/views/publicRelationShip/customerComplaints/customerComplaintsDetail.vue')
      },
      {
        path: '/publicRelationShip/followCustomerComplaints',
        name: 'followCustomerComplaints',
        meta: {
          title: '客户投诉跟进',
          roles: ['10-11-4', '10-12-4'],
          hideInMenu: true,
          noKeepAlive: true
        },
        component: () => import('@/views/publicRelationShip/followCustomerComplaints/followCustomerComplaints.vue')
      }
    ]
  }
];
