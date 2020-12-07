import { postAxios } from '@/lib/http';

export const empInduction = {
  // 查询门店
  getempInductionList: (data) => {
    let Form = new FormData();
    if (data.empInductionId !== undefined && data.empInductionId !== null && data.empInductionId !== '') {
      Form.append('empInductionId', data.empInductionId);
    }
    if (data.postId !== undefined && data.postId !== null && data.postId !== '') {
      Form.append('postId', data.postId);
    }
    if (data.organizeId !== undefined && data.organizeId !== null && data.organizeId !== '') {
      Form.append('organizeId', data.organizeId);
    }
    if (data.employeeName !== undefined && data.employeeName !== null && data.employeeName !== '') {
      Form.append('employeeName', data.employeeName);
    }
    if (data.phone !== undefined && data.phone !== null && data.phone !== '') {
      Form.append('phone', data.phone);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.isContract !== undefined && data.isContract !== null && data.isContract !== '') {
      Form.append('isContract', data.isContract);
    }
    return postAxios('/empInduction/empInductionList', Form);
  },
  // 添加门店
  addempInduction: data => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    if (data.title !== undefined && data.title !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.flowId !== undefined && data.flowId !== null && data.flowId !== '') {
      Form.append('flowId', data.flowId);
    }
    if (data.flowNumber !== undefined && data.flowNumber !== null && data.flowNumber !== '') {
      Form.append('flowNumber', data.flowNumber);
    }
    if (data.firstName !== undefined && data.firstName !== null && data.firstName !== '') {
      Form.append('firstName', data.firstName);
    }
    if (data.middleName !== undefined && data.middleName !== null && data.middleName !== '') {
      Form.append('middleName', data.middleName);
    }
    if (data.lastName !== undefined && data.lastName !== null && data.lastName !== '') {
      Form.append('lastName', data.lastName);
    }
    if (data.gender !== undefined && data.gender !== null && data.gender !== '') {
      Form.append('gender', data.gender);
    }
    if (data.phone !== undefined && data.phone !== null && data.phone !== '') {
      Form.append('phone', data.phone);
    }
    if (data.idCard !== undefined && data.idCard !== null && data.idCard !== '') {
      Form.append('idCard', data.idCard);
    }
    if (data.cardPic !== undefined && data.cardPic !== null && data.cardPic !== '') {
      Form.append('cardPic', data.cardPic);
    }
    if (data.empPic !== undefined && data.empPic !== null && data.empPic !== '') {
      Form.append('empPic', data.empPic);
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
    if (data.superiorId !== undefined && data.superiorId !== null && data.superiorId !== '') {
      Form.append('superiorId', data.superiorId);
    }
    if (data.onDate !== undefined && data.onDate !== null && data.onDate !== '') {
      Form.append('onDate1', data.onDate);
    }
    if (data.workAddress !== undefined && data.workAddress !== null && data.workAddress !== '') {
      Form.append('workAddress', data.workAddress);
    }
    if (data.postContent !== undefined && data.postContent !== null && data.postContent !== '') {
      Form.append('postContent', data.postContent);
    }
    if (data.account !== undefined && data.account !== null && data.account !== '') {
      Form.append('account', data.account);
    }
    if (data.roleId !== undefined && data.roleId !== null && data.roleId !== '') {
      Form.append('roleId', data.roleId);
    }
    if (data.isTrain !== undefined && data.isTrain !== null && data.isTrain !== '') {
      Form.append('isTrain', data.isTrain);
    }
    if (data.trainName !== undefined && data.trainName !== null && data.trainName !== '') {
      Form.append('trainName', data.trainName);
    }
    if (data.trainWay !== undefined && data.trainWay !== null && data.trainWay !== '') {
      Form.append('trainWay', data.trainWay);
    }
    if (data.trainType !== undefined && data.trainType !== null && data.trainType !== '') {
      Form.append('trainType', data.trainType);
    }
    if (data.trainAddress !== undefined && data.trainAddress !== null && data.trainAddress !== '') {
      Form.append('trainAddress', data.trainAddress);
    }
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.trainHandle !== undefined && data.trainHandle !== null && data.trainHandle !== '') {
      Form.append('trainHandle', data.trainHandle);
    }
    if (data.isTest !== undefined && data.isTest !== null && data.isTest !== '') {
      Form.append('isTest', data.isTest);
    }
    if (data.createId !== undefined && data.createId !== null && data.createId !== '') {
      Form.append('createId', data.createId);
    }
    if (data.createDate !== undefined && data.createDate !== null && data.createDate !== '') {
      Form.append('createDate', data.createDate);
    }
    if (data.empId !== undefined && data.empId !== null && data.empId !== '') {
      Form.append('empId', data.empId);
    }

    return postAxios('/empInduction/addEmpInduction', Form);
  },
  updateempInduction: data => {
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
