import { postAxios } from '@/lib/http';

export const countersign = {
  // 添加流程
  addcountersign: (data) => {
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
    if (data.signPersonIds !== undefined && data.signPersonIds !== null && data.signPersonIds !== '') {
      Form.append('signPersonIds', data.signPersonIds);
    }
    return postAxios('/countersignRecord/addCountersign', Form);
  },
  // 会签人员
  getcountersignPerson: (data) => {
    let Form = new FormData();
    if (data.actionId !== undefined && data.actionId !== null && data.actionId !== '') {
      Form.append('actionId', data.actionId);
    }
    return postAxios('/countersignRecord/choosePersons', Form);
  },
  // 会签办理
  handlercountersign: (data) => {
    let Form = new FormData();
    if (data.countersignRecordId !== undefined && data.countersignRecordId !== null && data.countersignRecordId !== '') {
      Form.append('countersignRecordId', data.countersignRecordId);
    }
    if (data.signOpinion !== undefined && data.signOpinion !== null && data.signOpinion !== '') {
      Form.append('signOpinion', data.signOpinion);
    }
    return postAxios('/countersignRecord/countersignHandle', Form);
  },
  // 会签代办列表
  getcountersign: (data) => {
    let Form = new FormData();
    if (data.signPersonId !== undefined && data.signPersonId !== null && data.signPersonId !== '') {
      Form.append('signPersonId', data.signPersonId);
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
    return postAxios('/countersignRecord/signToDo', Form);
  }
}
;
