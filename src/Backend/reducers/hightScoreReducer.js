import { actionsType, initState } from 'utils/globalConstants'

export default (state = initState.hightScore, action) => {
  switch (action.type) {
  case actionsType.SET_LANGUGAE:
    return action.payload
  default:
    return state
  }
}
