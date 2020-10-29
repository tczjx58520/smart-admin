import { postAxios } from '@/lib/http';

export const groupApi = {
  // 添加群组
  addGroup: data => {
    let Form = new FormData();
    Form.append('groupName', data.groupName);
    if (data.remarks !== undefined && data.remarks !== null && data.remarks !== '') {
      Form.append('remarks', data.remarks);
    }
    Form.append('createId', data.createId);
    return postAxios('/empGroup/addGroup', Form);
  },
  // 删除群组
  delGroup: data => {
    let Form = new FormData();
    Form.append('groupId', data.groupId);
    Form.append('operatId', data.operatId);
    return postAxios('/empGroup/deleteGroup', Form);
  },
  // 更新群组
  updateGroup: data => {
    let Form = new FormData();
    Form.append('groupId', data.groupId);
    if (data.groupName !== undefined && data.groupName !== null && data.groupName !== '') {
      Form.append('groupName', data.groupName);
    }
    if (data.remarks !== undefined && data.remarks !== null && data.remarks !== '') {
      Form.append('remarks', data.remarks);
    }
    Form.append('operatId', data.operatId);
    return postAxios('/empGroup/deleteGroup', Form);
  },
  // 查询群组
  getGroup: data => {
    let Form = new FormData();
    // if (data.groupId !== undefined && data.groupId !== null && data.groupId !== '') {
    //   Form.append('groupId', data.groupId);
    // }
    return postAxios('/empGroup/groupList', Form);
  },
  // 群组加人
  addGroupPerson: data => {
    let Form = new FormData();
    Form.append('groupId', data.groupId);
    Form.append('empIds', data.empIds);
    Form.append('operatId', data.operatId);
    return postAxios('/empGroup/addEmpToGroup', Form);
  },
  // 群组删除人
  delGroupPerson: data => {
    let Form = new FormData();
    Form.append('groupId', data.groupId);
    Form.append('empIds', data.empIds);
    Form.append('operatId', data.operatId);
    return postAxios('/empGroup/deleteEmpToGroup', Form);
  }
}
;
