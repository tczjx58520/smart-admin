import { postAxios } from '@/lib/http';
export const assessmentTaskApi = {
  // 添加任务
  addassessmentTask: data => {
    let Form = new FormData();
    if (data.title !== undefined && data.title !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.effectiveDate !== undefined && data.effectiveDate !== null && data.effectiveDate !== '') {
      Form.append('effectiveDate', data.effectiveDate);
    }
    if (data.deadDate !== undefined && data.deadDate !== null && data.deadDate !== '') {
      Form.append('deadDate', data.deadDate);
    }
    if (data.collectType !== undefined && data.collectType !== null && data.collectType !== '') {
      Form.append('collectType', data.collectType);
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
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    Form.append('assessmentCollectId', data.assessmentCollectId);
    Form.append('createId', data.createId);
    return postAxios('/assessmentTask/addAssessmentTask', Form);
  },
  // 查询任务
  queryassessmentTask: data => {
    let Form = new FormData();
    if (data.taskId !== undefined && data.taskId !== null && data.taskId !== '') {
      Form.append('taskId', data.taskId);
    }
    if (data.testId !== undefined && data.testId !== null && data.testId !== '') {
      Form.append('testId', data.testId);
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
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/assessmentTask/assessmentTaskList', Form);
  },
  // 修改任务
  updateassessmentTask: data => {
    let Form = new FormData();
    if (data.content !== undefined && data.content !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.testHandle !== undefined && data.testHandle !== null && data.testHandle !== '') {
      Form.append('testHandle', data.testHandle);
    }
    if (data.empIds !== undefined && data.empIds !== null && data.empIds !== '') {
      Form.append('empIds', data.empIds);
    }
    if (data.checkPerson !== undefined && data.checkPerson !== null && data.checkPerson !== '') {
      Form.append('checkPerson', data.checkPerson);
    }
    if (data.assessmentCollectId !== undefined && data.assessmentCollectId !== null && data.assessmentCollectId !== '') {
      Form.append('assessmentCollectId', data.assessmentCollectId);
    }
    if (data.effectiveDate !== undefined && data.effectiveDate !== null && data.effectiveDate !== '') {
      Form.append('effectiveDate', data.effectiveDate);
    }
    if (data.deadDate !== undefined && data.deadDate !== null && data.deadDate !== '') {
      Form.append('deadDate', data.deadDate);
    }
    if (data.collectType !== undefined && data.collectType !== null && data.collectType !== '') {
      Form.append('collectType', data.collectType);
    }
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    Form.append('taskId', data.taskId);
    Form.append('operatId', data.operatId);
    return postAxios('/assessmentTask/updateAssessmentTask', Form);
  },
  // 删除任务
  delassessmentTask: data => {
    let Form = new FormData();
    if (data.taskId !== undefined && data.taskId !== null && data.taskId !== '') {
      Form.append('taskId', data.taskId);
    }
    Form.append('operatId', data.operatId);
    return postAxios('/assessmentTask/deleteAssessmentTask', Form);
  },
  // 查询考核情况
  queryTaskDetail: data => {
    let Form = new FormData();
    if (data.taskId !== undefined && data.taskId !== null && data.taskId !== '') {
      Form.append('taskId', data.taskId);
    }
    return postAxios('/assessmentTask/assessmentTaskSituation', Form);
  },
  // 中止任务
  terminationTask: data => {
    let Form = new FormData();
    if (data.taskId !== undefined && data.taskId !== null && data.taskId !== '') {
      Form.append('taskId', data.taskId);
    }
    Form.append('operatId', data.operatId);
    return postAxios('/assessmentTask/endAssessmentTask', Form);
  },
  // 查看总分
  viewallscore: data => {
    let Form = new FormData();
    if (data.testStat !== undefined && data.testStat !== null && data.testStat !== '') {
      Form.append('testStat', data.testStat);
    }
    Form.append('taskId', data.taskId);
    return postAxios('/assessmentTask/checkScore', Form);
  },
  // 手动考核任务
  manualscore: data => {
    let Form = new FormData();
    Form.append('itemScoreJson', data.itemScoreJson);
    Form.append('operatId', data.operatId);
    Form.append('taskId', data.taskId);
    return postAxios('/assessmentTask/handAssessment', Form);
  },
  handItemFinish: data => {
    let Form = new FormData();
    Form.append('itemFinishJson', data.itemFinishJson);
    Form.append('operatId', data.operatId);
    Form.append('taskId', data.taskId);
    return postAxios('/assessmentTask/handItemFinish', Form);
  },
  // 录入营销投入
  addAssessmentMarket: data => {
    let Form = new FormData();
    Form.append('assessmentMarketJson', data);
    return postAxios('/assessmentTask/addAssessmentMarket', Form);
  },
  // 查询营销投入byId
  getAssessmentMarket: data => {
    let Form = new FormData();
    Form.append('taskId', data);
    return postAxios('/assessmentTask/assessmentMarketList', Form);
  },
  // 获取奖金
  // 员工实际分期收款
  getEmpInstallment: data => {
    let Form = new FormData();
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.empIds !== undefined && data.empIds !== null && data.empIds !== '') {
      Form.append('empIds', data.empIds);
    }
    return postAxios('/rewardCal/getEmpInstallment', Form);
  },
  getEmpSale: data => {
    let Form = new FormData();
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.empIds !== undefined && data.empIds !== null && data.empIds !== '') {
      Form.append('empIds', data.empIds);
    }
    return postAxios('/rewardCal/getEmpSale', Form);
  },
  getEmpService: data => {
    let Form = new FormData();
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.empIds !== undefined && data.empIds !== null && data.empIds !== '') {
      Form.append('empIds', data.empIds);
    }
    return postAxios('/rewardCal/getEmpService', Form);
  },
  getRepositoryInstallment: data => {
    let Form = new FormData();
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.repositoryIds !== undefined && data.repositoryIds !== null && data.repositoryIds !== '') {
      Form.append('repositoryIds', data.repositoryIds);
    }
    return postAxios('/rewardCal/getRepositoryInstallment', Form);
  },
  getRepositorySale: data => {
    let Form = new FormData();
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.repositoryIds !== undefined && data.repositoryIds !== null && data.repositoryIds !== '') {
      Form.append('repositoryIds', data.repositoryIds);
    }
    return postAxios('/rewardCal/getRepositorySale', Form);
  },
  getRepositoryService: data => {
    let Form = new FormData();
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.repositoryIds !== undefined && data.repositoryIds !== null && data.repositoryIds !== '') {
      Form.append('repositoryIds', data.repositoryIds);
    }
    return postAxios('/rewardCal/getRepositoryService', Form);
  }
};
