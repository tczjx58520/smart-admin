import { postAxios } from '@/lib/http';

export const FlowCategoryApi = {
  // 添加流程分类
  addGroup: data => {
    let Form = new FormData();
    Form.append('categoryName', data.categoryName);
    if (data.remark !== undefined && data.remark !== null && data.remark !== '') {
      Form.append('remark', data.remark);
    }
    Form.append('createPersonId', data.createPersonId);
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
  }
}
;
