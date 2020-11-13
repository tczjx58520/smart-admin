
import Main from '@/components/main';

import { flowClassification } from './flowClassification';
import { processDesign } from './processDesign';
import { flowStart } from './flowStart';
import { toDoFlow } from './unDoFlow';
import { workDelegation } from './workDelegation';
import { flowWatch } from './flowWatch';
import { recall } from './recall';
import { drafts } from './drafts';
import { standingbook } from './standingbook';
import { timeout } from './timeout';
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
      ...flowClassification,
      ...processDesign,
      ...flowStart,
      ...toDoFlow,
      ...workDelegation,
      ...flowWatch,
      ...recall,
      ...drafts,
      ...standingbook,
      ...timeout
    ]
  }
];
