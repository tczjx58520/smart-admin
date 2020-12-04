
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
      roles: ['1-3-4']
    },
    children: [
      ...processDo,
      ...processManagement,
      ...processSettings
    ]
  }
];
