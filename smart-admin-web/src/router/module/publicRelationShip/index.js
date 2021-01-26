
import Main from '@/components/main';
import { classifiCation } from './classifiCation';
import { customerCenter } from './customerCenter';
import { customerComplaints } from './customerComplaints';
import { publicEvents } from './publicEvents';
import { publicRelationsContact } from './publicRelationsContact';
import { typesOfComplaints } from './typesOfComplaints';

// 业务
export const publicRelationShip = [
  {
    path: '/publicRelationShip',
    name: 'publicRelationShip',
    component: Main,
    meta: {
      title: '公共关系',
      topMenu: true,
      icon: 'icon iconfont iconjiekouwendang',
      roles: ['10-16-4', '10-11-4', '10-12-4', '10-19-4', '10-17-4', '10-18-4', '10-15-4', '10-19-4', '10-20-4', '10-21-4', '10-22-4']
    },
    children: [
      ...publicEvents,
      ...publicRelationsContact,
      ...typesOfComplaints,
      ...classifiCation,
      ...customerComplaints,
      ...customerCenter
    ]
  }
];
