import { postAxios } from '@/lib/http';
export const attendance = {
  // 班次列表
  findAllShiftInfo: data => {
    let Form = new FormData();
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/attendanceSet/findAllShiftInfo', Form);
  },

  // 新建班次
  addShift: data => {
    if (data) {
      return postAxios('/attendanceSet/addShift', data);
      }
  },

  // 删除班次
  deleteShiftPatch: data => {
    let Form = new FormData();
    if (data) {
      return postAxios('/attendanceSet/deleteShiftPatch?createId=' + data.createId, data.ids);
    }
  },

  // 修改班次
  modifyShift: data => {
    let Form = new FormData();
    if (data) {
      return postAxios('/attendanceSet/modifyShift?createId=' + data.createId, data);
    }
  },

  // 班制列表
  findAllShiftSystemInfo: data => {
    let Form = new FormData();
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/attendanceSet/findAllShiftSystemInfo', Form);
  },

  // 新建班制
  addShiftSystem: data => {
    if (data) {
      return postAxios('/attendanceSet/addShiftSystem', data);
      }
  },

   // 删除班制
   deleteShiftSystemPatch: data => {
    let Form = new FormData();
    if (data) {
      return postAxios('/attendanceSet/deleteShiftSystemPatch?createId=' + data.createId, data.ids);
    }
  },

   // 修改班制
   modifyShiftSystem: data => {
    let Form = new FormData();
    if (data) {
      return postAxios('/attendanceSet/modifyShiftSystem?createId=' + data.createId, data);
    }
  },

  // 班组列表
  findAllShiftGroupInfo: data => {
    let Form = new FormData();
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/attendanceSet/findAllShiftGroupInfo', Form);
  },

  // 新建班组
  addShiftGroup: data => {
    if (data) {
      return postAxios('/attendanceSet/addShiftGroup', data);
      }
  },

   // 删除班组
   deleteShiftGroupPatch: data => {
    let Form = new FormData();
    if (data) {
      return postAxios('/attendanceSet/deleteShiftGroupPatch?createId=' + data.createId, data.ids);
    }
  },

   // 排班设置查询
   findScheduling: data => {
    let Form = new FormData();
    if (data) {
      return postAxios('/attendanceSet/findScheduling?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, data);
    }
  },

 // 排班设置修改
 modifyScheduling: data => {
  let Form = new FormData();
  if (data) {
    return postAxios('/attendanceSet/modifyScheduling', data);
  }
},


// 年假查询
findAnnual: data => {
  let Form = new FormData();
  if (data) {
    return postAxios('/attendanceSet/findAnnual?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, data);
  }
},

  
  // 年假修改
  modifyAnnual: data => {
    if (data) {
      return postAxios('/attendanceSet/modifyAnnual', data);
      }
  },

  // 调休假查询
  findExchangeDay: data => {
  let Form = new FormData();
  if (data) {
    return postAxios('/attendanceSet/findExchangeDay?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, data);
  }
},

  // 自动年假设置
  modifyAnnualSet: data => {
    if (data) {
      return postAxios('/attendanceSet/modifyAnnualSet', data);
      }
  },

  // 自动年假查询
  findAnnualSet: data => {
      return postAxios('/attendanceSet/findAnnualSet');
  },

  // 上下班打卡
  findPunchInfo: data => {
    let Form = new FormData();
    Form.append('employeeId', data);
    return postAxios('/attendancePersonal/findPunchInfo', Form);
  },

    // 上下班打卡修改情况
    modifyPunchInfo: data => {
      if (data) {
        return postAxios('/attendancePersonal/modifyPunchInfo', data);
        }
    },

  // 我的排班表
  personalShift: data => {
    let Form = new FormData();
    Form.append('employeeId', data.employeeId);
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/attendancePersonal/personalShift', Form);
  },

  // 我的假期
  personalHoliday: data => {
    let Form = new FormData();
    Form.append('employeeId', data.employeeId);
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/attendancePersonal/personalHoliday', Form);
  },

    // 加班登记
    findWorkOvertime: data => {
    let Form = new FormData();
    Form.append('employeeId', data.employeeId);
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/attendancePersonal/findWorkOvertime?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, Form);
  },

    // 加班登记新建
    addWorkOvertime: data => {
      if (data) {
        return postAxios('/attendancePersonal/addWorkOvertime', data);
        }
    },

    // 出差登记
    findBusniessOnTrip: data => {
      let Form = new FormData();
      Form.append('employeeId', data.employeeId);
      Form.append('pageNum', data.pageNum);
      Form.append('pageSize', data.pageSize);
      return postAxios('/attendancePersonal/findBusniessOnTrip?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, Form);
    },
  
      // 出差登记新建
      addBusniessOnTrip: data => {
        if (data) {
          return postAxios('/attendancePersonal/addBusniessOnTrip', data);
          }
      },

      // 请假登记
      findApplyLeave: data => {
      let Form = new FormData();
      Form.append('employeeId', data.employeeId);
      Form.append('pageNum', data.pageNum);
      Form.append('pageSize', data.pageSize);
      return postAxios('/attendancePersonal/findApplyLeave?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, Form);
    },
  
      // 请假登记新建
      addApplyLeave: data => {
        if (data) {
          return postAxios('/attendancePersonal/addApplyLeave', data);
          }
      },

      // 销假登记
      addTerminalLeave: data => {
        if (data) {
          return postAxios('/attendancePersonal/addTerminalLeave', data);
          }
      },

      // 外出登记
      findWorkOutside: data => {
        let Form = new FormData();
        Form.append('employeeId', data.employeeId);
        Form.append('pageNum', data.pageNum);
        Form.append('pageSize', data.pageSize);
        return postAxios('/attendancePersonal/findWorkOutside?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, Form);
      },
    
        // 外出登记新建
        addWorkOutside: data => {
          if (data) {
            return postAxios('/attendancePersonal/addWorkOutside', data);
            }
        },

         // 外出统计
         outsideStatistical: data => {
    let Form = new FormData();
    if (data) {
      return postAxios('/attendanceStatistical/outsideStatistical?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, data);
    }
  },

  // 请假统计
  vocationStatistical: data => {
    let Form = new FormData();
    if (data) {
      return postAxios('/attendanceStatistical/vocationStatistical?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, data);
    }
  },

  // 出差统计
  businessOnTripStatistical: data => {
    let Form = new FormData();
    if (data) {
      return postAxios('/attendanceStatistical/businessOnTripStatistical?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, data);
    }
  },
// 加班统计
workOverTimeStatistical: data => {
  let Form = new FormData();
  if (data) {
    return postAxios('/attendanceStatistical/workOverTimeStatistical?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, data);
  }
},

// 设置考勤人员查询
findAttendanceEmployeeSet: data => {
  let Form = new FormData();
  if (data) {
    return postAxios('/attendanceSet/findAttendanceEmployeeSet?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, data);
  }
},
// 手机考勤设置查询
findAddressForMobile: data => {
  let Form = new FormData();
  if (data) {
    return postAxios('/attendanceSet/findAddressForMobile?pageSize=' + data.pageSize + '& pageNum =' + data.pageNum, data);
  }
},

// 手机考勤设置修改
modifyAttendanceEmployeeSet: data => {
  if (data) {
    return postAxios('/attendanceSet/modifyAttendanceEmployeeSet', data);
    }
},

// 手机考勤设置新建
addAddressForMobile: data => {
  if (data) {
    return postAxios('/attendanceSet/addAddressForMobile', data);
    }
},
// 手机考勤设置删除
removeAddressForMobile: data => {
  if (data) {
    return postAxios('/attendanceSet/removeAddressForMobile?createId=' + data.createId, data);
    }
},
// 设置考勤人员修改
modifyAttendanceEmployeeSet: data => {
  if (data) {
    return postAxios('/attendanceSet/modifyAttendanceEmployeeSet', data);
    }
},
}