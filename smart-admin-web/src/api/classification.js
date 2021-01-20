import { postAxios, getAxios, putAxios, deleteAxios } from '@/lib/http';

export const classification = {
  // 查询级别
  getstorage: (data) => {
    return getAxios(`/classifySetting?parentId=${data.parentId}`);
  },
  // 新增级别
  addstorage: (data) => {
    return postAxios('/classifySetting', data);
  },
  // 更新级别
  updatestorage: (data) => {
    return putAxios('/classifySetting', data);
  },
  // 删除
  // 新增级别
  deletestorage: (data) => {
    return deleteAxios(`/classifySetting/${data.id}`);
  }
}
;
