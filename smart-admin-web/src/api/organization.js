import { postAxios } from '@/lib/http';

export const organization = {
  // 查询组织架构
  organizationlist: data => {
    return postAxios('/organize/newdetailList', data);
  },
  // 添加组织架构
  addOrganization: data => {
    let Form = new FormData();
    Form.append('organizeName', data.organizeName);
    Form.append('level', data.level);
    Form.append('parentId', data.parentId);
    Form.append('createId', data.createId);
    return postAxios('/organize/addOrganize', Form);
  },
  // 删除组织架构
  delOrganization: data => {
    let Form = new FormData();
    Form.append('organizeId', data.organizeId);
    Form.append('operatId', data.operatId);
    return postAxios('/organize/deleteOrganize', Form);
  },
  // 更新树状表
  updateOrganization: data => {
    let Form = new FormData();
    Form.append('organizeName', data.organizeName);
    Form.append('organizeId', data.organizeId);
    Form.append('operatId', data.operatId);
    return postAxios('/organize/updateOrganize', Form);
  }
}
;
