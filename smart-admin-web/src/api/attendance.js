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

  //  // 修改班组
  //  modifyShiftSystem: data => {
  //   let Form = new FormData();
  //   if (data) {
  //     return postAxios('/attendanceSet/modifyShiftSystem?createId=' + data.createId, data);
  //   }
  // },

}