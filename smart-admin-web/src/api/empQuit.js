import { postAxios } from '@/lib/http';

export const empQuit = {
  // 查询转正合同
  getempQuit: (data) => {
    let Form = new FormData();
    if (data.empResignId !== undefined && data.empResignId !== null && data.empResignId !== '') {
      Form.append('empResignId', data.empResignId);
    }
    if (data.employeeName !== undefined && data.employeeName !== null && data.employeeName !== '') {
      Form.append('employeeName', data.employeeName);
    }
    if (data.postId !== undefined && data.postId !== null && data.postId !== '') {
      Form.append('postId', data.postId);
    }
    if (data.organizeId !== undefined && data.organizeId !== null && data.organizeId !== '') {
      Form.append('organizeId', data.organizeId);
    }
    if (data.empId !== undefined && data.empId !== null && data.empId !== '') {
      Form.append('empId', data.empId);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/empResign/empResignList', Form);
  },
  // 添加转正合同
  addempQuit: data => {
    let Form = new FormData();
    if (data.title !== undefined && data.title !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.flowId !== undefined && data.flowId !== null && data.flowId !== '') {
      Form.append('flowId', data.flowId);
    }
    if (data.flowNumber !== undefined && data.flowNumber !== null && data.flowNumber !== '') {
      Form.append('flowNumber', data.flowNumber);
    }
    if (data.applyPersonId !== undefined && data.applyPersonId !== null && data.applyPersonId !== '') {
      Form.append('applyPersonId', data.applyPersonId);
    }
    if (data.organizeId !== undefined && data.organizeId !== null && data.organizeId !== '') {
      Form.append('organizeId', data.organizeId);
    }
    if (data.postId !== undefined && data.postId !== null && data.postId !== '') {
      Form.append('postId', data.postId);
    }
    if (data.levelId !== undefined && data.levelId !== null && data.levelId !== '') {
      Form.append('levelId', data.levelId);
    }
    if (data.reason !== undefined && data.reason !== null && data.reason !== '') {
      Form.append('reason', data.reason);
    }
    if (data.applyDate !== undefined && data.applyDate !== null && data.applyDate !== '') {
      Form.append('applyDate', data.applyDate);
    }
    return postAxios('/empResign/addEmpResign', Form);
  },
  // 更新转正合同
  updateempQuit: data => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    if (data.repositoryName !== undefined && data.repositoryName !== null && data.repositoryName !== '') {
      Form.append('repositoryName', data.repositoryName);
    }
    if (data.address !== undefined && data.address !== null && data.address !== '') {
      Form.append('address', data.address);
    }
    if (data.longitude !== undefined && data.longitude !== null && data.longitude !== '') {
      Form.append('longitude', data.longitude);
    }
    if (data.latitude !== undefined && data.latitude !== null && data.latitude !== '') {
      Form.append('latitude', data.latitude);
    }
    if (data.managerPeopleId !== undefined && data.managerPeopleId !== null && data.managerPeopleId !== '') {
      Form.append('managerPeopleId', data.managerPeopleId);
    }
    if (data.openTimeStr !== undefined && data.openTimeStr !== null && data.openTimeStr !== '') {
      Form.append('openTimeStr', data.openTimeStr);
    }
    if (data.stat !== undefined && data.stat !== null && data.stat !== '') {
      Form.append('stat', data.stat);
    }
    if (data.description !== undefined && data.description !== null && data.description !== '') {
      Form.append('description', data.description);
    }
    if (data.regionId !== undefined && data.regionId !== null && data.regionId !== '') {
      Form.append('regionId', data.regionId);
    }
    if (data.type !== undefined && data.type !== null && data.type !== '') {
      Form.append('type', data.type);
    }
    if (data.regionManagerId !== undefined && data.regionManagerId !== null && data.regionManagerId !== '') {
      Form.append('regionManagerId', data.regionManagerId);
    }
    if (data.attributes !== undefined && data.attributes !== null && data.attributes !== '') {
      Form.append('attributes', data.attributes);
    }
    if (data.chargeRegions !== undefined && data.chargeRegions !== null && data.chargeRegions !== '') {
      Form.append('chargeRegions', data.chargeRegions);
    }
    if (data.phone !== undefined && data.phone !== null && data.phone !== '') {
      Form.append('phone', data.phone);
    }
    if (data.countryId !== undefined && data.countryId !== null && data.countryId !== '') {
      Form.append('countryId', data.countryId);
    }
    if (data.repositoryLevelId !== undefined && data.repositoryLevelId !== null && data.repositoryLevelId !== '') {
      Form.append('repositoryLevelId', data.repositoryLevelId);
    }
    if (data.repositoryType !== undefined && data.repositoryType !== null && data.repositoryType !== '') {
      Form.append('repositoryType', data.repositoryType);
    }
    if (data.leaders !== undefined && data.leaders !== null && data.leaders !== '') {
      Form.append('leaders', data.leaders);
    }
    if (data.havaSister !== undefined && data.havaSister !== null && data.havaSister !== '') {
      Form.append('havaSister', data.havaSister);
    }
    if (data.sisterRepository !== undefined && data.sisterRepository !== null && data.sisterRepository !== '') {
      Form.append('sisterRepository', data.sisterRepository);
    }
    return postAxios('/repository/updateRepository', Form);
  }
}
;
