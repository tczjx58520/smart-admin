import { postAxios } from '@/lib/http';

export const examination = {
  // 查询考试资料分类
  findExaminationType: () => {
    return postAxios('/exam/findExamClassification');
  },
  // 添加考试资料分类
  addExaminationType: (data) => {
    let Form = new FormData();
    if (data.questionBankType !== undefined && data.questionBankType !== null && data.questionBankType !== '') {
      Form.append('questionBankType', data.questionBankType);
    }
    return postAxios('/exam/addExamClassification', data);
  },
  // 修改考试资料分类
  updateExaminationType: (data) => {
    let Form = new FormData();
    if (data.questionBankType !== undefined && data.questionBankType !== null && data.questionBankType !== '') {
      Form.append('questionBankType', data.questionBankType);
    }
    return postAxios('/exam/modifyExamClassification', data);
  },
  // 删除考试资料分类
  deleteExaminationType: (data) => {
    let Form = new FormData();
    if (data.id !== undefined && data.id !== null && data.id !== '') {
      Form.append('id', data.id);
    }
    return postAxios(`/exam/removeExamClassification?id=${data.id}`);
  },
  // 查询试题
  findQuestionsList: (data) => {
    let Form = new FormData();
    if (data.typeId !== undefined && data.typeId !== null && data.typeId !== '') {
      Form.append('typeId', data.typeId);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/exam/findExamQuestion', Form);
  },

  // 添加试题
  addQuestion: (data) => {
    let Form = new FormData();
    if (data.choiceQst !== undefined && data.choiceQst !== null && data.choiceQst !== '') {
      Form.append('choiceQst', data.choiceQst);
    }
    return postAxios('/exam/importExamQuestion', data);
  },

  // 修改试题
  updateQuestion: (data) => {
    let Form = new FormData();
    if (data.choiceQst !== undefined && data.choiceQst !== null && data.choiceQst !== '') {
      Form.append('choiceQst', data.choiceQst);
    }
    return postAxios('/exam/modifyExamQuestion', data);
  },

  // 删除试题
  deleteQuestion: (data) => {
    return postAxios('/exam/removeExamQuestion', data);
  },

  // 查询考试类型
  findTestType: (data) => {
    let Form = new FormData();
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/exam/findTrainningType', Form);
  },

  // 添加考试类型
  addTestType: (data) => {
    let Form = new FormData();
    if (data.examType !== undefined && data.examType !== null && data.examType !== '') {
      Form.append('examType', data.examType);
    }
    return postAxios('/exam/addTrainningType', data);
  },

  // 修改考试类型
  updateTestType: (data) => {
    let Form = new FormData();
    if (data.examType !== undefined && data.examType !== null && data.examType !== '') {
      Form.append('examType', data.examType);
    }
    return postAxios('/exam/modifyTrainningType', data);
  },

  // 删除考试类型
  deleteTestType: (data) => {
    return postAxios('/exam/removeTrainningType', data);
  },

  // 查询考试任务
  findExamTask: (data) => {
    let Form = new FormData();
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/exam/findExam', Form);
  },

  // 发布考试
  releaseExam: (data) => {
    let Form = new FormData();
    if (data.examVo !== undefined && data.examVo !== null && data.examVo !== '') {
      Form.append('examVo', data.examVo);
    }
    return postAxios('/exam/releaseExam', data);
  },

  // 查询我的考试
  findMyExam: (data) => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    if (data.status !== undefined && data.status !== null && data.status !== '') {
      Form.append('status', data.status);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    return postAxios('/exam/findMyExam', Form);
  },

  // 开始考试
  beginExam: (data) => {
    let Form = new FormData();
    if (data.employeeId !== undefined && data.employeeId !== null && data.employeeId !== '') {
      Form.append('employeeId', data.employeeId);
    }
    if (data.examId !== undefined && data.examId !== null && data.examId !== '') {
      Form.append('examId', data.examId);
    }
    return postAxios('/exam/doExam', Form);
  },

  // 考试算分
  examGoal: (data, employeeId, examId) => {
    let Form = new FormData();
    if (data.examResultVos !== undefined && data.examResultVos !== null && data.examResultVos !== '') {
      Form.append('examResultVos', data.examResultVos);
    }
    return postAxios(`/exam/caculatePoint?employeeId=${employeeId}&examId=${examId}`, data);
  }
};
