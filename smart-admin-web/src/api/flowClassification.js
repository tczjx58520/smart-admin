import { postAxios } from '@/lib/http';

export const FlowCategoryApi = {
  // 添加流程分类
  addGroup: data => {
    let Form = new FormData();
    Form.append('categoryName', data.categoryName);
    if (data.startOrganize !== undefined && data.startOrganize !== null && data.startOrganize !== '') {
      Form.append('startOrganize', data.startOrganize);
    }
    if (data.startPost !== undefined && data.startPost !== null && data.startPost !== '') {
      Form.append('startPost', data.startPost);
    }
    if (data.startEmp !== undefined && data.startEmp !== null && data.startEmp !== '') {
      Form.append('startEmp', data.startEmp);
    }
    if (data.forbidOrganize !== undefined && data.forbidOrganize !== null && data.forbidOrganize !== '') {
      Form.append('forbidOrganize', data.forbidOrganize);
    }
    if (data.forbidPost !== undefined && data.forbidPost !== null && data.forbidPost !== '') {
      Form.append('forbidPost', data.forbidPost);
    }
    if (data.forbidEmp !== undefined && data.forbidEmp !== null && data.forbidEmp !== '') {
      Form.append('forbidEmp', data.forbidEmp);
    }
    if (data.queryOrganize !== undefined && data.queryOrganize !== null && data.queryOrganize !== '') {
      Form.append('queryOrganize', data.queryOrganize);
    }
    if (data.queryPost !== undefined && data.queryPost !== null && data.queryPost !== '') {
      Form.append('queryPost', data.queryPost);
    }
    if (data.queryEmp !== undefined && data.queryEmp !== null && data.queryEmp !== '') {
      Form.append('queryEmp', data.queryEmp);
    }
    if (data.manageOrganize !== undefined && data.manageOrganize !== null && data.manageOrganize !== '') {
      Form.append('manageOrganize', data.manageOrganize);
    }
    if (data.managePost !== undefined && data.managePost !== null && data.managePost !== '') {
      Form.append('managePost', data.managePost);
    }
    if (data.manageEmp !== undefined && data.manageEmp !== null && data.manageEmp !== '') {
      Form.append('manageEmp', data.manageEmp);
    }
    if (data.remark !== undefined && data.remark !== null && data.remark !== '') {
      Form.append('remark', data.remark);
    }
    Form.append('createId', data.createPersonId);
    return postAxios('/FlowCategory/addFlowCategory', Form);
  },
  // 删除流程分类
  delGroup: data => {
    let Form = new FormData();
    Form.append('id', data.id);
    Form.append('operatId', data.operatId);
    return postAxios('/FlowCategory/deleteFlowCategory', Form);
  },
  // 更新流程分类
  updateGroup: data => {
    let Form = new FormData();
    Form.append('id', data.id);
    if (data.categoryName !== undefined && data.categoryName !== null && data.categoryName !== '') {
      Form.append('categoryName', data.categoryName);
    }
    if (data.remark !== undefined && data.remark !== null && data.remark !== '') {
      Form.append('remark', data.remark);
    }
    if (data.startOrganize !== undefined && data.startOrganize !== null && data.startOrganize !== '') {
      Form.append('startOrganize', data.startOrganize);
    }
    if (data.startPost !== undefined && data.startPost !== null && data.startPost !== '') {
      Form.append('startPost', data.startPost);
    }
    if (data.startEmp !== undefined && data.startEmp !== null && data.startEmp !== '') {
      Form.append('startEmp', data.startEmp);
    }
    if (data.forbidOrganize !== undefined && data.forbidOrganize !== null && data.forbidOrganize !== '') {
      Form.append('forbidOrganize', data.forbidOrganize);
    }
    if (data.forbidPost !== undefined && data.forbidPost !== null && data.forbidPost !== '') {
      Form.append('forbidPost', data.forbidPost);
    }
    if (data.forbidEmp !== undefined && data.forbidEmp !== null && data.forbidEmp !== '') {
      Form.append('forbidEmp', data.forbidEmp);
    }
    if (data.queryOrganize !== undefined && data.queryOrganize !== null && data.queryOrganize !== '') {
      Form.append('queryOrganize', data.queryOrganize);
    }
    if (data.queryPost !== undefined && data.queryPost !== null && data.queryPost !== '') {
      Form.append('queryPost', data.queryPost);
    }
    if (data.queryEmp !== undefined && data.queryEmp !== null && data.queryEmp !== '') {
      Form.append('queryEmp', data.queryEmp);
    }
    if (data.manageOrganize !== undefined && data.manageOrganize !== null && data.manageOrganize !== '') {
      Form.append('manageOrganize', data.manageOrganize);
    }
    if (data.managePost !== undefined && data.managePost !== null && data.managePost !== '') {
      Form.append('managePost', data.managePost);
    }
    if (data.manageEmp !== undefined && data.manageEmp !== null && data.manageEmp !== '') {
      Form.append('manageEmp', data.manageEmp);
    }
    Form.append('modifyPersonId', data.modifyPersonId);
    return postAxios('/FlowCategory/updateFlowCategory', Form);
  },
  // 查询流程分类
  getGroup: data => {
    let Form = new FormData();
    if (data.categoryName !== undefined && data.categoryName !== null && data.categoryName !== '') {
      Form.append('categoryName', data.categoryName);
    }
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/FlowCategory/searchFlowCategory', Form);
  },
  // 查询员工可发起流程 POST
  getEmpStart: data => {
    let Form = new FormData();
    if (data.empId !== undefined && data.empId !== null && data.empId !== '') {
      Form.append('empId', data.empId);
    }
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    return postAxios('/FlowCategory/getCanStart', Form);
  }
}
;
