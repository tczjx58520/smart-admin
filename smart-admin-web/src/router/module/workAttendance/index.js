
import Main from '@/components/main';
import { personalAttendance } from './personalAttendance';
import { attendanceManagers } from './attendanceManagers';
import { attendanceSettings } from './attendanceSettings';
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
      ...personalAttendance,
      ...attendanceManagers,
      ...attendanceSettings
    ]
  }
];
