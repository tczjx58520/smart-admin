// 用户福利API
import {
  postAxios
} from '@/lib/http.js';
export const welfareApi = {
  // 查询用户福利
  getwelfareList: (data) => {
    let Form = new FormData();
    if (data.suitType !== undefined && data.suitType !== '' && data.suitType !== null) {
      Form.append('suitType', data.suitType);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/welfare/welfareSetList', Form);
  },
  // 增加福利
  addwelfare: (data) => {
    let Form = new FormData();
    if (data.suitType !== undefined && data.suitType !== '' && data.suitType !== null) {
      Form.append('suitType', data.suitType);
    }
    if (data.title !== undefined && data.title !== '' && data.title !== null) {
      Form.append('title', data.title);
    }
    Form.append('createId', data.createId);
    Form.append('content', data.content);
    Form.append('suitTarget', data.suitTarget);
    return postAxios('/welfare/addWelfareSet', Form);
  },
  // 删除福利
  delwelfare: (data) => {
    let Form = new FormData();
    Form.append('welfareSetId', data.welfareSetId);
    Form.append('operatId', data.operatId);
    return postAxios('/welfare/deleteWelfareSet', Form);
  },
  // 查询个人福利
  getmywelfare: (data) => {
    let Form = new FormData();
    Form.append('empId', data.empId);
    Form.append('organizeId', data.organizeId);
    return postAxios('/welfare/myWelfare', Form);
  },
  // 更新个人福利
  updatewelfare: (data) => {
    let Form = new FormData();
    Form.append('welfareSetId', data.welfareSetId);
    Form.append('suitType', data.suitType);
    Form.append('title', data.title);
    Form.append('suitTarget', data.suitTarget);
    Form.append('content', data.content);
    Form.append('operatId', data.operatId);
    return postAxios('/welfare/updateWelfareSet', Form);
  }
};
