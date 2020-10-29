// 用户薪酬API
import {
  postAxios
} from '@/lib/http.js';
export const salaryQueryApi = {
  // 查询用户福利
  getsalaryList: (data) => {
    let Form = new FormData();
    if (data.salaryId !== undefined && data.salaryId !== '' && data.salaryId !== null) {
      Form.append('salaryId', data.salaryId);
    }
    if (data.empId !== undefined && data.empId !== '' && data.empId !== null) {
      Form.append('empId', data.empId);
    }
    if (data.createId !== undefined && data.createId !== '' && data.createId !== null) {
      Form.append('createId', data.createId);
    }
    if (data.yearAndMonth !== undefined && data.yearAndMonth !== '' && data.yearAndMonth !== null) {
      Form.append('yearAndMonth', data.yearAndMonth);
    }
    if (data.confirmStat !== undefined && data.confirmStat !== '' && data.confirmStat !== null) {
      Form.append('confirmStat', data.confirmStat);
    }
    if (data.judgeStat !== undefined && data.judgeStat !== '' && data.judgeStat !== null) {
      Form.append('judgeStat', data.judgeStat);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/empSalary/empSalaryList', Form);
  },
  // 确认员工工资
  confirmSalaryList: (data) => {
    let Form = new FormData();
    Form.append('salaryId', data.salaryId);
    Form.append('confirmStat', data.confirmStat);
    Form.append('operatId', data.operatId);
    return postAxios('/empSalary/confirmEmpSalary', Form);
  }
};
