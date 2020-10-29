import { postAxios, getAxios } from '@/lib/http';
export const usermanagelApi = {
  queryList: data => {
    let Form = new FormData();
    if (data.employeename) {
      Form.append('employeename', data.employeename);
    }
    if (data.operatorId) {
      Form.append('operatorId', data.operatorId);
    }
    if (data.organizationOa) {
      Form.append('organizationOa', data.organizationOa);
    }
    if (data.postOa) {
      Form.append('postOa', data.postOa);
    }
    if (data.empId) {
      Form.append('empId', data.empId);
    }
    if (data.stat) {
      Form.append('stat', data.stat);
    }
    if (data.account) {
      Form.append('account', data.account);
    }
    if (data.roleOa) {
      Form.append('roleOa', data.roleOa);
    }
    Form.append('loginRepositoryId', data.loginRepositoryId);
    Form.append('pagenum', data.pageNum);
    Form.append('pagesize', data.pageSize);
    return postAxios('/employee/getemplist', Form);
  },
  register: (data, data2) => {
    let Form = new FormData();
    if (data.phone) {
      Form.append('phone', data.phone);
    }
    if (data.mail) {
      Form.append('email', data.mail);
    }
    if (data.postOa) {
      Form.append('postOa', data.postOa);
    }
    if (data.roleOa) {
      Form.append('roleOa', data.roleOa);
    }
    if (data.organizationOa) {
      Form.append('organizationOa', data.organizationOa);
    }
    if (data.stat) {
      Form.append('stat', data.stat);
    }
    if (data2.account) {
      Form.append('account', data2.account);
    }
    if (data2.passwd) {
      Form.append('passwd', data2.passwd);
    }
    Form.append('firstname', data.firstname); // 你要传给后台的参数值 key/value
    Form.append('middlename', data.middlename); // 你要传给后台的参数值 key/value
    Form.append('lastname', data.lastname); // 你要传给后台的参数值 key/value
    return postAxios('/employee/register', Form);
  },
  //   删除
  delete: data => {
    let Form = new FormData();
    if (data.empids) {
      Form.append('empids', data.empids);
    }
    return postAxios('/employee/deleteemp', Form);
  },
  // 启用停用
  isWork: data => {
    let Form = new FormData();
    Form.append('empids', data.empids);
    Form.append('stat', data.stat);
    return postAxios('/employee/startorendemp', Form);
  },
  // 更新用户
  updateUser: (data, data2) => {
    let Form = new FormData();
    if (data.phone) {
      Form.append('phone', data.phone);
    }
    if (data.mail) {
      Form.append('email', data.mail);
    }
    if (data.postOa) {
      Form.append('postOa', data.postOa);
    }
    if (data.roleOa) {
      Form.append('roleOa', data.roleOa);
    }
    if (data.organizationOa) {
      Form.append('organizationOa', data.organizationOa);
    }
    if (data.stat) {
      Form.append('stat', data.stat);
    }
    if (data2.account) {
      Form.append('account', data2.account);
    }
    if (data2.passwd) {
      Form.append('passwd', data2.passwd);
    }
    Form.append('employeeid', data.id); // 你要传给后台的参数值 key/value
    Form.append('firstname', data.firstname); // 你要传给后台的参数值 key/value
    Form.append('middlename', data.middlename); // 你要传给后台的参数值 key/value
    Form.append('lastname', data.lastname); // 你要传给后台的参数值 key/value
    return postAxios('/employee/updateemp', Form);
  },
  // 员工查询薪酬
  querySalaryList: data => {
    let Form = new FormData();
    if (data.employeename) {
      Form.append('employeename', data.employeename);
    }
    if (data.operatorId) {
      Form.append('operatorId', data.operatorId);
    }
    if (data.organizationOa) {
      Form.append('organizationOa', data.organizationOa);
    }
    if (data.postOa) {
      Form.append('postOa', data.postOa);
    }
    Form.append('yearAndMonth', data.yearAndMonth);
    Form.append('loginRepositoryId', data.loginRepositoryId);
    Form.append('pagenum', data.pageNum);
    Form.append('pagesize', data.pageSize);
    return postAxios('/employee/getEmpSalaryInfo', Form);
  },
  // 获取角色列表
  getroleList: data => {
    let Form = new FormData();
    // if (data.deptid) {
    //   Form.append('deptid', data.deptid);
    // }
    return postAxios('/role/getrolelist', Form);
  }
};
