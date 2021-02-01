import { postAxios, getAxios, putAxios, deleteAxios, patchAxios } from '@/lib/http';

export const customerComplaintsList = {
  // 查询级别
  getstorage: (data) => {
    let Form = {};
    console.log(data.startTime !== '');
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.pageSize = data.pageSize;
    }
    if (data.status !== undefined && data.status !== null && data.status !== '') {
      Form.status = data.status;
    }
    if (data.customerName !== undefined && data.customerName !== null && data.customerName !== '') {
      Form.customerName = data.customerName;
    }
    if (data.startTime !== undefined && data.startTime !== null && data.startTime.trim() !== '') {
      Form.startTime = data.startTime;
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime.trim() !== '') {
      Form.endTime = data.endTime;
    }
    if (data.handlePerson !== undefined && data.handlePerson !== null && data.handlePerson !== '') {
      Form.handlePerson = data.handlePerson;
    }
    if (data.customerTel !== undefined && data.customerTel !== null && data.customerTel !== '') {
      Form.customerTel = data.customerTel;
    }
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.id = data.id;
    }
    return getAxios('/customerComplaints', Form);
  },
  // 新增级别
  addstorage: (data) => {
    return postAxios('/customerComplaints', data);
  },
  // 更新级别
  updatestorage: (data) => {
    return patchAxios('/customerComplaints', data);
  },
  // 删除
  // 新增级别
  deletestorage: (data) => {
    return deleteAxios(`/customerComplaints/${data.id}`);
  },
  // 跟进操作
  getFollowStorage: (data) => {
    let Form = {};
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.pageSize = data.pageSize;
    }
    if (data.complaintsId !== undefined && data.complaintsId !== null && data.complaintsId !== '') {
      Form.complaintsId = data.complaintsId;
    }
    return getAxios('/complaintsFollow', Form);
  },
  doFollowStorage: (data) => {
    return postAxios('/complaintsFollow', data);
  },
  // 文档操作
  getDocumentList: (data) => {
    let Form = {};
    if (data.pageNum !== undefined || data.pageNum !== null || data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.pageSize !== undefined || data.pageSize !== null || data.pageSize !== '') {
      Form.pageSize = data.pageSize;
    }
    if (data.id !== undefined || data.id !== null || data.id !== '') {
      Form.id = data.id;
    }
    return getAxios('/complaintsDocuments', Form);
  },
  delDocument: (data) => {
    return deleteAxios(`/complaintsDocuments?id=${data.id}`);
  }
}
;
