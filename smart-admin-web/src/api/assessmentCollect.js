import { postAxios } from '@/lib/http';

export const assessmentCollect = {
  // 查询指标项名称
  getAssessmentCollect: () => {
    return postAxios('/assessmentCollect/queryItemName');
  }
}
;
