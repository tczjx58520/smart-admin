import { postAxios } from '@/lib/http';

export const taskManage = {
  // 布置任务
  arrangeTask: data => {
    return postAxios('/personalTask/addPersonalTask', data);
  },

  // 查询任务关联日报
  findDayReport: data => {
    let Form = new FormData();
    if (data.taskId !== undefined && data.taskId !== null && data.taskId !== '') {
      Form.append('taskId', data.taskId);
    }
    return postAxios('/personalTask/findDailyReport', Form);
  },

  // 查询任务列表
  findTaskList: data => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    if (data.status !== undefined && data.status !== null && data.status !== '') {
      Form.append('status', data.status);
    }
    if (data.creatorName !== undefined && data.creatorName !== null && data.creatorName !== '') {
      Form.append('creatorName', data.creatorName);
    }
    if (data.headerName !== undefined && data.headerName !== null && data.headerName !== '') {
      Form.append('headerName', data.headerName);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    return postAxios('/personalTask/findPersonalTask', Form);
  },

  // 修改任务
  updateTask: data => {
    return postAxios('/personalTask/modifyPersonalTask', data);
  },

  // 删除任务
  deleteTask: data => {
    return postAxios('/personalTask/removePersonalTask', data);
  },

  // 撤销任务
  endTask: data => {
    return postAxios('/personalTask/endPersonalTask', data);
  },

  // 任务汇报查询
  findTaskReport: data => {
    let Form = new FormData();
    if (data.taskId !== undefined && data.taskId !== null && data.taskId !== '') {
      Form.append('taskId', data.taskId);
    }
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    return postAxios('/personalTask/findTaskReport', Form);
  },

  // 任务汇报添加
  addTaskReport: data => {
    return postAxios('/personalTask/addTaskReport', data);
  },

  // 文档查询
  findDocument: data => {
    let Form = new FormData();
    if (data.taskId !== undefined && data.taskId !== null && data.taskId !== '') {
      Form.append('taskId', data.taskId);
    }
    return postAxios('/personalTask/findTaskReportAttachment', Form);
  }
}
  ;
