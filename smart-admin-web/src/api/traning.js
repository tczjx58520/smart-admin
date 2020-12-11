import { postAxios } from '@/lib/http';

export const training = {
  // 查询培训资料
  getTraining: () => {
    return postAxios('/trainning/findTrainningMaterialClassification');
  },
  // 添加培训分类
  addTraining: data => {
    return postAxios('/trainning/addTrainningMaterialClassification', data);
  },
  // 删除培训分类
  delTraining: data => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('id', data);
    }
    return postAxios('/trainning/removeTrainningMaterialClassification', Form);
  },
  // 更新培训分类
  updateTraining: data => {
    return postAxios('/trainning/modifyTrainningMaterialClassification', data);
  },
  // 根据id查询资料
  getTrainingDetail: data => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('classificationId', data);
    }
    return postAxios('/trainning/findTrainningMaterial', Form);
  },
  // 根据id查询资料
  delTrainingDetail: data => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('id', data);
    }
    return postAxios('/trainning/removeTrainningMaterial', Form);
  },
  // 添加查询资料
  addTrainingDetail: data => {
    return postAxios('/trainning/addTrainningMaterial', data);
  },
  updateTrainingDetail: data=> {
    return postAxios('/trainning/modifyTrainningMaterial', data);
  },
}
;
