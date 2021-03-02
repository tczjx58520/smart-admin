import { postAxios } from '@/lib/http';

export const addressBook = {
  // 查询我的通讯录
  findMyAddressBook: data => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    if (data.name !== undefined && data.name !== null && data.name !== '') {
      Form.append('name', data.name);
    }
    if (data.gender !== undefined && data.gender !== null && data.gender !== '') {
      Form.append('gender', data.gender);
    }
    if (data.birthday !== undefined && data.birthday !== null && data.birthday !== '') {
      Form.append('birthday', data.birthday);
    }
    if (data.groupId !== undefined && data.groupId !== null && data.groupId !== '') {
      Form.append('groupId', data.groupId);
    }
    if (data.whetherShare !== undefined && data.whetherShare !== null && data.whetherShare !== '') {
      Form.append('whetherShare', data.whetherShare);
    }
    if (data.qq !== undefined && data.qq !== null && data.qq !== '') {
      Form.append('qq', data.qq);
    }
    if (data.mobile !== undefined && data.mobile !== null && data.mobile !== '') {
      Form.append('mobile', data.mobile);
    }
    if (data.fax !== undefined && data.fax !== null && data.fax !== '') {
      Form.append('fax', data.fax);
    }
    if (data.mail !== undefined && data.mail !== null && data.mail !== '') {
      Form.append('mail', data.mail);
    }
    if (data.homeAddress !== undefined && data.homeAddress !== null && data.homeAddress !== '') {
      Form.append('homeAddress', data.homeAddress);
    }
    if (data.company !== undefined && data.company !== null && data.company !== '') {
      Form.append('company', data.company);
    }
    if (data.post !== undefined && data.post !== null && data.post !== '') {
      Form.append('post', data.post);
    }
    if (data.officePhone !== undefined && data.officePhone !== null && data.officePhone !== '') {
      Form.append('officePhone', data.officePhone);
    }
    if (data.companyAddress !== undefined && data.companyAddress !== null && data.companyAddress !== '') {
      Form.append('companyAddress', data.companyAddress);
    }
    if (data.note !== undefined && data.note !== null && data.note !== '') {
      Form.append('note', data.note);
    }
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    return postAxios(`/addressBook/findMyAddressBook?pageNum=${data.pageNum}&pageSize=${data.pageSize}`, Form);
  },
  // 查询内部通讯录
  findInnerAddressBook: data => {
    let Form = new FormData();
    if (data.employeeName !== undefined && data.employeeName !== null && data.employeeName !== '') {
      Form.append('employeeName', data.employeeName);
    }
    if (data.phone !== undefined && data.phone !== null && data.phone !== '') {
      Form.append('phone', data.phone);
    }
    if (data.mail !== undefined && data.mail !== null && data.mail !== '') {
      Form.append('mail', data.mail);
    }
    if (data.qq !== undefined && data.qq !== null && data.qq !== '') {
      Form.append('qq', data.qq);
    }
    if (data.organizationId !== undefined && data.organizationId !== null && data.organizationId !== '') {
      Form.append('organizationId', data.organizationId);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    return postAxios('/addressBook/findInnerAddressBook', Form);
  },

  // 查询公共通讯录
  findPublicAddressBook: (data, pageNum, pageSize) => {
    return postAxios(`/addressBook/findPublicAddressBook?pageNum=${pageNum}&pageSize=${pageSize}`, data);
  },

  // 添加通讯录
  addAddressBook: data => {
    return postAxios('/addressBook/addAddressBook', data);
  },

  // 修改通讯录
  updateAddressBook: data => {
    return postAxios('/addressBook/modifyMyAddressBook', data);
  },

  // 删除我的通讯录
  deleteAddressBook: data => {
    return postAxios('/addressBook/removeMyAddressBook', data);
  }
}
  ;
