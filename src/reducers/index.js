import { combineReducers } from 'redux'
import breeds from './breeds'
import PlayerReducer from './player'

export default combineReducers({
  breeds,
  PlayerReducer
})