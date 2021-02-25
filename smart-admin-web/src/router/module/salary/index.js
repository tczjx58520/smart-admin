
import Main from '@/components/main';

import { salaryManagement } from './salaryManagement';
import { basicSettings } from './basicSettings';

// 业务
export const salary = [
  {
    path: '/salary',
    name: 'salary',
    component: Main,
    meta: {
      title: '薪酬设置',
      topMenu: true,
      icon: 'icon iconfont iconjiekouwendang',
      roles: ['19-20-4', '19-120-4', '19-21-4', '19-22-4', '19-23-4', '19-24-4', '19-25-4', '19-26-4', '19-27-4', '19-28-4', '19-29-4', '19-30-4']
    },
    children: [
      ...salaryManagement,
      ...basicSettings
    ]
  }
];
