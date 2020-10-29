import { postAxios, getAxios } from '@/lib/http';
export const JournalApi = {
  queryList: data => {
    let Form = new FormData();
    if (data.module) {
      Form.append('module', data.module);
    }
    if (data.operatorId) {
      Form.append('operatorId', data.operatorId);
    }
    if (data.operatorType) {
      Form.append('operatorType', data.operatorType);
    }
    Form.append('beginTime', data.beginTime);
    Form.append('endTime', data.endTime);
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/operation/operationList', Form);
  }
};
