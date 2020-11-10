import { postAxios } from '@/lib/http';

export const distribute = {
  // 手动委托
  adddistribute: (data) => {
    let Form = new FormData();
    if (data.flowRecordId !== undefined && data.flowRecordId !== null && data.flowRecordId !== '') {
      Form.append('flowRecordId', data.flowRecordId);
    }
    if (data.handleRecordId !== undefined && data.handleRecordId !== null && data.handleRecordId !== '') {
      Form.append('handleRecordId', data.handleRecordId);
    }
    if (data.actionId !== undefined && data.actionId !== null && data.actionId !== '') {
      Form.append('actionId', data.actionId);
    }
    if (data.sendPersonId !== undefined && data.sendPersonId !== null && data.sendPersonId !== '') {
      Form.append('sendPersonId', data.sendPersonId);
    }
    if (data.distributionPersonIds !== undefined && data.distributionPersonIds !== null && data.distributionPersonIds !== '') {
      Form.append('distributionPersonIds', data.distributionPersonIds);
    }
    return postAxios('/distributionRecord/addDistribution', Form);
  }
}
;
