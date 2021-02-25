
import Main from '@/components/main';
import { processDo } from './processDo';
import { processManagement } from './processManagement';
import { processSettings } from './processSettings';
// 业务
export const flow = [
  {
    path: '/flow',
    name: 'flow',
    component: Main,
    meta: {
      title: '流程管理',
      topMenu: true,
      icon: 'icon iconfont iconjiekouwendang',
      roles: ['31-32-4', '31-33-4', '31-34-4', '31-35-4', '31-36-4', '31-37-4', '31-38-4', '31-39-4', '31-40-4', '31-41-4']
    },
    children: [
      ...processDo,
      ...processManagement,
      ...processSettings
    ]
  }
];
