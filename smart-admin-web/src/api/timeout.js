import { postAxios } from '@/lib/http';

export const timeout = {
  // 超时统计
  gettimeout: (data) => {
    let Form = new FormData();
    if (data.categoryId !== undefined && data.categoryId !== null && data.categoryId !== '') {
      Form.append('categoryId', data.categoryId);
    }
    if (data.flowName !== undefined && data.flowName !== null && data.flowName !== '') {
      Form.append('flowName', data.flowName);
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
    return postAxios('/flowRecord/getOutTimeCount', Form);
  },
  // 超时步骤
  getOutTimeList: (data) => {
    let Form = new FormData();
    if (data.actionTime !== undefined && data.actionTime !== null && data.actionTime !== '') {
      Form.append('actionTime', data.actionTime);
    }
    if (data.outTime !== undefined && data.outTime !== null && data.outTime !== '') {
      Form.append('outTime', data.outTime);
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
    return postAxios('/flowRecord/getOutTimeList', Form);
  }
}
;
