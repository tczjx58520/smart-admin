import { postAxios } from '@/lib/http';

export const standingbook = {
  // 台账5为草稿箱
  getstandingbook: (data) => {
    let Form = new FormData();
    if (data.initiatePersonId !== undefined && data.initiatePersonId !== null && data.initiatePersonId !== '') {
      Form.append('initiatePersonId', data.initiatePersonId);
    }
    if (data.flowNumber !== undefined && data.flowNumber !== null && data.flowNumber !== '') {
      Form.append('flowNumber', data.flowNumber);
    }
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/flowRecord/getFlowBook', Form);
  },
  // 删除流程
  delstandingbook: (data) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('flowRecordId', data);
    }
    return postAxios('/flowRecord/deleteFlowRecord', Form);
  },
  // 跟新流程
  updatestandingbook: (data, data2, data3) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('flowRecordJson', data);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('receiptJson', data2);
    }
    if (data3 !== undefined && data3 !== null && data3 !== '') {
      Form.append('picIds', data3);
    }
    return postAxios('/flowRecord/updateFlowRecord', Form);
  }
}
;
