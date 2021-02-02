import { postAxios, getAxios, putAxios, deleteAxios } from '@/lib/http';

export const empCard = {
  // 查询级别
  getEmpInfo: (data) => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    return postAxios('/personalInfo/findPersonalInfo', Form);
  },
  getContract: (data) => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    return postAxios('/personalInfo/concactInfo', Form);
  },
  getPersonExpress: (data) => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    return postAxios('/personalInfo/findPersonalExperience', Form);
  },
  getWelfare: (data) => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    return postAxios('/personalInfo/welfare', Form);
  }
}
;
