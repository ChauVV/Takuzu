import { combineReducers } from 'redux'

import currencyReducer from './currencyReducer'
import languageReducer from './languageReducer'
import routesReducer from './routersReducer'
import internetReducer from './internetReducer'
import hightScoreReducer from './hightScoreReducer'

export default combineReducers({
  currency: currencyReducer,
  language: languageReducer,
  navigate: routesReducer,
  internet: internetReducer,
  hightScore: hightScoreReducer
})
