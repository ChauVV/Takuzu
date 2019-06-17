import { combineEpics } from 'redux-observable'

import hightScoreEpic from './hightScoreEpic'

export default combineEpics(
  hightScoreEpic
)
