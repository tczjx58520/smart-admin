import { postAxios } from '@/lib/http';

export const personSetting = {
  // 添加群组
  addGroup: data => {
    return postAxios('/personalSetting/addGroup', data);
  },
  // 删除群组
  deleteGroup: data => {
    return postAxios('/personalSetting/removeGroup', data);
  },
  // 查询群组
  findGroup: data => {
    let Form = new FormData();
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    return postAxios('/personalSetting/findGroup', Form);
  },
  // 修改密码
  updatePassword: data => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    if (data.newPwd !== undefined && data.newPwd !== null && data.newPwd !== '') {
      Form.append('newPwd', data.newPwd);
    }
    if (data.oldPwd !== undefined && data.oldPwd !== null && data.oldPwd !== '') {
      Form.append('oldPwd', data.oldPwd);
    }
    return postAxios('/personalSetting/modifyPassword', Form);
  }

}
  ;
