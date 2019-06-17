import { Dimensions, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const RouteKey = {
  HomeScreen: 'HomeScreen',
  Play: 'Play',
  Results: 'Results'
}

export const isTablet = DeviceInfo.isTablet()
// Redux
export const actionsType = {
  UPDATE_INTERNET_STATUS: 'UPDATE_INTERNET_STATUS',
  SET_CURRENCY: 'SET_CURRENCY',
  SET_LANGUGAE: 'SET_LANGUGAE',
  // NAVIGATION
  PUSH: 'push',
  POP: 'pop',
  POP_TO_TOP: 'popToTop',
  RESET_TO_ROUTE: 'resetToRoute',
  RESET: 'reset',
  CLEAR: 'clear'
}
export const initState = {
  currency: 'VND',
  language: 'vi',
  hightScore: []
}
/**
 * TIME_OUT: 30s
 */
export const TIME_OUT = 30000
/**
 * tlError
 */
export const ttError = 'Lỗi'
/**
 * ttInfor
 */
export const ttInfor = 'Thông báo'
/**
 * strMessageTimeout
 */
export const strMessageTimeout = 'Không thể kết nối server!'
/**
 * statusCode
 */
export const statusCode = {
  CODE_200: 200, // ok
  CODE_201: 201, // ok
  CODE_404: 404, // Not found
  CODE_500: 500 // Server error
}

export function isIphoneX () {
  let dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
  )
}

export function ifIphoneX (iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle
  } else {
    return regularStyle
  }
}
