import { postAxios, getAxios, putAxios, deleteAxios } from '@/lib/http';

export const unitOfMeasure = {
  // 查询级别
  getstorage: (data) => {
    let Form = new FormData();
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return getAxios('/unitOfMeasure', Form);
  },
  // 新增级别
  addstorage: (data) => {
    return postAxios('/unitOfMeasure', data);
  },
  // 更新级别
  updatestorage: (data) => {
    return putAxios('/unitOfMeasure', data);
  },
  // 删除
  // 新增级别
  deletestorage: (data) => {
    return deleteAxios(`/unitOfMeasure/${data}`);
  }
}
;
