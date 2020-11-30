
import Main from '@/components/main';

import { personnelRelations } from './empInduction';
// 业务
export const personnelManagement = [
  {
    path: '/personnelManagement',
    name: 'personnelManagement',
    component: Main,
    meta: {
      title: '人事管理',
      topMenu: true,
      icon: 'icon iconfont iconxitongshezhi',
      roles: ['1-2-4']
    },
    children: [
      ...personnelRelations
    ]
  }
];
