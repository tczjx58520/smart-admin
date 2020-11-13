import { postAxios } from '@/lib/http';

export const entrust = {
  // 手动委托
  addentrust: (data) => {
    let Form = new FormData();
    if (data.entrustPersonId !== undefined && data.entrustPersonId !== null && data.entrustPersonId !== '') {
      Form.append('entrustPersonId', data.entrustPersonId);
    }
    if (data.entrustedPersonId !== undefined && data.entrustedPersonId !== null && data.entrustedPersonId !== '') {
      Form.append('entrustedPersonId', data.entrustedPersonId);
    }
    if (data.flowNumber !== undefined && data.flowNumber !== null && data.flowNumber !== '') {
      Form.append('flowNumber', data.flowNumber);
    }
    if (data.flowRecordId !== undefined && data.flowRecordId !== null && data.flowRecordId !== '') {
      Form.append('flowRecordId', data.flowRecordId);
    }
    if (data.entrustReason !== undefined && data.entrustReason !== null && data.entrustReason !== '') {
      Form.append('entrustReason', data.entrustReason);
    }
    if (data.handleRecordId !== undefined && data.handleRecordId !== null && data.handleRecordId !== '') {
      Form.append('handleRecordId', data.handleRecordId);
    }
    return postAxios('/entrustRecord/addEntrustRecord', Form);
  },
  // 委托记录
  getentrustRecord: (data) => {
    let Form = new FormData();
    if (data.entrustPersonId !== undefined && data.entrustPersonId !== null && data.entrustPersonId !== '') {
      Form.append('entrustPersonId', data.entrustPersonId);
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
    return postAxios('/entrustRecord/entrustRecordList', Form);
  },
  // 委托规则列表
  getentrustResult: (data) => {
    let Form = new FormData();
    if (data.entrustPersonId !== undefined && data.entrustPersonId !== null && data.entrustPersonId !== '') {
      Form.append('entrustPersonId', data.entrustPersonId);
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
    return postAxios('/entrustRule/entrustRuleList', Form);
  },
  // 被委托规则列表
  getentrustedResult: (data) => {
    let Form = new FormData();
    if (data.entrustedPersonId !== undefined && data.entrustedPersonId !== null && data.entrustedPersonId !== '') {
      Form.append('entrustedPersonId', data.entrustedPersonId);
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
    return postAxios('/entrustRecord/entrustedRecordList', Form);
  },
  // 新建委托规则
  addentrustedResult: (data) => {
    let Form = new FormData();
    if (data.entrustPersonId !== undefined && data.entrustPersonId !== null && data.entrustPersonId !== '') {
      Form.append('entrustPersonId', data.entrustPersonId);
    }
    if (data.entrustedPersonId !== undefined && data.entrustedPersonId !== null && data.entrustedPersonId !== '') {
      Form.append('entrustedPersonId', data.entrustedPersonId);
    }
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime1', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime1', data.endTime);
    }
    if (data.entrustReason !== undefined && data.entrustReason !== null && data.entrustReason !== '') {
      Form.append('entrustReason', data.entrustReason);
    }
    if (data.flowIds !== undefined && data.flowIds !== null && data.flowIds !== '') {
      Form.append('flowIds', data.flowIds);
    }
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    return postAxios('/entrustRule/addEntrustRule', Form);
  },
  // 删除委托规则
  delentrustedResult: (data) => {
    let Form = new FormData();
    if (data.entrustRuleId !== undefined && data.entrustRuleId !== null && data.entrustRuleId !== '') {
      Form.append('entrustRuleId', data.entrustRuleId);
    }
    if (data.operatId !== undefined && data.operatId !== null && data.operatId !== '') {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/entrustRule/deleteEntrustRule', Form);
  },
  // 修改委托规则
  updateentrustedResult: (data) => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    if (data.entrustPersonId !== undefined && data.entrustPersonId !== null && data.entrustPersonId !== '') {
      Form.append('entrustPersonId', data.entrustPersonId);
    }
    if (data.entrustedPersonId !== undefined && data.entrustedPersonId !== null && data.entrustedPersonId !== '') {
      Form.append('entrustedPersonId', data.entrustedPersonId);
    }
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.entrustReason !== undefined && data.entrustReason !== null && data.entrustReason !== '') {
      Form.append('entrustReason', data.entrustReason);
    }
    if (data.flowIds !== undefined && data.flowIds !== null && data.flowIds !== '') {
      Form.append('flowIds', data.flowIds);
    }
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    return postAxios('/entrustRule/updateEntrustRule', Form);
  },
  // 纠正流程经办人POST
  updatehandlerPerson: (data) => {
    let Form = new FormData();
    if (data.flowRecordId !== undefined && data.flowRecordId !== null && data.flowRecordId !== '') {
      Form.append('flowRecordId', data.flowRecordId);
    }
    if (data.entrustedPersonId !== undefined && data.entrustedPersonId !== null && data.entrustedPersonId !== '') {
      Form.append('handlePersonId', data.entrustedPersonId);
    }
    return postAxios('/flowRecord/changeHandle', Form);
  }
}
;
