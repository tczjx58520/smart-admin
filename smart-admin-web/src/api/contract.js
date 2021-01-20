import { postAxios, getAxios, putAxios, deleteAxios, patchAxios } from '@/lib/http';

export const contract = {
  // 查询级别
  getstorage: (data) => {
    let Form = {};
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.pageSize = data.pageSize;
    }
    if (data.classifyId !== undefined && data.classifyId !== null && data.classifyId !== '') {
      Form.classifyId = data.classifyId;
    }
    if (data.name !== undefined && data.name !== null && data.name !== '') {
      Form.name = data.name;
    }
    if (data.telephone !== undefined && data.telephone !== null && data.telephone !== '') {
      Form.telephone = data.telephone;
    }
    return getAxios('/contacts', data);
  },
  // 新增级别
  addstorage: (data) => {
    return postAxios('/contacts', data);
  },
  // 更新级别
  updatestorage: (data) => {
    return patchAxios('/contacts', data);
  },
  // 新增级别
  deletestorage: (data) => {
    return deleteAxios(`/contacts/${data.id}`);
  }
}
;
