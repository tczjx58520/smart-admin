import { postAxios, getAxios } from '@/lib/http';
export const collectAccountsApi = {
  // 查询套账列表
  querycollectAccounts: data => {
    let Form = new FormData();
    if (data.accountId !== null && data.accountId !== undefined && data.accountId !== '') {
      Form.append('accountId', data.accountId);
    }
    if (data.socialSecurityId !== null && data.socialSecurityId !== undefined && data.socialSecurityId !== '') {
      Form.append('socialSecurityId', data.socialSecurityId);
    }
    if (data.accumulationFundId !== null && data.accumulationFundId !== undefined && data.accumulationFundId !== '') {
      Form.append('accumulationFundId', data.accumulationFundId);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/collectAccount/collectAccountList', Form);
  },
  // 新增套账
  addcollectAccounts: data => {
    let Form = new FormData();
    if (data.socialSecurityId !== null && data.socialSecurityId !== undefined && data.socialSecurityId !== '') {
      Form.append('socialSecurityId', data.socialSecurityId);
    }
    if (data.accumulationFundId !== null && data.accumulationFundId !== undefined && data.accumulationFundId !== '') {
      Form.append('accumulationFundId', data.accumulationFundId);
    }
    if (data.salaryOptionIds !== null && data.salaryOptionIds !== undefined && data.salaryOptionIds !== '') {
      Form.append('salaryOptionIds', data.salaryOptionIds);
    }
    if (data.empListIds !== null && data.empListIds !== undefined && data.empListIds !== '') {
      Form.append('empIds', data.empListIds);
    }
    if (data.name !== null && data.name !== undefined && data.name !== '') {
      Form.append('name', data.name);
    }
    Form.append('createId', data.createId);
    return postAxios('/collectAccount/addCollectAccount', Form);
  },
  // 更新套账
  updatecollectAccounts: data => {
    let Form = new FormData();
    if (data.socialSecurityId !== null && data.socialSecurityId !== undefined && data.socialSecurityId !== '') {
      Form.append('socialSecurityId', data.socialSecurityId);
    }
    if (data.accumulationFundId !== null && data.accumulationFundId !== undefined && data.accumulationFundId !== '') {
      Form.append('accumulationFundId', data.accumulationFundId);
    }
    if (data.salaryOptionIds !== null && data.salaryOptionIds !== undefined && data.salaryOptionIds !== '') {
      Form.append('salaryOptionIds', data.salaryOptionIds);
    }
    if (data.empListIds !== null && data.empListIds !== undefined && data.empListIds !== '') {
      Form.append('empIds', data.empListIds);
    }
    Form.append('name', data.name);
    Form.append('accountId', data.id);
    Form.append('operatId', data.operatId);
    return postAxios('/collectAccount/updateCollectAccount', Form);
  },
  // 删除套账
  delcollectAccounts: data => {
    let Form = new FormData();
    Form.append('accountId', data.accountId);
    Form.append('operatId', data.operatId);
    return postAxios('/collectAccount/deleteCollectAccount', Form);
  },
  // 新增计算公式
  addcalculationFormula: data => {
    let Form = new FormData();
    if (data.salaryOptionId !== null && data.salaryOptionId !== undefined && data.salaryOptionId !== '') {
      Form.append('salaryOptionId', data.salaryOptionId);
    }
    if (data.partOptions !== null && data.partOptions !== undefined && data.partOptions !== '') {
      Form.append('partOptions', data.partOptions);
    }
    if (data.pointNum !== null && data.pointNum !== undefined && data.pointNum !== '') {
      Form.append('pointNum', data.pointNum);
    }
    if (data.formula !== null && data.formula !== undefined && data.formula !== '') {
      Form.append('formula', data.formula);
    }
    Form.append('createId', data.createId);
    return postAxios('/calculation/addFormula', Form);
  },
  // 查询计算公式
  getcalculationFormula: data => {
    let Form = new FormData();
    Form.append('salaryOptionId', data.salaryOptionId);
    Form.append('pageNum', '1');
    Form.append('pageSize', '999');
    return postAxios('/calculation/formulaList', Form);
  },
  // 更新计算公式
  updatecalculationFormula: data => {
    let Form = new FormData();
    if (data.salaryOptionId !== null && data.salaryOptionId !== undefined && data.salaryOptionId !== '') {
      Form.append('salaryOptionId', data.salaryOptionId);
    }
    if (data.partOptions !== null && data.partOptions !== undefined && data.partOptions !== '') {
      Form.append('partOptions', data.partOptions);
    }
    if (data.pointNum !== null && data.pointNum !== undefined && data.pointNum !== '') {
      Form.append('pointNum', data.pointNum);
    }
    if (data.formula !== null && data.formula !== undefined && data.formula !== '') {
      Form.append('formula', data.formula);
    }
    Form.append('formulaId', data.formulaId);
    Form.append('operatId', data.operatId);
    return postAxios('/calculation/updateFormula', Form);
  },
  // 根据员工查询套账
  querycollectAccountsByEmp: data => {
    let Form = new FormData();
    Form.append('empId', data);
    return postAxios('/collectAccount/getCollectByEmp', Form);
  }
};
