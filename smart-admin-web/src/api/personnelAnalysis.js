import { postAxios } from '@/lib/http';
export const personnelAnalysis = {
  // 人员岗位分析
  queryPostAnalysis: data => {
    let Form = new FormData();
    if (data.postId !== undefined && data.postId !== null && data.postId !== '') {
      Form.append('postId', data.postId);
    }
    if (data.empId !== undefined && data.empId !== null && data.empId !== '') {
      Form.append('empId', data.empId);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/postCollect/empPostAnalysis', Form);
  },
  // 门店分析
  queryRepositoryAnalysis: data => {
    let Form = new FormData();
    if (data.repositoryLevelId !== undefined && data.repositoryLevelId !== null && data.repositoryLevelId !== '') {
      Form.append('repositoryLevelId', data.repositoryLevelId);
    }
    return postAxios('/postCollect/repositoryAnalysis', Form);
  },
  // 考核任务查看
  querypostTaskList: data => {
    let Form = new FormData();
    if (data.taskId !== undefined && data.taskId !== null && data.taskId !== '') {
      Form.append('taskId', data.taskId);
    }
    if (data.empId !== undefined && data.empId !== null && data.empId !== '') {
      Form.append('empId', data.empId);
    }
    if (data.collectId !== undefined && data.collectId !== null && data.collectId !== '') {
      Form.append('collectId', data.collectId);
    }
    if (data.title !== undefined && data.title !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.repositopageNumryLevelId);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/postTask/postTaskList', Form);
  },
  // 岗位考核指标集=====================================||=======================================
  // 添加岗位任务
  addpostTask: data => {
    let Form = new FormData();
    if (data.title !== undefined && data.title !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.testHandle !== undefined && data.testHandle !== null && data.testHandle !== '') {
      Form.append('testHandle', data.testHandle);
    }
    if (data.checkPerson !== undefined && data.checkPerson !== null && data.checkPerson !== '') {
      Form.append('checkPerson', data.checkPerson);
    }
    if (data.empIds !== undefined && data.empIds !== null && data.empIds !== '') {
      Form.append('empIds', data.empIds);
    }
    if (data.postCollectId !== undefined && data.postCollectId !== null && data.postCollectId !== '') {
      Form.append('postCollectId', data.postCollectId);
    }
    if (data.effectiveDate !== undefined && data.effectiveDate !== null && data.effectiveDate !== '') {
      Form.append('effectiveDate', data.effectiveDate);
    }
    if (data.deadDate	 !== undefined && data.deadDate	 !== null && data.deadDate	 !== '') {
      Form.append('deadDate	', data.deadDate);
    }
    if (data.createId	 !== undefined && data.createId	 !== null && data.createId	 !== '') {
      Form.append('createId	', data.createId);
    }
    return postAxios('/postTask/addPostTask', Form);
  },
  // 查询岗位任务
  updatepostTask: data => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('taskId', data.id);
    }
    if (data.title !== undefined && data.title !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.testHandle !== undefined && data.testHandle !== null && data.testHandle !== '') {
      Form.append('testHandle', data.testHandle);
    }
    if (data.checkPerson !== undefined && data.checkPerson !== null && data.checkPerson !== '') {
      Form.append('checkPerson', data.checkPerson);
    }
    if (data.empIds !== undefined && data.empIds !== null && data.empIds !== '') {
      Form.append('empIds', data.empIds);
    }
    if (data.postCollectId !== undefined && data.postCollectId !== null && data.postCollectId !== '') {
      Form.append('postCollectId', data.postCollectId);
    }
    if (data.effectiveDate !== undefined && data.effectiveDate !== null && data.effectiveDate !== '') {
      Form.append('effectiveDate', data.effectiveDate);
    }
    if (data.deadDate	 !== undefined && data.deadDate	 !== null && data.deadDate	 !== '') {
      Form.append('deadDate	', data.deadDate);
    }
    if (data.operatId	 !== undefined && data.operatId	 !== null && data.operatId	 !== '') {
      Form.append('operatId	', data.operatId);
    }
    return postAxios('/postTask/updatePostTask', Form);
  },
  // 添加指标集
  addpostTaskSet: data => {
    let Form = new FormData();
    if (data.postId !== undefined && data.postId !== null && data.postId !== '') {
      Form.append('postId', data.postId);
    }
    if (data.levelId !== undefined && data.levelId !== null && data.levelId !== '') {
      Form.append('levelId', data.levelId);
    }
    if (data.name !== undefined && data.name !== null && data.name !== '') {
      Form.append('name', data.name);
    }
    if (data.itemJson !== undefined && data.itemJson !== null && data.itemJson !== '') {
      Form.append('itemJson', data.itemJson);
    }
    if (data.createId !== undefined && data.createId !== null && data.createId !== '') {
      Form.append('createId', data.createId);
    }
    return postAxios('/postCollect/addPostCollect', Form);
  },
  // 查询指标集
  getpostTaskSet: data => {
    let Form = new FormData();
    if (data.postId !== undefined && data.postId !== null && data.postId !== '') {
      Form.append('postId', data.postId);
    }
    if (data.levelId !== undefined && data.levelId !== null && data.levelId !== '') {
      Form.append('levelId', data.levelId);
    }
    if (data.name !== undefined && data.name !== null && data.name !== '') {
      Form.append('name', data.name);
    }
    if (data.itemJson !== undefined && data.itemJson !== null && data.itemJson !== '') {
      Form.append('itemJson', data.itemJson);
    }
    if (data.createId !== undefined && data.createId !== null && data.createId !== '') {
      Form.append('createId', data.createId);
    }
    return postAxios('/postCollect/postCollectList', Form);
  },
  // 删除指标集
  delpostTaskSet: data => {
    let Form = new FormData();
    if (data.collectId !== undefined && data.collectId !== null && data.collectId !== '') {
      Form.append('collectId', data.collectId);
    }
    if (data.operatId !== undefined && data.operatId !== null && data.operatId !== '') {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/postCollect/deletePostCollect', Form);
  },
  // 修改指标集
  updatePostTaskSet: data => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('collectId', data.id);
    }
    if (data.itemJson !== undefined && data.itemJson !== null && data.itemJson !== '') {
      Form.append('itemJson', data.itemJson);
    }
    if (data.postId !== undefined && data.postId !== null && data.postId !== '') {
      Form.append('postId', data.postId);
    }
    if (data.levelId !== undefined && data.levelId !== null && data.levelId !== '') {
      Form.append('levelId', data.levelId);
    }
    if (data.name !== undefined && data.name !== null && data.name !== '') {
      Form.append('name', data.name);
    }
    if (data.operatId !== undefined && data.operatId !== null && data.operatId !== '') {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/postCollect/updatePostCollect', Form);
  },
  // 添加指标项
  addpostTaskSingleSet: data => {
    let Form = new FormData();
    if (data.itemName !== undefined && data.itemName !== null && data.itemName !== '') {
      Form.append('itemName', data.itemName);
    }
    if (data.desc !== undefined && data.desc !== null && data.desc !== '') {
      Form.append('desc', data.desc);
    }
    return postAxios('/postCollect/addItemName', Form);
  },
  // 查询指标项
  getpostTaskSingleSet: data => {
    return postAxios('/postCollect/queryItemName');
  },
  // 删除指标项
  delpostTaskSingleSet: data => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('itemNameId', data);
    }
    return postAxios('/postCollect/deleteItemName', Form);
  },
  // 修改指标项
  updatePostTaskSingleSet: data => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    if (data.itemName !== undefined && data.itemName !== null && data.itemName !== '') {
      Form.append('itemName', data.itemName);
    }
    if (data.desc !== undefined && data.desc !== null && data.desc !== '') {
      Form.append('desc', data.desc);
    }
    return postAxios('/postCollect/updateItemName', Form);
  },
  //考核标准==================
  addpostTaskRule: data => {
    let Form = new FormData();
    if (data.createId !== undefined && data.createId !== null && data.createId !== '') {
      Form.append('createId', data.createId);
    }
    if (data.months !== undefined && data.months !== null && data.months !== '') {
      Form.append('months', data.months);
    }
    if (data.detailJson !== undefined && data.detailJson !== null && data.detailJson !== '') {
      Form.append('detailJson', data.detailJson);
    }
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    return postAxios('/postUpDown/addPostUpDown', Form);
  },
  //修改考核标准
  updatepostTaskRule: data => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('postUpDownId', data.id);
    }
    if (data.operatId !== undefined && data.operatId !== null && data.operatId !== '') {
      Form.append('operatId', data.operatId);
    }
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    if (data.months !== undefined && data.months !== null && data.months !== '') {
      Form.append('months', data.months);
    }
    if (data.detailJson !== undefined && data.detailJson !== null && data.detailJson !== '') {
      Form.append('detailJson', data.detailJson);
    }
    return postAxios('/postUpDown/updatePostUpDown', Form);
  },
  querypostTaskRule: () => {
    return postAxios('/postUpDown/queryPostUpDown');
  },
  //查看考核情况
  querytest:(data) => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('taskId', data.id);
    }
    return postAxios('/postTask/assessmentTaskSituation', Form);
  },
  queryAllScore: (data) => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('taskId', data.id);
    }
    if (data.testStat !== undefined && data.testStat !== null && data.testStat !== '') {
      Form.append('testStat', data.testStat);
    }
    return postAxios('/postTask/checkScore', Form);
  },
  // 手动考核
  handleTest: (data) => {
    let Form = new FormData();
    if (data.itemScoreJson !== undefined && data.itemScoreJson !== null && data.itemScoreJson !== '') {
      Form.append('itemScoreJson', data.itemScoreJson);
    }
    if (data.operatId !== undefined && data.operatId !== null && data.operatId !== '') {
      Form.append('operatId', data.operatId);
    }
    if (data.taskId !== undefined && data.taskId !== null && data.taskId !== '') {
      Form.append('taskId', data.taskId);
    }
    return postAxios('/postTask/handAssessment', Form);
  },
 // 终止考核
 endingTask: (data) => {
  let Form = new FormData();
  if (data.id !== undefined && data.id !== null && data.id !== '') {
    Form.append('taskId', data.id);
  }
  if (data.operatId !== undefined && data.operatId !== null && data.operatId !== '') {
    Form.append('operatId', data.operatId);
  }
  return postAxios('/postTask/endPostTask', Form);
},
};
