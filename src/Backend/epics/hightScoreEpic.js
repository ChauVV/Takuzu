
import { Observable } from 'rxjs'
import SimpleStore from 'react-native-simple-store'
import {
  actionsType, KeyStore
} from 'utils/globalConstants'
import {
  sortArray
} from 'utils/globalFunctions'

const addScore = async (score) => {
  let heightScores = await SimpleStore.get(KeyStore.HIGHT_SCORES) || {}
  try {
    if (heightScores.scores === undefined) {
      heightScores.scores = [score]
      heightScores.new = score
    } else {
      if (heightScores.scores.length < 5) {
        heightScores.scores.push(score)
      } else {
        if (heightScores.scores[heightScores.scores.length - 1].secondsRemaining < score.secondsRemaining) {
          heightScores.scores[heightScores.scores.length - 1] = score
        }
      }

      heightScores.new = score
    }
  } catch (error) {
    heightScores.scores = [score]
    heightScores.new = score
  }
  const arrTemp = await sortArray(heightScores.scores, 'secondsRemaining')
  heightScores.scores = arrTemp
  await SimpleStore.save(KeyStore.HIGHT_SCORES, heightScores)
  return heightScores
}
const getHightScore = async () => {
  let heightScores = await SimpleStore.get(KeyStore.HIGHT_SCORES) || {}
  if (heightScores.scores === undefined) {
    heightScores.scores = []
    heightScores.new = {}
  }
  return heightScores
}
export default (action$, store, dependencies) => {
  const addScore$ = action$.ofType(actionsType.UPDATE_HIGHT_SCORE).switchMap((action) => {
    return Observable.fromPromise(addScore(action.payload))
      .mergeMap((hightScores) => {
        try {
          return Observable.concat(
            Observable.of({ type: actionsType.UPDATE_HIGHT_SCORE_SUCCESS, payload: hightScores })
          )
        } catch (error) {
          return Observable.concat(
            Observable.of({ type: actionsType.UPDATE_HIGHT_SCORE_FAIL })
          )
        }
      })
  })

  const getHightScores$ = action$.ofType(actionsType.GET_HIGHT_SCORES).switchMap((action) => {
    return Observable.fromPromise(getHightScore())
      .mergeMap((hightScores) => {
        try {
          return Observable.concat(
            Observable.of({ type: actionsType.GET_HIGHT_SCORES_SUCCESS, payload: hightScores })
          )
        } catch (error) {
          return Observable.concat(
            Observable.of({ type: actionsType.GET_HIGHT_SCORES_FAIL })
          )
        }
      })
  })

  return Observable.merge(
    addScore$,
    getHightScores$
  )
}
