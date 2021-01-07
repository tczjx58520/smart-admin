import Main from '@/components/main';
export const AddressBook = [
  {
    path: '/addressBook',
    name: 'addressBook',
    component: Main,
    meta: {
      title: '通讯录',
      icon: 'ios-paper-outline',
      roles: ['1-3-4']
    },
    children: [
      {
        path: '/addressBook/myAddressBook',
        name: 'myAddressBook',
        meta: {
          title: '我的通讯录',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/mailList/myAddressBook')
      },
      {
        path: '/addressBook/internalAddressBook',
        name: 'internalAddressBook',
        meta: {
          title: '内部通讯录',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/mailList/internalAddressBook')
      },
      {
        path: '/addressBook/publicAddressBook',
        name: 'publicAddressBook',
        meta: {
          title: '公共通讯录',
          roles: ['1-3-4']
        },
        component: () => import('@/views/personalOffice/mailList/publicAddressBook')
      },
    ]
  }
];
