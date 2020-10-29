
import Main from '@/components/main';

import { level } from './level';
import { role } from './role';
import { levelCategory } from './levelCategory';
import { position } from './position';
import { organization } from './organization';
import { Journal } from './Journal';
import { usermanage } from './usermanage';
import { groupmanage } from './groupmanage';
import { notice } from './notice';
import { signature } from './signature';
// 业务
export const systemSetting = [
  {
    path: '/systemSetting',
    name: 'systemSetting',
    component: Main,
    meta: {
      title: '系统设置',
      topMenu: true,
      icon: 'icon iconfont iconxitongshezhi',
      roles: ['1-2-4', '1-3-4', '1-4-4', '1-5-4', '1-6-4', '1-7-4', '1-8-4', '1-9-4']
    },
    children: [
      ...level,
      ...role,
      ...levelCategory,
      ...position,
      ...organization,
      ...Journal,
      ...usermanage,
      ...groupmanage,
      ...notice,
      ...signature
    ]
  }
];
