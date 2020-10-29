import { postAxios, getAxios } from '@/lib/http';
export const levelCategoryApi = {
  levelCategoryList: data => {
    let Form = new FormData();
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    if (data.categoryName) {
      Form.append('categoryName', data.categoryName);
    }
    if (data.isEffective) {
      Form.append('isEffective', data.isEffective);
    }
    if (data.isDetail) {
      Form.append('isDetail', data.isDetail);
    }
    return postAxios('/level/levelCategoryList', Form);
  },
  addLevelCategory: data => {
    let Form = new FormData();
    if (data.isDetail) {
      Form.append('isDetail', data.isDetail);
    }
    if (data.categoryName) {
      Form.append('categoryName', data.categoryName);
    }
    if (data.isEffective) {
      Form.append('isEffective', data.isEffective);
    }
    if (data.operatId) {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/level/addLevelCategory', Form);
  },
  // 分页查询所有岗位
  updateLevelCategory: data => {
    let Form = new FormData();
    if (data.categoryId) {
      Form.append('categoryId', data.categoryId);
    }
    if (data.isDetail) {
      Form.append('isDetail', data.isDetail);
    }
    if (data.categoryName) {
      Form.append('categoryName', data.categoryName);
    }
    if (data.isEffective) {
      Form.append('isEffective', data.isEffective);
    }
    if (data.operatId) {
      Form.append('operatId', data.operatId);
    }
    return postAxios('/level/updateLevelCategory', Form);
  },
  deleteLevelCategory: data => {
    let Form = new FormData();
    if (data.categoryId) {
      Form.append('categoryId', data.categoryId);
    }
    Form.append('operatId', data.operatId);
    return postAxios('/level/deleteLevelCategory', Form);
  }
};
