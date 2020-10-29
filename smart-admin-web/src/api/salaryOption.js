// 用户薪酬API
import {
  postAxios
} from '@/lib/http.js';
export const salaryOptionApi = {
  // 查询薪酬指标项
  getsalaryOptionList: (data) => {
    let Form = new FormData();
    if (data.type !== undefined && data.type !== '' && data.type !== null) {
      Form.append('type', data.type);
    }
    if (data.optionId !== undefined && data.optionId !== '' && data.optionId !== null) {
      Form.append('optionId', data.optionId);
    }
    if (data.name !== undefined && data.name !== '' && data.name !== null) {
      Form.append('name', data.name);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/salaryOption/salaryOptionList', Form);
  },
  // 增加薪酬指标项
  addsalaryOption: (data) => {
    let Form = new FormData();
    if (data.type !== undefined && data.type !== '' && data.type !== null) {
      Form.append('type', data.type);
    }
    if (data.name !== undefined && data.name !== '' && data.name !== null) {
      Form.append('name', data.name);
    }
    Form.append('idx', data.idx);
    Form.append('createId', data.createId);
    return postAxios('/salaryOption/addSalaryOption', Form);
  },
  // 删除薪酬指标项
  delsalaryOption: (data) => {
    let Form = new FormData();
    Form.append('optionId', data.optionId);
    Form.append('operatId', data.operatId);
    return postAxios('/salaryOption/deleteSalaryOption', Form);
  },
  // 更新薪酬指标项
  updatesalaryOption: data => {
    let Form = new FormData();
    if (data.type !== undefined && data.type !== '' && data.type !== null) {
      Form.append('type', data.type);
    }
    if (data.name !== undefined && data.name !== '' && data.name !== null) {
      Form.append('name', data.name);
    }
    if (data.idx !== undefined && data.idx !== '' && data.idx !== null) {
      Form.append('idx', data.idx);
    }
    Form.append('operatId', data.createId);
    Form.append('optionId', data.id);
    return postAxios('/salaryOption/updateSalaryOption', Form);
  }
};
