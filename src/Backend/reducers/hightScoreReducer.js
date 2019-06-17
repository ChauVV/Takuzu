import { actionsType, initState } from 'utils/globalConstants'

export default (state = initState.hightScores, action) => {
  switch (action.type) {
  case actionsType.UPDATE_HIGHT_SCORE_SUCCESS:
  case actionsType.GET_HIGHT_SCORES_SUCCESS:
    return action.payload
  default:
    return state
  }
}
