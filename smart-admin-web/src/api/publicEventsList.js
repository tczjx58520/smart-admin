import { postAxios, getAxios, putAxios, deleteAxios, patchAxios } from '@/lib/http';

export const publicEventsList = {
  // 查询级别
  getstorage: (data) => {
    let Form = {};
    if (data.pageNum !== undefined || data.pageNum !== null || data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.pageSize !== undefined || data.pageSize !== null || data.pageSize !== '') {
      Form.pageSize = data.pageSize;
    }
    if (data.status !== undefined || data.status !== null || data.status !== '') {
      Form.status = data.status;
    }
    if (data.eventTitle !== undefined || data.eventTitle !== null || data.eventTitle !== '') {
      Form.eventTitle = data.eventTitle;
    }
    if (data.startTime !== undefined || data.startTime !== null || data.startTime !== '') {
      Form.startTime = data.startTime;
    }
    if (data.endTime !== undefined || data.endTime !== null || data.endTime !== '') {
      Form.endTime = data.endTime;
    }
    if (data.handlePerson !== undefined || data.handlePerson !== null || data.handlePerson !== '') {
      Form.handlePerson = data.handlePerson;
    }
    if (data.eventParty !== undefined || data.eventParty !== null || data.eventParty !== '') {
      Form.eventParty = data.eventParty;
    }
    if (data.id !== undefined || data.id !== null || data.id !== '') {
      Form.id = data.id;
    }
    return getAxios('/events', data);
  },
  // 新增级别
  addstorage: (data) => {
    return postAxios('/events', data);
  },
  // 更新级别
  updatestorage: (data) => {
    return patchAxios('/events', data);
  },
  // 删除
  // 新增级别
  deletestorage: (data) => {
    return deleteAxios(`/events/${data.id}`);
  },
  // 跟进操作
  getFollowStorage: (data) => {
    let Form = {};
    if (data.pageNum !== undefined || data.pageNum !== null || data.pageNum !== '') {
      Form.pageNum = data.pageNum;
    }
    if (data.pageSize !== undefined || data.pageSize !== null || data.pageSize !== '') {
      Form.pageSize = data.pageSize;
    }
    if (data.id !== undefined || data.id !== null || data.id !== '') {
      Form.eventId = data.id;
    }
    return getAxios('/eventsFollow', Form);
  },
  doFollowStorage: (data) => {
    return postAxios('/eventsFollow', data);
  }
}
;
