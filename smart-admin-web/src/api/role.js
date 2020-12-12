import { postAxios, getAxios } from '@/lib/http';
export const roleApi = {
  // 添加角色
  addRole: (data, data2) => {
    let Form = new FormData();
    if (data.rolename !== undefined && data.rolename !== null && data.rolename !== '') {
      Form.append('rolename', data.rolename);
    }
    if (data.description !== undefined && data.description !== null && data.description !== '') {
      Form.append('description', data.description);
    }
    if (data.createPersonId !== undefined && data.createPersonId !== null && data.createPersonId !== '') {
      Form.append('createPersonId', data.createPersonId);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('authority', data2);
    }
    return postAxios('/role/addrole', Form);
  },
  // 删除角色
  deleteRole: data => {
    let Form = new FormData();
    Form.append('roleid', data.roleid);
    Form.append('operatId', data.operatId);
    return postAxios('/role/deleterole', Form);
  },
  // 修改角色
  updateRole: (data, data2) => {
    let Form = new FormData();
    if (data.rolename !== undefined && data.rolename !== null && data.rolename !== '') {
      Form.append('roleName', data.rolename);
    }
    if (data.operatId !== undefined && data.operatId !== null && data.operatId !== '') {
      Form.append('operatId', data.operatId);
    }
    if (data.description !== undefined && data.description !== null && data.description !== '') {
      Form.append('description', data.description);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('authority', data2);
    }
    Form.append('roleid', data.roleid);
    return postAxios('/role/updaterole', Form);
  },
  // 获取权限列表
  getRoleDetail: () => {
    return postAxios('/role/getauthoritydetaillist');
  },
  // 加载角色列表
  getAllRole: (data) => {
    let Form = new FormData();
    if (data.deptid !== undefined && data.deptid !== null && data.deptid !== '') {
      Form.append('deptid', data.deptid);
    }
    return postAxios('/role/getrolelist', Form);
  },
  // 根据id获取角色
  getDetailById: (data) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('detailId', data);
    }
    return postAxios('/role/getDetailById', Form);
  }
};
