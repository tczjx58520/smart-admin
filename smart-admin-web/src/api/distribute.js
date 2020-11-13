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
  },
  // 流程阅看列表
  mywatchList: (data) => {
    let Form = new FormData();
    if (data.distributionPersonId !== undefined && data.distributionPersonId !== null && data.distributionPersonId !== '') {
      Form.append('distributionPersonId', data.distributionPersonId);
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
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/distributionRecord/myDistributionList', Form);
  },
  // 分发评阅
  distributionHandle: (data) => {
    let Form = new FormData();
    if (data.distributionRecordId !== undefined && data.distributionRecordId !== null && data.distributionRecordId !== '') {
      Form.append('distributionRecordId', data.distributionRecordId);
    }
    if (data.reviewContent !== undefined && data.reviewContent !== null && data.reviewContent !== '') {
      Form.append('reviewContent', data.reviewContent);
    }
    return postAxios('/distributionRecord/distributionHandle', Form);
  }
}
;
