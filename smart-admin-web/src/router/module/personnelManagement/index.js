
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
      roles: ['59-60-4', '59-61-4', '59-62-4', '59-63-4', '59-64-4', '59-65-4', '59-66-4', '59-67-4', '59-68-4', '59-69-4']
    },
    children: [
      ...personnelProfile,
      ...personnelRelations,
      ...traning,
      ...examination,
      ...personnelAnalysis,
      ...employeeFile
    ]
  }
];
