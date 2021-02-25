import { postAxios } from '@/lib/http';

export const repoTaskItem = {
  // 添加门店任务项
  addTaskItem: (data) => {
    let Form = new FormData();
    if (data.itemName !== undefined && data.itemName !== null && data.itemName !== '') {
      Form.append('itemName', data.itemName);
    }
    if (data.desc !== undefined && data.desc !== null && data.desc !== '') {
      Form.append('desc1', data.desc);
    }
    if (data.createId !== undefined && data.createId !== null && data.createId !== '') {
      Form.append('createId', data.createId);
    }
    return postAxios('/repoTaskItem/addTaskItem', Form);
  },
  // 查询任务项
  getTaskItem: (data) => {
    let Form = new FormData();
    if (data.itemName !== undefined && data.itemName !== null && data.itemName !== '') {
      Form.append('itemName', data.itemName);
    }
    if (data.itemId !== undefined && data.itemId !== null && data.itemId !== '') {
      Form.append('itemId', data.itemId);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/repoTaskItem/queryTaskItem', Form);
  },
  // 修改任务项
  updateTaskItem: (data) => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    if (data.itemName !== undefined && data.itemName !== null && data.itemName !== '') {
      Form.append('itemName', data.itemName);
    }
    if (data.createId !== undefined && data.createId !== null && data.createId !== '') {
      Form.append('createId', data.createId);
    }
    if (data.createDate !== undefined && data.createDate !== null && data.createDate !== '') {
      Form.append('createDate', data.createDate);
    }
    return postAxios('/repoTaskItem/updateTaskItem', Form);
  },
  // 删除任务项
  delTaskItem: (data) => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('itemId', data.id);
    }
    if (data.operatId !== undefined && data.operatId !== null && data.operatId !== '') {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/repoTaskItem/deleteTaskItem', Form);
  },
  // 添加门店任务集
  addTaskItems: (data) => {
    let Form = new FormData();
    if (data.repositoryId !== undefined && data.repositoryId !== null && data.repositoryId !== '') {
      Form.append('repositoryId', data.repositoryId);
    }
    if (data.items !== undefined && data.items !== null && data.items !== '') {
      Form.append('items', data.items);
    }
    if (data.createId !== undefined && data.createId !== null && data.createId !== '') {
      Form.append('createId', data.createId);
    }
    if (data.month !== undefined && data.month !== null && data.month !== '') {
      Form.append('month', data.month);
    }
    return postAxios('/repoTaskItem/addTaskCollect', Form);
  },
  // 查询任务集
  getTaskItems: (data) => {
    let Form = new FormData();
    if (data.collectId !== undefined && data.collectId !== null && data.collectId !== '') {
      Form.append('collectId', data.collectId);
    }
    if (data.repositoryId !== undefined && data.repositoryId !== null && data.repositoryId !== '') {
      Form.append('repositoryId', data.repositoryId);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/repoTaskItem/queryTaskCollect', Form);
  },
  // 修改任务集
  updateTaskItems: (data) => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    if (data.repositoryId !== undefined && data.repositoryId !== null && data.repositoryId !== '') {
      Form.append('repositoryId', data.repositoryId);
    }
    if (data.items !== undefined && data.items !== null && data.items !== '') {
      Form.append('items', data.items);
    }
    if (data.createId !== undefined && data.createId !== null && data.createId !== '') {
      Form.append('createId', data.createId);
    }
    return postAxios('/repoTaskItem/updateTaskCollect', Form);
  },
  // 删除任务集
  delTaskItems: (data) => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('collectId', data.id);
    }
    if (data.operatId !== undefined && data.operatId !== null && data.operatId !== '') {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/repoTaskItem/deleteCollect', Form);
  },
  // 任务量录入
  addTaskScore: (data) => {
    let Form = new FormData();
    if (data.itemScoreJson !== undefined && data.itemScoreJson !== null && data.itemScoreJson !== '') {
      Form.append('itemScoreJson', data.itemScoreJson);
    }
    if (data.operatId !== undefined && data.operatId !== null && data.operatId !== '') {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/repoTaskItem/addItemScore', Form);
  }
}
;
