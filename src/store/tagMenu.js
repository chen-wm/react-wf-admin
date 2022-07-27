// 定义一个初始的state，用来存储初始数据

const defaultState = {
    tagList: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'increase':
            if (state.tagList.some(item => item.name === action.payload.name)) {
                return state
            }
            state.tagList.push(action.payload)
            return state
        case 'delete':
            state.tagList = state.tagList.filter(item => item !== action.payload)
        default:
            break
    }
    return state
}
