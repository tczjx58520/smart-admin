
import Main from '@/components/main';

import { collectAccounts } from './collectAccounts';
import { mysalary } from './mysalary';
import { salarycount } from './salarycount';
import { salaryEntry } from './salaryEntry';
import { salaryjudge } from './salaryjudge';
import { salaryOption } from './salaryOption';
import { socialSecurityFund } from './socialSecurityFund';
import { welfare } from './welfare';

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
      roles: ['10-16-4', '10-11-4', '10-12-4', '10-19-4', '10-17-4', '10-18-4', '10-15-4', '10-19-4', '10-20-4', '10-21-4', '10-22-4']
    },
    children: [
      ...collectAccounts,
      ...mysalary,
      ...salarycount,
      ...salaryEntry,
      ...salaryjudge,
      ...salaryOption,
      ...socialSecurityFund,
      ...welfare
    ]
  }
];
