
import Main from '@/components/main';
import { AddressBook } from './addressBook';
import { PersonalSetting } from './personalSetting';
import { WorkReport } from './workReport';
import { PlanManagement } from './planManagement';
import { TaskManage } from './taskManage';
import { Statistic } from './statistic';

// 业务
export const office = [
  {
    path: '/office',
    name: 'office',
    component: Main,
    meta: {
      title: '个人办公',
      topMenu: true,
      icon: 'icon iconfont iconjiekouwendang',
      roles: ['1-3-4']
    },
    children: [
      ...AddressBook,
      ...PersonalSetting,
      ...WorkReport,
      ...PlanManagement,
      ...TaskManage,
      ...Statistic

    ]
  }
];
