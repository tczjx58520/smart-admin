import { postAxios, getAxios } from '@/lib/http';
export const signatureApi = {
  uploadpic: data => {
    let Form = new FormData();
    if (data.type) {
      Form.append('type', data.type);
    }
    if (data.file) {
      Form.append('file', data.file);
    }
    return postAxios('/upload/uploadpic', Form);
  },
  addSignature: data => {
    let Form = new FormData();
    if (data.signatureName) {
      Form.append('signatureName', data.signatureName);
    }
    if (data.empId) {
      Form.append('empId', data.empId);
    }
    if (data.operatId) {
      Form.append('operatId', data.operatId);
    }
    if (data.picIds) {
      Form.append('picIds', data.picIds);
    }
    return postAxios('/signature/addSignature', Form);
  },
  deleteSignature: data => {
    let Form = new FormData();
    if (data.signatureId) {
      Form.append('signatureId', data.signatureId);
    }
    if (data.operatId) {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/signature/deleteSignature', Form);
  },
  // 分页查询所有岗位
  groupList: data => {
    let Form = new FormData();
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    if (data.signatureName) {
      Form.append('signatureName', data.signatureName);
    }
    if (data.signatureId) {
      Form.append('signatureId', data.signatureId);
    }
    if (data.empId) {
      Form.append('empId', data.empId);
    }
    return postAxios('/signature/groupList', Form);
  },
  updateSignature: data => {
    let Form = new FormData();
    if (data.signatureName) {
      Form.append('signatureName', data.signatureName);
    }
    if (data.signatureId) {
      Form.append('signatureId', data.signatureId);
    }
    if (data.operatId) {
      Form.append('operatId', data.operatId);
    }
    if (data.picIds) {
      Form.append('picIds', data.picIds);
    }
    return postAxios('/signature/updateSignature', Form);
  }
};
