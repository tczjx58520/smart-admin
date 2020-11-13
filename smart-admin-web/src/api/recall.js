import { postAxios } from '@/lib/http';

export const recall = {
  // 手动委托
  getrecall: (data) => {
    let Form = new FormData();
    if (data.recallPersonId !== undefined && data.recallPersonId !== null && data.recallPersonId !== '') {
      Form.append('recallPersonId', data.recallPersonId);
    }
    if (data.flowNumber !== undefined && data.flowNumber !== null && data.flowNumber !== '') {
      Form.append('flowNumber', data.flowNumber);
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
    return postAxios('/recallRecord/recallList', Form);
  }
}
;
