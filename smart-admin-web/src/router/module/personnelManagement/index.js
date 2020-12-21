
import Main from '@/components/main';

import { personnelRelations } from './empInduction';
import { traning } from './traning';
import { examination } from './examination';
import { personnelAnalysis } from './personnelAnalysis';
import { employeeFile } from './employeeFile';
import { personnelProfile } from './personnelProfile';
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
      ...personnelProfile,
      ...personnelRelations,
      ...traning,
      ...examination,
      ...personnelAnalysis,
      ...employeeFile,
    ]
  }
];
