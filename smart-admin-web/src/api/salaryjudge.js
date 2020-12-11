// 用户薪酬API
import {
  postAxios
} from '@/lib/http.js';
export const salaryjudgeApi = {
  // 查询审批列表
  getjudgeList: (data) => {
    let Form = new FormData();
    if (data.judgeId !== undefined && data.judgeId !== '' && data.judgeId !== null) {
      Form.append('judgeId', data.judgeId);
    }
    if (data.salaryDate !== undefined && data.salaryDate !== '' && data.salaryDate !== null) {
      Form.append('salaryDate', data.salaryDate);
    }
    if (data.stat !== undefined && data.stat !== '' && data.stat !== null) {
      Form.append('stat', data.stat);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/salaryJudge/judgeList', Form);
  },
  // 新增薪酬审批
  addjudgeList: data => {
    let Form = new FormData();
    if (data.title !== undefined && data.title !== '' && data.title !== null) {
      Form.append('title', data.title);
    }
    if (data.flowId !== undefined && data.flowId !== '' && data.flowId !== null) {
      Form.append('flowId', data.flowId);
    }
    Form.append('salaryDate', data.salaryDate);
    Form.append('suitType', data.suitType);
    Form.append('suitTarget', data.suitTarget);
    Form.append('createId', data.createId);
    return postAxios('/salaryJudge/addSalaryJudge', Form);
  },
  // 删除薪酬审批
  deljudge: data => {
    let Form = new FormData();
    Form.append('judgeId', data.judgeId);
    Form.append('operatId', data.operatId);
    return postAxios('/salaryJudge/deleteSalaryJudge', Form);
  },
  // 修改薪酬审批
  updatejudge: data => {
    let Form = new FormData();
    if (data.title !== undefined && data.title !== '' && data.title !== null) {
      Form.append('title', data.title);
    } if (data.flowId !== undefined && data.flowId !== '' && data.flowId !== null) {
      Form.append('flowId', data.flowId);
    }
    Form.append('judgeId', data.judgeId);
    Form.append('salaryDate', data.salaryDate);
    Form.append('suitType', data.suitType);
    Form.append('suitTarget', data.suitTarget);
    Form.append('operatId', data.operatId);
    return postAxios('/salaryJudge/updateSalaryJudge', Form);
  },
  // 查询薪酬明细
  getdetailbyId: data => {
    let Form = new FormData();
    if (data.empId !== undefined && data.empId !== '' && data.empId !== null) {
      Form.append('empId', data.empId);
    }
    if (data.organizeId !== undefined && data.organizeId !== '' && data.organizeId !== null) {
      Form.append('organizeId', data.organizeId);
    }
    if (data.year !== undefined && data.year !== '' && data.year !== null) {
      Form.append('year', data.year);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/salaryCount/salaryDetail', Form);
  },
  // 新建薪酬发放审批申请单
  addapproveApplication: data => {
    let Form = new FormData();
    if (data.organizeId !== undefined && data.organizeId !== '' && data.organizeId) {
      Form.append('organizeId', data.organizeId);
    }
    if (data.organizeIds !== undefined && data.organizeIds !== '' && data.organizeIds) {
      Form.append('organizeIds', data.organizeIds);
    }
    if (data.allShould !== undefined && data.allShould !== '' && data.allShould) {
      Form.append('allShould', data.allShould);
    }
    if (data.allActual !== undefined && data.allActual !== '' && data.allActual) {
      Form.append('allActual', data.allActual);
    }
    if (data.createId !== undefined && data.createId !== '' && data.createId) {
      Form.append('createId', data.createId);
    }
    if (data.applyPersonId !== undefined && data.applyPersonId !== '' && data.applyPersonId) {
      Form.append('applyPersonId', data.applyPersonId);
    }
    if (data.salaryJudgeId !== undefined && data.salaryJudgeId !== '' && data.salaryJudgeId) {
      Form.append('salaryJudgeId', data.salaryJudgeId);
    }
    if (data.picIds !== undefined && data.picIds !== '' && data.picIds) {
      Form.append('picIds', data.picIds);
    }
    return postAxios('/salaryJudgeApply/addJudgeApply', Form);
  }
};
