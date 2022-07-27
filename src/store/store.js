import { combineReducers } from 'redux'
import user from './userInfo'
import tagMenu from './tagMenu'

export default combineReducers({
    user,
    tagMenu
})
