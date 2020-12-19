import { postAxios } from '@/lib/http';

export const empsituation = {
  // 性别学历分布
  sexDistribute: () => {
    return postAxios('/empSituation/empGender');
  },

  // 入职年龄分布
  ageDistribute: () => {
    return postAxios('/empSituation/empOnYear');
  },

  // 最近生日：合同：试用
  birthDistribute: () => {
    return postAxios('/empSituation/empRecent');
  }
}
  ;
