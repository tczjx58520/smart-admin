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
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    if (data.actualPersonId !== undefined && data.actualPersonId !== null && data.actualPersonId !== '') {
      Form.append('actualPersonId', data.actualPersonId);
    }
    if (data.handleResult !== undefined && data.handleResult !== null && data.handleResult !== '') {
      Form.append('handleResult', data.handleResult);
    }
    return postAxios('/flowRecord/updateHandleRecord', Form);
  },
  // 召回
  rebackFlowRecord: (data) => {
    let Form = new FormData();
    if (data.recallPersonId !== undefined && data.recallPersonId !== null && data.recallPersonId !== '') {
      Form.append('recallPersonId', data.recallPersonId);
    }
    if (data.recallReason !== undefined && data.recallReason !== null && data.recallReason !== '') {
      Form.append('recallReason', data.recallReason);
    }
    if (data.flowRecordId !== undefined && data.flowRecordId !== null && data.flowRecordId !== '') {
      Form.append('flowRecordId', data.flowRecordId);
    }
    if (data.handleRecordId !== undefined && data.handleRecordId !== null && data.handleRecordId !== '') {
      Form.append('handleRecordId', data.handleRecordId);
    }
    return postAxios('/recallRecord/addRecall', Form);
  }
}
;
