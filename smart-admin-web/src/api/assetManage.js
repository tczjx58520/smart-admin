import { postAxios, getAxios, putAxios, deleteAxios } from '@/lib/http';

export const assetManage = {
  // 查询级别
  getstorage: (data) => {
    let Form = {};
    if (data.flag !== undefined && data.flag !== null && data.flag !== '') {
      Form.flag = data.flag;
    }
    if (data.custodiansId !== undefined && data.custodiansId !== null && data.custodiansId !== '') {
      Form.custodiansId = data.custodiansId;
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.pageSize = data.pageSize;
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.classifyId !== undefined && data.classifyId !== null && data.classifyId !== '') {
      Form.classifyId = data.classifyId;
    }
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.id = data.id;
    }
    if (data.assetName !== undefined && data.assetName !== null && data.assetName !== '') {
      Form.assetName = data.assetName;
    }
    return getAxios('/asset', Form);
  },
  // 新增级别
  addstorage: (data) => {
    return postAxios('/asset', data);
  },
  // 更新级别
  updatestorage: (data) => {
    return putAxios('/asset', data);
  },
  // 删除
  // 新增级别 GET
  deletestorage: (data) => {
    return deleteAxios(`/asset/${data.id}`);
  },
  getHistory: (data) => {
    let Form = {};
    if (data.operatorId !== undefined && data.operatorId !== null && data.operatorId !== '') {
      Form.operatorId = data.operatorId;
    }
    if (data.operatorType !== undefined && data.operatorType !== null && data.operatorType !== '') {
      Form.operatorType = data.operatorType;
    }
    if (data.startTime !== undefined && data.startTime !== null && data.startTime !== '') {
      Form.startTime = data.startTime;
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.endTime = data.endTime;
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.PageNum = data.pageNum;
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.PageSize = data.pageSize;
    }
    if (data.assetName !== undefined && data.assetName !== null && data.assetName !== '') {
      Form.assetName = data.assetName;
    }
    if (data.assetDetailNum !== undefined && data.assetDetailNum !== null && data.assetDetailNum !== '') {
      Form.assetDetailNum = data.assetDetailNum;
    }
    if (data.assetBorrowNum !== undefined && data.assetBorrowNum !== null && data.assetBorrowNum !== '') {
      Form.assetBorrowNum = data.assetBorrowNum;
    }
    return getAxios('/assetHistory', Form);
  }
}
;
