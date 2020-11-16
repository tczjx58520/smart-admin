
import Main from '@/components/main';

import { jobStatus } from './jobStatus';
import { attendanceRecord } from './attendanceRecord'
import { attendanceSetting } from './attendanceSetting'
import { scheduleSetting } from './scheduleSetting'
import { attendanceMachineRecords } from './attendanceMachineRecords'
// 业务
export const workAttendance = [
  {
    path: '/attendance',
    name: 'attendance',
    component: Main,
    meta: {
      title: '考勤管理',
      topMenu: true,
      icon: 'icon iconfont iconjiekouwendang',
      roles: ['1-3-4']
    },
    children: [
      ...jobStatus,
      ...attendanceRecord,
      ...attendanceSetting,
      ...scheduleSetting,
      ...attendanceMachineRecords
    ]
  }
];
