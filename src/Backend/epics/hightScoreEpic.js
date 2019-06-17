
import ServerAPI from 'backend/api'
import { Observable } from 'rxjs'
import { actionsType, statusCode
} from 'utils/globalConstants'

export default (action$, store, dependencies) => {
  const getItembyCategoryID$ = action$.ofType(actionsType.GET_ITEMS).switchMap((action) => {
    return Observable.fromPromise(ServerAPI.getItems(action.payload))
      .takeUntil(Observable.timer(TIME_OUT))
      .mergeMap((response) => {
        try {
          if (response && response.status === statusCode.CODE_200) {
            if (response.data.status === statusCode.CODE_200) {
              return Observable.concat(
                Observable.of({ type: actionsType.GET_ITEMS_SUCCESS, items: response.data.data })
              )
            } else {
              return Observable.concat(
                // Observable.of({ type: actionsType.SHOW_NOTIFICATION, payload: { title: ttError, message: strMessageTimeout, isShow: true } }),
                Observable.of({ type: actionsType.GET_ITEMS_FAIL })
              )
            }
          } else {
            return Observable.concat(
              // Observable.of({ type: actionsType.SHOW_NOTIFICATION, payload: { title: ttError, message: strMessageTimeout, isShow: true } }),
              Observable.of({ type: actionsType.GET_ITEMS_FAIL })
            )
          }
        } catch (error) {
          return Observable.concat(
            // Observable.of({ type: actionsType.SHOW_NOTIFICATION, payload: { title: ttError, message: strMessageTimeout, isShow: true } }),
            Observable.of({ type: actionsType.GET_ITEMS_FAIL })
          )
        }
      })
  })

  return Observable.merge(
    getItembyCategoryID$
  )
}
