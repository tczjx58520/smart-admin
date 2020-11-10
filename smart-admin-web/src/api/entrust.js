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
  }
}
;
