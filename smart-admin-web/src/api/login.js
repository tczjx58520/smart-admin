import { postAxios, getAxios } from '@/lib/http';
export const loginApi = {
  // 登录
  login: data => {
    return postAxios('/employee/login', data);
  },
  // 根据token获取session
  getSession: data => {
    let Form = new FormData();
    Form.append('token', data);
    return postAxios('/employee/getInforByToken', Form);
  },
  // 登出
  logout: (token) => {
    return getAxios(`/session/logOut?x-access-token=${token}`);
  },
  // 获取验证码(暂无)
  getVerificationCode: () => {
    return getAxios('/session/verificationCode');
  }
};
