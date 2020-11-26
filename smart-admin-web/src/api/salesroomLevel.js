import { postAxios } from '@/lib/http';

export const SalesRoomlevel = {
  // 查询级别
  getSalesRoomlevel: (data) => {
    let Form = new FormData();
    if (data.levelName !== undefined && data.levelName !== null && data.levelName !== '') {
      Form.append('levelName', data.levelName);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    return postAxios('/repositoryLevel/repositoryLevelList', Form);
  },
  // 新增级别
  addSalesRoomlevel: data => {
    let Form = new FormData();
    if (data.repositoryLevelJson !== undefined && data.repositoryLevelJson !== null && data.repositoryLevelJson !== '') {
      Form.append('repositoryLevelJson', data.repositoryLevelJson);
    }
    if (data.commisonTeamRuleJson !== undefined && data.commisonTeamRuleJson !== null && data.commisonTeamRuleJson !== '') {
      Form.append('commisonTeamRuleJson', data.commisonTeamRuleJson);
    }
    if (data.commisonTeamRankJson !== undefined && data.commisonTeamRankJson !== null && data.commisonTeamRankJson !== '') {
      Form.append('commisonTeamRankJson', data.commisonTeamRankJson);
    }
    if (data.commisonTeamOverJson !== undefined && data.commisonTeamOverJson !== null && data.commisonTeamOverJson !== '') {
      Form.append('commisonTeamOverJson', data.commisonTeamOverJson);
    }
    if (data.commisonLeaderRuleJson !== undefined && data.commisonLeaderRuleJson !== null && data.commisonLeaderRuleJson !== '') {
      Form.append('commisonLeaderRuleJson', data.commisonLeaderRuleJson);
    }
    if (data.commisonLeaderFinishJson !== undefined && data.commisonLeaderFinishJson !== null && data.commisonLeaderFinishJson !== '') {
      Form.append('commisonLeaderFinishJson', data.commisonLeaderFinishJson);
    }
    if (data.commisonManagerRuleJson !== undefined && data.commisonManagerRuleJson !== null && data.commisonManagerRuleJson !== '') {
      Form.append('commisonManagerRuleJson', data.commisonManagerRuleJson);
    }
    if (data.commisonManagerRewardJson !== undefined && data.commisonManagerRewardJson !== null && data.commisonManagerRewardJson !== '') {
      Form.append('commisonManagerRewardJson', data.commisonManagerRewardJson);
    }
    return postAxios('/repositoryLevel/addRepositoryLevel', Form);
  },
  // 更新级别
  updateSalesRoomlevel: data => {
    let Form = new FormData();
    if (data.repositoryLevelJson !== undefined && data.repositoryLevelJson !== null && data.repositoryLevelJson !== '') {
      Form.append('repositoryLevelJson', data.repositoryLevelJson);
    }
    if (data.commisonTeamRuleJson !== undefined && data.commisonTeamRuleJson !== null && data.commisonTeamRuleJson !== '') {
      Form.append('commisonTeamRuleJson', data.commisonTeamRuleJson);
    }
    if (data.commisonTeamRankJson !== undefined && data.commisonTeamRankJson !== null && data.commisonTeamRankJson !== '') {
      Form.append('commisonTeamRankJson', data.commisonTeamRankJson);
    }
    if (data.commisonTeamOverJson !== undefined && data.commisonTeamOverJson !== null && data.commisonTeamOverJson !== '') {
      Form.append('commisonTeamOverJson', data.commisonTeamOverJson);
    }
    if (data.commisonLeaderRuleJson !== undefined && data.commisonLeaderRuleJson !== null && data.commisonLeaderRuleJson !== '') {
      Form.append('commisonLeaderRuleJson', data.commisonLeaderRuleJson);
    }
    if (data.commisonLeaderFinishJson !== undefined && data.commisonLeaderFinishJson !== null && data.commisonLeaderFinishJson !== '') {
      Form.append('commisonLeaderFinishJson', data.commisonLeaderFinishJson);
    }
    if (data.commisonManagerRuleJson !== undefined && data.commisonManagerRuleJson !== null && data.commisonManagerRuleJson !== '') {
      Form.append('commisonManagerRuleJson', data.commisonManagerRuleJson);
    }
    if (data.commisonManagerRewardJson !== undefined && data.commisonManagerRewardJson !== null && data.commisonManagerRewardJson !== '') {
      Form.append('commisonManagerRewardJson', data.commisonManagerRewardJson);
    }
    return postAxios('/repositoryLevel/updateRepositoryLevel', Form);
  },
  // 门店详情
  getSalesRoomlevelDetail: data => {
    let Form = new FormData();
    if (data !== undefined && data !== null && data !== '') {
      Form.append('levelId', data);
    }
    return postAxios('/repositoryLevel/repositoryLevelDetail', Form);
  }
}
;
