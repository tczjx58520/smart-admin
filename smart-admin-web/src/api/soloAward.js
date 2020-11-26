import { postAxios } from '@/lib/http';

export const soloAward = {
  // 查询级别
  getsoloAward: () => {
    return postAxios('/targetRule/queryTargetRule');
  },
  // 新增级别
  addsoloAward: (data, data2, data3, data4) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('formula', data);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('itemIds', data2);
    }
    if (data3 !== undefined && data3 !== null && data3 !== '') {
      Form.append('myformlua', data3);
    }
    if (data4 !== undefined && data4 !== null && data4 !== '') {
      Form.append('createId', data4);
    }
    return postAxios('/targetRule/addTargetRule', Form);
  },
  // 更新级别
  updatesoloAward: (id, data, data2, data3, data4) => {
    let Form = new FormData();
    if (id !== undefined && id !== null && id !== '') {
      Form.append('id', id);
    }
    if (data !== undefined && data !== null && data !== '') {
      Form.append('formula', data);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('itemIds', data2);
    }
    if (data3 !== undefined && data3 !== null && data3 !== '') {
      Form.append('myformlua', data3);
    }
    if (data4 !== undefined && data4 !== null && data4 !== '') {
      Form.append('createId', data4);
    }
    return postAxios('/targetRule/updateTargetRule', Form);
  }
}
;
