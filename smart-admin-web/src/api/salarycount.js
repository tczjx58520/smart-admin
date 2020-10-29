// 用户薪酬API
import {
  postAxios
} from '@/lib/http.js';
export const salarycountApi = {
  // 查询薪酬列表
  getsalaryList: (data) => {
    let Form = new FormData();
    if (data.organizeId !== undefined && data.organizeId !== '' && data.organizeId !== null) {
      Form.append('organizeId', data.organizeId);
    }
    if (data.year !== undefined && data.year !== '' && data.year !== null) {
      Form.append('year', data.year);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/salaryCount/salaryCount', Form);
  },
  // 查询薪酬明细
  getdetailbyId: data => {
    let Form = new FormData();
    if (data.empId !== undefined && data.empId !== '' && data.empId !== null) {
      Form.append('empId', data.empId);
    }
    if (data.organizeId !== undefined && data.organizeId !== '' && data.organizeId !== null) {
      Form.append('organizeId', data.organizeId);
    }
    if (data.year !== undefined && data.year !== '' && data.year !== null) {
      Form.append('year', data.year);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/salaryCount/salaryDetail', Form);
  }
};
