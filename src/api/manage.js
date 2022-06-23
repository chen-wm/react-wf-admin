import request from './index'

//post
export function postAction (url, parameter) {
  return request({
    url: url,
    method: 'post',
    data: parameter
  })
}
//get
export function getAction (url, parameter) {
  return request({
    url: url,
    method: 'get',
    params: parameter
  })
}
