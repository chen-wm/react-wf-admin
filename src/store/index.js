import { createStore } from 'redux'
import reducer from './store'

const store = createStore(reducer)
export default store
