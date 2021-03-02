import { postAxios } from '@/lib/http';

export const planManage = {
  // 查询个人计划
  findPlan: data => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    if (data.flag !== undefined && data.flag !== null && data.flag !== '') {
      Form.append('flag', data.flag);
    }
    if (data.type !== undefined && data.type !== null && data.type !== '') {
      Form.append('type', data.type);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.category !== undefined && data.category !== null && data.category !== '') {
      Form.append('category', data.category);
    }
    if (data.title !== undefined && data.title !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.createStartTime !== undefined && data.createStartTime !== null && data.createStartTime !== '') {
      Form.append('createStartTime', data.createStartTime);
    }
    if (data.createEndTime !== undefined && data.createEndTime !== null && data.createEndTime !== '') {
      Form.append('createEndTime', data.createEndTime);
    }
    return postAxios('/plan/findMyPlan', Form);
  },
  // 添加个人计划
  addPlan: data => {
    return postAxios('/plan/addPlan', data);
  },
  // 修改个人计划
  updatePlan: data => {
    return postAxios('/plan/modifyPlan', data);
  },
  // 删除个人计划
  deletePlan: data => {
    return postAxios('/plan/removePlan', data);
  },
  // 查看计划汇报
  findPlanReport: data => {
    let Form = new FormData();
    if (data.planId !== undefined && data.planId !== null && data.planId !== '') {
      Form.append('planId', data.planId);
    }
    return postAxios('/plan/findPlanReport', Form);
  },
  // 添加计划汇报
  addPlanReport: data => {
    return postAxios('/plan/reportPlan', data);
  },
  // 阅读计划
  readPlan: data => {
    let Form = new FormData();
    if (data.planId !== undefined && data.planId !== null && data.planId !== '') {
      Form.append('planId', data.planId);
    }
    if (data.flag !== undefined && data.flag !== null && data.flag !== '') {
      Form.append('flag', data.flag);
    }
    return postAxios('/plan/modifyRead', Form);
  },

  // 设置完成
  setFinish: data => {
    let Form = new FormData();
    if (data.planId !== undefined && data.planId !== null && data.planId !== '') {
      Form.append('planId', data.planId);
    }
    return postAxios('/plan/modifyPlanStatus', Form);
  }

}
  ;
