// 任务调度API
import {
  postAxios,
  getAxios
} from '@/lib/http';
export const noticeApi = {
  // 查询消息列表
  getNoticeList: (data) => {
    let Form = new FormData();
    if (data.noticeId !== undefined && data.noticeId !== null && data.noticeId !== '') {
      Form.append('noticeId', data.noticeId);
    }
    if (data.title !== undefined && data.title !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.createId !== undefined && data.createId !== null && data.createId !== '') {
      Form.append('createId', data.createId);
    }
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.pageNum !== undefined && data.pageNum !== null && data.pageNum !== '') {
      Form.append('pageNum', data.pageNum);
    }
    if (data.pageSize !== undefined && data.pageSize !== null && data.pageSize !== '') {
      Form.append('pageSize', data.pageSize);
    }
    return postAxios('/insideNotice/noticeList', Form);
  },
  // 添加消息
  addNotice: (data) => {
    let Form = new FormData();
    if (data.title !== undefined && data.title !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.content !== undefined && data.content !== null && data.content !== '') {
      Form.append('content', data.content);
    }
    if (data.picIds !== undefined && data.picIds !== null && data.picIds !== []) {
      Form.append('picIds', data.picIds);
    }
    Form.append('createId', data.createId);
    return postAxios('/insideNotice/addInsideNotice', Form);
  },
  // 删除消息
  deleteNotice: (data) => {
    let Form = new FormData();
    Form.append('noticeId', data.noticeId);
    Form.append('operatId', data.operatId);
    return postAxios('/insideNotice/deleteNotice', Form);
  },
  // 修改消息
  updateNotice: (data) => {
    let Form = new FormData();
    if (data.title !== undefined && data.title !== null && data.title !== '') {
      Form.append('title', data.title);
    }
    if (data.beginTime !== undefined && data.beginTime !== null && data.beginTime !== '') {
      Form.append('beginTime', data.beginTime);
    }
    if (data.endTime !== undefined && data.endTime !== null && data.endTime !== '') {
      Form.append('endTime', data.endTime);
    }
    if (data.content !== undefined && data.content !== null && data.content !== '') {
      Form.append('content', data.content);
    }
    if (data.picIds !== undefined && data.picIds !== null && data.picIds !== []) {
      Form.append('picIds', data.picIds);
    }
    Form.append('operatId', data.operatId);
    Form.append('noticeId', data.noticeId);
    return postAxios('/insideNotice/updateNotice', Form);
  },
  // 标记已读
  addNoticeRecord: (id) => {
    return getAxios(`/notice/read/${id}`);
  },
  // 获取通知详情
  getNoticeDetail: (id) => {
    return getAxios(`/notice/detail/${id}`);
  },
  // 发送消息
  sendNotice: (id) => {
    return getAxios(`/notice/send/${id}`);
  }
};
