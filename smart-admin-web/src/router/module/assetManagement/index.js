
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
      roles: ['10-16-4', '10-11-4', '10-12-4', '10-19-4', '10-17-4', '10-18-4', '10-15-4', '10-19-4', '10-20-4', '10-21-4', '10-22-4']
    },
    children: [
      ...basicSettings,
      ...assetInformation
    ]
  }
];
