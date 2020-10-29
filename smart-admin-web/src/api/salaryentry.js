// 任务调度API
import {
  postAxios
} from '@/lib/http';
export const salaryEntryApi = {
  // 查询工资列表
  getentryList: data => {
    let Form = new FormData();
    if (data.organizeId) {
      Form.append('organizeId', data.organizeId);
    }
    if (data.empId) {
      Form.append('empId', data.empId);
    }
    if (data.yearAndMonth) {
      Form.append('yearAndMonth', data.yearAndMonth);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/empSalary/empSalaryList', Form);
  },
  // 增加薪酬录入
  addentryList: data => {
    let Form = new FormData();
    if (data.yearAndMonth) {
      Form.append('yearAndMonth', data.yearAndMonth);
    }
    if (data.grantDate) {
      Form.append('grantDate', data.grantDate);
    }
    if (data.empId) {
      Form.append('empId', data.empId);
    }
    if (data.createId) {
      Form.append('createId', data.createId);
    }
    if (data.socialSecurityId) {
      Form.append('socialSecurityId', data.socialSecurityId);
    }
    if (data.accumulationFundId) {
      Form.append('accumulationFundId', data.accumulationFundId);
    }
    if (data.shouldSalary) {
      Form.append('shouldSalary', data.shouldSalary);
    }
    if (data.actualSalary) {
      Form.append('actualSalary', data.actualSalary);
    }
    if (data.salaryOptionJson) {
      Form.append('salaryOptionJson', data.salaryOptionJson);
    }
    return postAxios('/empSalary/addEmpSalary', Form);
  },
  // 修改薪酬录入
  updateentryList: data => {
    let Form = new FormData();
    if (data.salaryId) {
      Form.append('salaryId', data.salaryId);
    }
    if (data.operatId) {
      Form.append('operatId', data.operatId);
    }
    if (data.shouldSalary) {
      Form.append('shouldSalary', data.shouldSalary);
    }
    if (data.actualSalary) {
      Form.append('actualSalary', data.actualSalary);
    }
    if (data.salaryOptionJson) {
      Form.append('salaryOptionJson', data.salaryOptionJson);
    }
    if (data.summary) {
      Form.append('summary', data.summary);
    }
    return postAxios('/empSalary/updateEmpSalary', Form);
  }
};
