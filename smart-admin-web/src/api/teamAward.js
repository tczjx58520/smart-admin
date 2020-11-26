import { postAxios } from '@/lib/http';

export const teamAward = {
  // 查询级别
  getteamAward: (data) => {
    let Form = new FormData();
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    return postAxios('/grantCommison/queryGrantCommison', Form);
  },
  // 新增级别
  addteamAward: (data, data2) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('grantCommisonJson', data);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('grantRuleJson', data2);
    }
    return postAxios('/grantCommison/addGrantCommison', Form);
  },
  // 更新级别
  updateteamAward: (data, data2) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('grantCommisonJson', data);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('grantRuleJson', data2);
    }
    return postAxios('/grantCommison/updateGrantCommison', Form);
  }
}
;
