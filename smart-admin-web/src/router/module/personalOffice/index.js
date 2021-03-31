
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
      roles: ['101-102-4', '101-103-4', '101-104-4', '101-105-4', '101-106-4', '101-107-4', '101-108-4', '101-109-4', '101-110-4', '101-111-4', '101-112-4', '101-113-4', '101-114-4', '101-115-4', '101-116-4', '101-117-4', '101-118-4']
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
