// 用户薪酬API
import { postAxios } from '@/lib/http.js';
export const reposAwardList = {
  // 查询薪酬列表
  getList: (data) => {
    let Form = new FormData();
    if (data.organizeId !== undefined && data.organizeId !== '' && data.organizeId !== null) {
      Form.append('organizeId', data.organizeId);
    }
    if (data.repositoryId !== undefined && data.repositoryId !== '' && data.repositoryId !== null) {
      Form.append('repositoryId', data.repositoryId);
    }
    if (data.month !== undefined && data.month !== '' && data.month !== null) {
      Form.append('month', data.month);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/repositoryRewardRecord/recordList', Form);
  }
};
