import { postAxios, getAxios, putAxios, deleteAxios } from '@/lib/http';

export const numSetting = {
  // 查询级别
  getstorage: () => {
    return getAxios('/numSetting');
  },
  // 更新级别
  updatestorage: (data) => {
    return putAxios('/numSetting', data);
  }
  // 删除
}
;
