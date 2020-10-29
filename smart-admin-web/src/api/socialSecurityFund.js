import {
  postAxios
} from '@/lib/http.js';
export const socialSecurityFundApi = {
  // 查询公积金
  getGongList: (data) => {
    let Form = new FormData();
    if (data.basicId !== undefined && data.basicId !== '' && data.basicId !== null) {
      Form.append('basicId', data.basicId);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/basicSocial/accumulationFundList', Form);
  },
  // 查询社保
  getSheList: (data) => {
    let Form = new FormData();
    if (data.basicId !== undefined && data.basicId !== '' && data.basicId !== null) {
      Form.append('basicId', data.basicId);
    }
    Form.append('pageNum', data.pageNum);
    Form.append('pageSize', data.pageSize);
    return postAxios('/basicSocial/socialSecurityList', Form);
  },
  // 增加公积金
  addGong: (data) => {
    let Form = new FormData();
    if (data.personalPercent !== undefined && data.personalPercent !== '' && data.personalPercent !== null) {
      Form.append('personalPercent', data.personalPercent);
    }
    if (data.companyPercent !== undefined && data.companyPercent !== '' && data.companyPercent !== null) {
      Form.append('companyPercent', data.companyPercent);
    }
    if (data.personalAdd !== undefined && data.personalAdd !== '' && data.personalAdd !== null) {
      Form.append('personalAdd', data.personalAdd);
    }
    if (data.companyAdd !== undefined && data.companyAdd !== '' && data.companyAdd !== null) {
      Form.append('companyAdd', data.companyAdd);
    }
    Form.append('basicMoney', data.basicMoney);
    Form.append('createId', data.createId);
    return postAxios('/basicSocial/addAccumulationFund', Form);
  },
  // 增加社保
  addShe: (data) => {
    let Form = new FormData();
    if (data.personalPensionInsurance !== undefined && data.personalPensionInsurance !== '' && data.personalPensionInsurance !== null) {
      Form.append('personalPensionInsurance', data.personalPensionInsurance);
    }
    if (data.companyPensionInsurance !== undefined && data.companyPensionInsurance !== '' && data.companyPensionInsurance !== null) {
      Form.append('companyPensionInsurance', data.companyPensionInsurance);
    }
    if (data.personalMedicalInsurance !== undefined && data.personalMedicalInsurance !== '' && data.personalMedicalInsurance !== null) {
      Form.append('personalMedicalInsurance', data.personalMedicalInsurance);
    }
    if (data.companyMedicalInsurance !== undefined && data.companyMedicalInsurance !== '' && data.companyMedicalInsurance !== null) {
      Form.append('companyMedicalInsurance', data.companyMedicalInsurance);
    }
    if (data.personalBirthInsurance !== undefined && data.personalBirthInsurance !== '' && data.personalBirthInsurance !== null) {
      Form.append('personalBirthInsurance', data.personalBirthInsurance);
    }
    if (data.companyBirthInsurance !== undefined && data.companyBirthInsurance !== '' && data.companyBirthInsurance !== null) {
      Form.append('companyBirthInsurance', data.companyBirthInsurance);
    }
    if (data.personalUnemploymentInsurance !== undefined && data.personalUnemploymentInsurance !== '' && data.personalUnemploymentInsurance !== null) {
      Form.append('personalUnemploymentInsurance', data.personalUnemploymentInsurance);
    }
    if (data.companyUnemploymentInsurance !== undefined && data.companyUnemploymentInsurance !== '' && data.companyUnemploymentInsurance !== null) {
      Form.append('companyUnemploymentInsurance', data.companyUnemploymentInsurance);
    }
    if (data.personalInjuryInsurance !== undefined && data.personalInjuryInsurance !== '' && data.personalInjuryInsurance !== null) {
      Form.append('personalInjuryInsurance', data.personalInjuryInsurance);
    }
    if (data.companyInjuryInsurance !== undefined && data.companyInjuryInsurance !== '' && data.companyInjuryInsurance !== null) {
      Form.append('companyInjuryInsurance', data.companyInjuryInsurance);
    }
    Form.append('basicMoney', data.basicMoney);
    Form.append('createId', data.createId);
    return postAxios('/basicSocial/addSocialSecurity', Form);
  },
  // 删除公积金
  delGong: (data) => {
    let Form = new FormData();
    Form.append('basicId', data.basicId);
    Form.append('operatId', data.operatId);
    return postAxios('/basicSocial/deleteAccumulationFund', Form);
  },
  // 删除社保
  delShe: (data) => {
    let Form = new FormData();
    Form.append('basicId', data.basicId);
    Form.append('operatId', data.operatId);
    return postAxios('/basicSocial/deleteSocialSecurity', Form);
  }
};
