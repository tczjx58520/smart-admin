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
  // 根据id删除资料
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
  updateTrainingDetail: data => {
    return postAxios('/trainning/modifyTrainningMaterial', data);
  },
  // 查询我的培训记录
  findMytraningCord: data => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    return postAxios('/trainning/findMyTrainningRecord', Form);
  },
  // 查询我的培训安排
  findMytraningArrange: data => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    return postAxios('/trainning/findMyTrainningManage', Form);
  },
  // 添加培训类型
  addTrainingType: data => {
    return postAxios('/trainning/addTrainningType', data);
  },
  // 查询培训类型
  findTrainingType: data => {
    let Form = new FormData();
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    return postAxios('/trainning/findTrainningType', Form);
  },
  // 修改培训类型
  updateTrainingType: data => {
    return postAxios('/trainning/modifyTrainningType', data);
  },
  // 删除培训类型
  deleteTrainingType: data => {
    return postAxios('/trainning/removeTrainningType', data);
  },

  // 添加培训任务
  addTrainingTask: data => {
    return postAxios('/trainning/addTrainningTask', data);
  },
  // 查询培训任务
  findTrainingTask: data => {
    let Form = new FormData();
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    return postAxios('/trainning/findTrainningTask', Form);
  },
  // 修改培训任务
  updateTrainingTask: data => {
    return postAxios('/trainning/modifyTrainningTask', data);
  },
  // 删除培训任务
  deleteTrainingTask: data => {
    return postAxios('/trainning/removeTrainningTask', data);
  },
  // 终止培训任务
  breakTrainingTask: data => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    return postAxios('/trainning/terminalTrainningTask', Form);
  },
  // 根据组织查人员
  findPeopleByOrc: data => {
    let Form = new FormData();
    if (data.organizationId !== undefined && data.organizationId !== null && data.organizationId !== '') {
      Form.append('organizationId', data.organizationId);
    }
    return postAxios('/trainning/findEmployeeByOrg', Form);
  },

  // 考评
  evaluation: data => {
    return postAxios('/trainning/givePoint', data);
  }

}
  ;
