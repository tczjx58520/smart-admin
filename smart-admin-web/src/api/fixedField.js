import { postAxios, getAxios, putAxios, deleteAxios } from '@/lib/http';

export const fixedField = {
  // 查询级别
  getstorage: () => {
    return getAxios('/fixedField');
  },
  // 更新级别
  updatestorage: (data) => {
    return putAxios('/fixedField', data);
  }
}
;
