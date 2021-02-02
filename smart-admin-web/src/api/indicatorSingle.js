import { postAxios } from '@/lib/http';
export const indicatorSingle = {
  // 添加指标集
  addindicatorSingle: data => {
    let Form = new FormData();
    Form.append('itemName', data.itemName);
    // if (data.itemName !== undefined && data.content !== null && data.content !== '') {
    //   Form.append('content', data.content);
    // }
    if (data.type !== undefined && data.type !== null && data.type !== '') {
      Form.append('type', data.type);
    }
    if (data.createId !== undefined && data.createId !== null && data.createId !== '') {
      Form.append('createId', data.createId);
    }
    return postAxios('/assessmentCollect/addItemName', Form);
  },
  // 查询指标集
  queryindicatorSingle: data => {
    // let Form = new FormData();
    // if (data.collectId !== undefined && data.collectId !== null && data.collectId !== '') {
    //   Form.append('collectId', data.collectId);
    // }
    // if (data.name !== undefined && data.name !== null && data.name !== '') {
    //   Form.append('name', data.name);
    // }
    // Form.append('pageNum', data.pageNum);
    // Form.append('pageSize', data.pageSize);
    return postAxios('/assessmentCollect/queryItemName');
  },
  // 修改指标集
  updateindicatorSingle: data => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    Form.append('itemName', data.itemName);
    return postAxios('/assessmentCollect/updateItemName', Form);
  },
  // 删除指标集
  delindicatorSingle: data => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('itemNameId', data);
    }
    return postAxios('/assessmentCollect/deleteItemName', Form);
  }
}
;
