import Main from '@/components/main';
export const personalAttendance = [
  {
    path: '/personalAttendance',
    name: 'personalAttendance',
    component: Main,
    meta: {
      title: '个人考勤',
      icon: 'ios-paper-outline',
      roles: ['42-43-4', '42-44-4', '42-45-4', '42-46-4', '42-47-4', '42-48-4', '42-49-4']
    },
    children: [
      {
        path: '/personalAttendance/myAttendance',
        name: 'myAttendance',
        meta: {
          title: '在岗状态',
          roles: ['42-43-4']
        },
        component: () => import('@/views/attendance/myAttendance/myAttendance.vue')
      },
      {
        path: '/personalAttendance/punchTheClock',
        name: 'punchTheClock',
        meta: {
          title: '在岗状态',
          roles: ['42-44-4']
        },
        component: () => import('@/views/attendance/punchTheClock/punchTheClock.vue')
      },
      {
        path: '/personalAttendance/workOvertimeRegistration',
        name: 'workOvertimeRegistration',
        meta: {
          title: 'workOvertimeRegistration',
          roles: ['42-45-4']
        },
        component: () => import('@/views/attendance/workOvertimeRegistration/workOvertimeRegistration.vue')
      },
      {
        path: '/personalAttendance/businessTravel',
        name: 'businessTravel',
        meta: {
          title: 'businessTravel',
          roles: ['42-46-4']
        },
        component: () => import('@/views/attendance/businessTravel/businessTravel.vue')
      },
      {
        path: '/personalAttendance/leaveRegister',
        name: 'leaveRegister',
        meta: {
          title: '请假登记',
          roles: ['42-47-4']
        },
        component: () => import('@/views/attendance/leaveRegister/leaveRegister.vue')
      },
      {
        path: '/personalAttendance/goOutRegister',
        name: 'goOutRegister',
        meta: {
          title: 'goOutRegister',
          roles: ['42-48-4']
        },
        component: () => import('@/views/attendance/goOutRegister/goOutRegister.vue')
      },
      {
        path: '/personalAttendance/fillClock',
        name: 'fillClock',
        meta: {
          title: 'fillClock',
          roles: ['42-49-4']
        },
        component: () => import('@/views/attendance/fillClock/fillClock.vue')
      }
    ]
  }
];
