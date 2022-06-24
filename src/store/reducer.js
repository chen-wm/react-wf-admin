// 定义一个初始的state，用来存储初始数据
import {logOut} from '../api/list'
import {message} from 'antd'

const defaultState = {
    userInfo:''
}

export default (state=defaultState,action)=>{
    switch(action.type) {
    case "SET_TOKEN":
        localStorage.setItem('user', JSON.stringify(action.userInfo))
        localStorage.setItem('token', JSON.stringify(action.userInfo.accessToken))
        return {
            ...state,
            userInfo: action.userInfo
        }
    case "LOGOUT":
        localStorage.clear()
        // logOut().then( res =>{
        //     if(res.code===0){
        //         localStorage.clear()
        //     }
        // }).catch(e=>{
        //     message.error(e)
        // })
        return
    }
    return state;
}
