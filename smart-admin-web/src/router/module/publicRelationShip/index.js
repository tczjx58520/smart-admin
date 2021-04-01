
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
      roles: ['94-95-4', '94-96-4', '94-97-4', '94-98-4', '94-99-4', '94-100-4']
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
