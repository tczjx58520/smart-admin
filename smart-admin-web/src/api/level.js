import { postAxios, getAxios } from '@/lib/http';
export const levelApi = {
  levelList: data => {
    let Form = new FormData();
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    if (data.levelName) {
      Form.append('levelName', data.levelName);
    }
    return postAxios('/level/levelList', Form);
  },
  addLevel: data => {
    let Form = new FormData();
    if (data.levelName) {
      Form.append('levelName', data.levelName);
    }
    if (data.baseSalary) {
      Form.append('baseSalary', data.baseSalary);
    }
    if (data.createId) {
      Form.append('createId', data.createId);
    }
    return postAxios('/level/addLevel', Form);
  },
  updateLevel: data => {
    let Form = new FormData();
    if (data.levelName) {
      Form.append('levelName', data.levelName);
    }
    if (data.baseSalary) {
      Form.append('baseSalary', data.baseSalary);
    }
    if (data.levelId) {
      Form.append('levelId', data.levelId);
    }
    if (data.operatId) {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/level/updateLevel', Form);
  },
  deleteLevel: data => {
    let Form = new FormData();
    if (data.levelId) {
      Form.append('levelId', data.levelId);
    }
    Form.append('operatId', data.operatId);
    return postAxios('/level/deleteLevel', Form);
  }
};
