import { postAxios, getAxios, putAxios, deleteAxios, patchAxios } from '@/lib/http';

export const typesOfComplaints = {
  // 查询级别
  getstorage: (data) => {
    let Form = {};
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.pageSize = data.pageSize;
    }
    return getAxios('/complaintsTypes', data);
  },
  // 新增级别
  addstorage: (data) => {
    return postAxios('/complaintsTypes', data);
  },
  // 更新级别
  updatestorage: (data) => {
    return patchAxios('/complaintsTypes', data);
  },
  // 删除
  // 新增级别
  deletestorage: (data) => {
    return deleteAxios(`/complaintsTypes/${data}`);
  },
  getallstorage: () => {
    return getAxios('/customerComplaints/sumComplaint');
  },
  getChart: (data) => {
    let Form = {};
    if (data.year !== undefined && data.year !== null && data.year !== '') {
      Form.year = data.year;
    }
    if (data.months !== undefined && data.months !== null && data.months !== '') {
      Form.months = data.months;
    }
    if (data.day !== undefined && data.day !== null && data.day !== '') {
      Form.day = data.day;
    }
    if (data.type !== undefined && data.type !== null && data.type !== '') {
      Form.type = data.type;
    }
    return getAxios('/customerComplaints/dataStatisticsChart', Form);
  }
}
;
