import { postAxios } from '@/lib/http';

export const storeIndividualAward = {
  // 查询级别
  getstoreIndividualAward: () => {
    return postAxios('/personalRewardRule/queryRewardRule');
  },
  // 新增级别
  addstoreIndividualAward: (data, data2, data3) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('personalRewardRuleJson', data);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('personalRewardCalJson', data2);
    }
    if (data3 !== undefined && data3 !== null && data3 !== '') {
      Form.append('personalRuleItemJson', data3);
    }
    return postAxios('/personalRewardRule/addRewardRule', Form);
  },
  // 更新级别
  updatestoreIndividualAward: (data, data2, data3) => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('personalRewardRuleJson', data);
    }
    if (data2 !== undefined && data2 !== null && data2 !== '') {
      Form.append('personalRewardCalJson', data2);
    }
    if (data3 !== undefined && data3 !== null && data3 !== '') {
      Form.append('personalRuleItemJson', data3);
    }
    return postAxios('/personalRewardRule/updateRewardRule', Form);
  }
}
;
