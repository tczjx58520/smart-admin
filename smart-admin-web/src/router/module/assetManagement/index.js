
import Main from '@/components/main';

import { assetInformation } from './assetInformation';
import { basicSettings } from './basicSettings';

// 业务
export const assetManagement = [
  {
    path: '/assetManagement',
    name: 'assetManagement',
    component: Main,
    meta: {
      title: '资产管理',
      topMenu: true,
      icon: 'icon iconfont iconjiekouwendang',
      roles: ['85-86-4', '85-87-4', '85-88-4', '85-89-4', '85-90-4', '85-91-4', '85-92-4', '85-93-4']
    },
    children: [
      ...basicSettings,
      ...assetInformation
    ]
  }
];
