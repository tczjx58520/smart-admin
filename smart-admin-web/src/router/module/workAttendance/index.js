
import Main from '@/components/main';

import { jobStatus } from './jobStatus';
import { attendanceRecord } from './attendanceRecord'
import { attendanceSetting } from './attendanceSetting'
import { scheduleSetting } from './scheduleSetting'
import { attendanceMachineRecords } from './attendanceMachineRecords'
import { holidayRecords } from './holidayRecords'
import { punchTheClock } from './punchTheClock'
import { myAttendance } from './myAttendance'
import { workOvertimeRegistration } from './workOvertimeRegistration'
import { businessTravel } from './businessTravel'
import { leaveRegister } from './leaveRegister'
import { goOutRegister } from './goOutRegister'
import { fillClock } from './fillClock'
import { attendanceStatistical } from './attendanceStatistical'
import { setAttendancePerson } from './setAttendancePerson'
import { phoneAttendanceSetting } from './phoneAttendanceSetting'
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
      ...attendanceMachineRecords,
      ...holidayRecords,
      ...punchTheClock,
      ...myAttendance,
      ...workOvertimeRegistration,
      ...businessTravel,
      ...leaveRegister,
      ...goOutRegister,
      ...fillClock,
      ...attendanceStatistical,
      ...setAttendancePerson,
      ...phoneAttendanceSetting
    ]
  }
];
