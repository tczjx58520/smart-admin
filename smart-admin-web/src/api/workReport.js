import { postAxios } from '@/lib/http';

export const workReport = {
  // 添加日报
  addDayReport: data => {
    return postAxios('/workReport/addDailyReport', data);
  },

  // 添加周报
  addWeekReport: data => {
    return postAxios('/workReport/addWeeklyReport', data);
  },

  // 添加月报
  addMonthReport: data => {
    return postAxios('/workReport/addMonthlyReport', data);
  }
}
  ;
