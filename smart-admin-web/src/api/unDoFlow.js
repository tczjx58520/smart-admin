import { postAxios } from '@/lib/http';

export const unDoFlowApi = {
  // 代办流程列表
  getFlowRecord: (data) => {
    let Form = new FormData();
    if (data.empId !== undefined && data.empId !== null && data.empId !== '') {
      Form.append('empId', data.empId);
    }
    if (data.flowNumber !== undefined && data.flowNumber !== null && data.flowNumber !== '') {
      Form.append('flowNumber', data.flowNumber);
    }
    if (data.categoryId !== undefined && data.categoryId !== null && data.categoryId !== '') {
      Form.append('categoryId', data.categoryId);
    }
    if (data.startPersonId !== undefined && data.startPersonId !== null && data.startPersonId !== '') {
      Form.append('startPersonId', data.startPersonId);
    }
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/flowRecord/flowToDo', Form);
  },
  // 查看待办流程
  getFlowRecordDetail: (data) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('flowRecordId', data);
    }
    return postAxios('/flowRecord/getFlowDetail', Form);
  },
  // 处理步骤
  updateRecordDetail: (data) => {
    let Form = new FormData();
    if (data.flowId !== undefined && data.flowId !== null && data.flowId !== '') {
      Form.append('flowId', data.flowId);
    }
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    if (data.flowId !== undefined && data.flowId !== null && data.flowId !== '') {
      Form.append('flowId', data.flowId);
    }
    if (data.flowId !== undefined && data.flowId !== null && data.flowId !== '') {
      Form.append('flowId', data.flowId);
    }
    return postAxios('/flowRecord/getFlowDetail', Form);
  }
}
;
