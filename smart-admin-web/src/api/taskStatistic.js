import { postAxios } from '@/lib/http';

export const statistic = {
  // 查询任务统计
  findTaskStatistic: (pageNum, pageSize, data) => {
    return postAxios(`/statistical/taskStatistical?pageNum=${pageNum}&pageSize=${pageSize}`, data);
  },

  // 查询工作汇报统计
  findWorkReportStatistic: (data) => {
    let Form = new FormData();
    if (data.organizationId !== undefined && data.organizationId !== null && data.organizationId !== '') {
      Form.append('organizationId', data.organizationId);
    }
    if (data.yeanAndMonth !== undefined && data.yeanAndMonth !== null && data.yeanAndMonth !== '') {
      Form.append('yeanAndMonth', data.yeanAndMonth);
    }
    if (data.category !== undefined && data.category !== null && data.category !== '') {
      Form.append('category', data.category);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    return postAxios('/statistical/reportStatistical', Form);
  },

  // 工作汇报统计-查看详情
  findWorkReportDetail: (data) => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    if (data.date !== undefined && data.date !== null && data.date !== '') {
      Form.append('date', data.date);
    }
    if (data.category !== undefined && data.category !== null && data.category !== '') {
      Form.append('category', data.category);
    }
    return postAxios('/statistical/findReportStatisticalItem', Form);
  }

}
  ;
