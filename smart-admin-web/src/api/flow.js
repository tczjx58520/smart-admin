import { postAxios } from '@/lib/http';

export const FlowApi = {
  // 添加流程
  addFlow: (data, data2) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('flowInfoJson', data);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('flowActionJsons', data2);
    }
    return postAxios('/flow/addFlow', Form);
  },
  // 删除流程
  delFlow: data => {
    let Form = new FormData();
    Form.append('id', data.id);
    Form.append('operatId', data.operatId);
    return postAxios('/flow/delete', Form);
  },
  // 更新流程
  updateFlow: (data, data2, data5) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('flowInfoJson', data);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('flowActionJsons', data2);
    }
    if (data5 !== undefined && data5 !== null && data5 !== '') {
      Form.append('operatId', data5);
    }
    return postAxios('/flow/update', Form);
  },
  // 查询流程
  getFlow: data => {
    let Form = new FormData();
    if (data.flowName !== undefined && data.flowName !== null && data.flowName !== '') {
      Form.append('flowName', data.flowName);
    }
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/flow/search', Form);
  },
  // 查询流程单据
  getFlowContent: data => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('receiptType', data);
    }
    return postAxios('/flow/getReceiptContent', Form);
  },
  // 查询单据详情
  getFlowDetail: data => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('id', data);
    }
    return postAxios('/flow/searchDetail', Form);
  },
  // 启用禁用
  changeFlowStat: data => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    return postAxios('/flow/updateFlowInfo', Form);
  }
}
;
