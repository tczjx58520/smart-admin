import { postAxios, getAxios, putAxios, deleteAxios, patchAxios } from '@/lib/http';

export const contractclassifiCation = {
  // 查询级别
  getstorage: (data) => {
    let Form = {};
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.pageSize = data.pageSize;
    }
    return getAxios('/contactsClassify', data);
  },
  // 新增级别
  addstorage: (data) => {
    return postAxios('/contactsClassify', data);
  },
  // 更新级别
  updatestorage: (data) => {
    return patchAxios('/contactsClassify', data);
  },
  // 新增级别
  deletestorage: (data) => {
    return deleteAxios(`/contactsClassify/${data}`);
  }
}
;
