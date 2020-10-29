import { postAxios } from '@/lib/http';
export const indicatorSetApi = {
  // 添加指标集
  addindicator: data => {
    let Form = new FormData();
    Form.append('name', data.name);
    if (data.content !== undefined && data.content !== null && data.content !== '') {
      Form.append('content', data.content);
    }
    if (data.itemJson !== undefined && data.itemJson !== null && data.itemJson !== '') {
      Form.append('itemJson', data.itemJson);
    }
    Form.append('createId', data.createId);
    return postAxios('/assessmentCollect/addAssessmentCollect', Form);
  },
  // 查询指标集
  queryIndicator: data => {
    let Form = new FormData();
    if (data.collectId !== undefined && data.collectId !== null && data.collectId !== '') {
      Form.append('collectId', data.collectId);
    }
    if (data.name !== undefined && data.name !== null && data.name !== '') {
      Form.append('name', data.name);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/assessmentCollect/assessmentCollectList', Form);
  },
  // 修改指标集
  updateIndicator: data => {
    let Form = new FormData();
    if (data.collectId !== undefined && data.collectId !== null && data.collectId !== '') {
      Form.append('collectId', data.collectId);
    }
    Form.append('name', data.name);
    if (data.content !== undefined && data.content !== null && data.content !== '') {
      Form.append('content', data.content);
    }
    if (data.itemJson !== undefined && data.itemJson !== null && data.itemJson !== '') {
      Form.append('itemJson', data.itemJson);
    }
    Form.append('operatId', data.operatId);
    return postAxios('/assessmentCollect/updateAssessmentCollect', Form);
  },
  // 删除指标集
  delIndicator: data => {
    let Form = new FormData();
    if (data.collectId !== undefined && data.collectId !== null && data.collectId !== '') {
      Form.append('collectId', data.collectId);
    }
    Form.append('operatId', data.operatId);
    return postAxios('/assessmentCollect/deleteAssessmentCollect', Form);
  }
}
;
