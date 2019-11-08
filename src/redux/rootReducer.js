import { combineReducers } from 'redux'
import freecellReducer from './freecell/freecell.reducer'

const rootReducer = combineReducers({
  freecell: freecellReducer
})

export default rootReducer
