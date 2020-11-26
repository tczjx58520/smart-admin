
import Main from '@/components/main';

import { assessmentTask } from './assessmentTask';
import { conductAnAssessment } from './conductAnAssessment';
import { indicatorSet } from './indicatorSet';
import { indicatorSingle } from './indicatorSingle';
import { viewTask } from './viewTask';

// 业务
export const performance = [
  {
    path: '/performance',
    name: 'performance',
    component: Main,
    meta: {
      title: '绩效管理',
      topMenu: true,
      icon: 'icon iconfont iconjiekouwendang',
      roles: ['1-3-4']
    },
    children: [
      ...assessmentTask,
      ...conductAnAssessment,
      ...indicatorSet,
      ...viewTask,
      ...indicatorSingle
    ]
  }
];
