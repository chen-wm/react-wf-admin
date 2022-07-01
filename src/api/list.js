import request from './index'
import $C from './config'
import { postAction } from './manage'

// 登录方法
export function login(data) {
    return request({
        headers: {
            unAse: true
        },
        url: `${$C.auth}/auth/password`,
        method: 'post',
        data: data
    })
}

//  退出登录
export function logOut(data) {
    return request({
        url: `${$C.auth}/auth/logout`,
        method: 'post',
        data
    })
}

export const getUserList = params => postAction(`${$C.auth}/user/list`, params)

export const addUser = params => postAction(`${$C.auth}/user/added`, params)

export const writeUser = params => postAction(`${$C.auth}/user/alter`, params)

export const removeUser = params => postAction(`${$C.auth}/user/delete`, params)
