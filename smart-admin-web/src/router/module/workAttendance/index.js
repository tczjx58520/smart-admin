
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
      roles: ['42-43-4', '42-44-4', '42-45-4', '42-46-4', '42-47-4', '42-48-4', '42-49-4', '42-50-4', '42-51-4', '42-52-4', '42-53-4', '42-54-4', '42-55-4', '42-56-4', '42-57-4', '42-58-4']
    },
    children: [
      ...personalAttendance,
      ...attendanceManagers,
      ...attendanceSettings
    ]
  }
];
