import request from './index'
import $C from './config'
import { getAction, postAction } from './manage';

// 登录方法
export function login(data) {
  return request({
    headers: {
      unAse: true
    },
    url: `${$C.auth}/auth/password`,
    method: 'post',
    data: data
  });
}

export const getUserList = params => postAction(`${$C.auth}/user/list`, params);
