import { createStore } from 'redux'
import PlayerReducer from './reducers/player';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(PlayerReducer, enhancer)

export default store