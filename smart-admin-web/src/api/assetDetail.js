import { postAxios, getAxios, putAxios, deleteAxios, patchAxios } from '@/lib/http';

export const assetDetail = {
  // 查询级别
  getstorage: (data) => {
    let Form = {};
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.pageSize = data.pageSize;
    }
    if (data.assetDetailNum !== undefined && data.assetDetailNum !== null && data.assetDetailNum !== '') {
      Form.assetDetailNum = data.assetDetailNum;
    }
    if (data.assetId !== undefined && data.assetId !== null && data.assetId !== '') {
      Form.assetId = data.assetId;
    }
    if (data.assetName !== undefined && data.assetName !== null && data.assetName !== '') {
      Form.assetName = data.assetName;
    }
    if (data.assetStatus !== undefined && data.assetStatus !== null && data.assetStatus !== '') {
      Form.assetStatus = data.assetStatus;
    }
    return getAxios('/assetDetail', Form);
  },
  // 新增明细
  addstorage: (data) => {
    return postAxios('/assetDetail', data);
  },
  // 更新级别
  updatestorage: (data) => {
    return putAxios('/assetDetail', data);
  },
  // 删除
  deletestorage: (data) => {
    return deleteAxios(`/assetDetail/${data.id}`);
  },
  // 状态变化patch
  updateBorrow: (data) => {
    let Form = new FormData();
    if (data.assetDetailId !== undefined && data.assetDetailId !== null && data.assetDetailId !== '') {
      Form.append('assetDetailId', data.assetDetailId);
    }
    if (data.organizationId !== undefined && data.organizationId !== null && data.organizationId !== '') {
      // Form.organizationId = data.organizationId;
      Form.append('organizationId', data.organizationId);
    }
    if (data.custodiansId !== undefined && data.custodiansId !== null && data.custodiansId !== '') {
      // Form.custodiansId = data.custodiansId;
      Form.append('custodiansId', data.custodiansId);
    }
    if (data.operatorId !== undefined && data.operatorId !== null && data.operatorId !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('operatorId', data.operatorId);
    }
    return patchAxios('/assetBorrow', Form);
  },
  updateChange: (data) => {
    let Form = new FormData();
    if (data.presentId !== undefined && data.presentId !== null && data.presentId !== '') {
      Form.append('presentId', data.presentId);
    }
    if (data.presentValue !== undefined && data.presentValue !== null && data.presentValue !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('presentValue', data.presentValue);
    }
    if (data.operatorId !== undefined && data.operatorId !== null && data.operatorId !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('operatorId', data.operatorId);
    }
    if (data.assetDetailId !== undefined && data.assetDetailId !== null && data.assetDetailId !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('assetDetailId', data.assetDetailId);
    }
    if (data.originalId !== undefined && data.originalId !== null && data.originalId !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('originalId', data.originalId);
    }
    if (data.originalValue !== undefined && data.originalValue !== null && data.originalValue !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('originalValue', data.originalValue);
    }
    if (data.organizationId !== undefined && data.organizationId !== null && data.organizationId !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('organizationId', data.organizationId);
    }
    return patchAxios('/assetChange', Form);
  },
  updateLose: (data) => {
    let Form = new FormData();
    if (data.assetDetailId !== undefined && data.assetDetailId !== null && data.assetDetailId !== '') {
      Form.append('assetDetailId', data.assetDetailId);
    }
    if (data.operatorId !== undefined && data.operatorId !== null && data.operatorId !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('operatorId', data.operatorId);
    }
    return patchAxios('/assetLose', Form);
  },
  updatedRepair: (data) => {
    let Form = new FormData();
    if (data.assetDetailId !== undefined && data.assetDetailId !== null && data.assetDetailId !== '') {
      Form.append('assetDetailId', data.assetDetailId);
    }
    if (data.organizationId !== undefined && data.organizationId !== null && data.organizationId !== '') {
      // Form.organizationId = data.organizationId;
      Form.append('organizationId', data.organizationId);
    }
    if (data.custodiansId !== undefined && data.custodiansId !== null && data.custodiansId !== '') {
      // Form.custodiansId = data.custodiansId;
      Form.append('custodiansId', data.custodiansId);
    }
    if (data.operatorId !== undefined && data.operatorId !== null && data.operatorId !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('operatorId', data.operatorId);
    }
    return patchAxios('/assetRepair', Form);
  },
  updatedReturn: (data) => {
    let Form = new FormData();
    if (data.assetDetailId !== undefined && data.assetDetailId !== null && data.assetDetailId !== '') {
      Form.append('assetDetailId', data.assetDetailId);
    }
    if (data.operatorId !== undefined && data.operatorId !== null && data.operatorId !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('operatorId', data.operatorId);
    }
    return patchAxios('/assetReturn', Form);
  },
  updatedScrap: (data) => {
    let Form = new FormData();
    if (data.assetDetailId !== undefined && data.assetDetailId !== null && data.assetDetailId !== '') {
      Form.append('assetDetailId', data.assetDetailId);
    }
    if (data.operatorId !== undefined && data.operatorId !== null && data.operatorId !== '') {
      // Form.operatorId = data.operatorId;
      Form.append('operatorId', data.operatorId);
    }
    return patchAxios('/assetScrap', Form);
  },
  getborrow: (data) => {
    let Form = {};
    if (data.assetBorrowNum !== undefined && data.assetBorrowNum !== null && data.assetBorrowNum !== '') {
      Form.assetBorrowNum = data.assetBorrowNum;
    }
    if (data.status !== undefined && data.status !== null && data.status !== '') {
      Form.status = data.status;
    }
    return getAxios('/assetBorrowInfo', Form);
  },

  // 查看详情明细
  getBorrowDetail: (data) => {
    let Form = {};
    if (data.assetDetailId !== undefined && data.assetDetailId !== null && data.assetDetailId !== '') {
      Form.assetDetailId = data.assetDetailId;
    }
    return getAxios('/assetBorrow', Form);
  },
  getchangeDetail: (data) => {
    let Form = {};
    if (data.assetDetailId !== undefined && data.assetDetailId !== null && data.assetDetailId !== '') {
      Form.assetDetailId = data.assetDetailId;
    }
    return getAxios('/assetChange', Form);
  },
  getLoseDetail: (data) => {
    let Form = {};
    if (data.assetDetailId !== undefined && data.assetDetailId !== null && data.assetDetailId !== '') {
      Form.assetDetailId = data.assetDetailId;
    }
    return getAxios('/assetLose', Form);
  },
  getRepairDetail: (data) => {
    let Form = {};
    if (data.assetDetailId !== undefined && data.assetDetailId !== null && data.assetDetailId !== '') {
      Form.assetDetailId = data.assetDetailId;
    }
    return getAxios('/assetRepair', Form);
  },
  getBaseDetail: (data) => {
    let Form = {};
    if (data.assetId !== undefined && data.assetId !== null && data.assetId !== '') {
      Form.assetId = data.assetId;
    }
    return getAxios('/assetInfo', Form);
  }

}
;
