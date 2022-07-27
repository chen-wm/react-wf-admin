// 定义一个初始的state，用来存储初始数据

const defaultState = {
    userInfo: ''
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            localStorage.setItem('user', JSON.stringify(action.userInfo))
            localStorage.setItem('token', JSON.stringify(action.userInfo.accessToken))
            return {
                ...state,
                userInfo: action.userInfo
            }
        // eslint-disable-next-line
        case 'LOGOUT':
            localStorage.clear()
            return
        default:
            break
    }
    return state
}
