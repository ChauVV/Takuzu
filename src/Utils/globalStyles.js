import { Dimensions, Platform } from 'react-native'

const CORE_RATIO = 667 / 375
export const MYWIDTH = Dimensions.get('window').width
export const MYHEIGHT = Dimensions.get('window').height
const DEVICE_RATIO = MYHEIGHT / MYWIDTH

export const width = (num) => MYWIDTH * (num / 100)
export const height = (num) => MYHEIGHT * (num / 100)
export const scale = (num) => num * (CORE_RATIO + (CORE_RATIO - DEVICE_RATIO)) / CORE_RATIO

export const isIOS = Platform.OS === 'ios'

export const THEME_DEFAULT = {
  // FONT
  // family
  fontRegular: 'Roboto-Regular',
  fontRegularItalic: 'Roboto-Italic',
  fontBold: 'Roboto-Bold',
  fontBoldItalic: 'Roboto-BoldItalic',
  fontLight: 'Roboto-Light',
  fontLightItalic: 'Roboto-LightItalic',

  // size

  fontSize: scale(12),
  fontSizeTitle: scale(32),
  fontSizeLarge: scale(16),
  fontSizeMedium: scale(18),

  // COLORS
  colorPrimary: 'white', // primary color for your app, usually your brand color.
  colorAccent: 'black', // secondary color for your app which complements the primary color.
  colorBackground: '#2196F3', // background color for pages, such as lists.
  colorSurface: 'black', // background color for elements containing content, such as cards.
  colorText: 'rgb(174, 34, 22)', // text color for content.
  colorTextTitle: 'black', // text color for title.
  colorInfo: 'black',
  colorSuccess: 'green',
  colorDanger: 'rgb(174, 34, 22)',
  colorDangerLight: 'rgb(209, 113, 104)',
  colorWarning: 'yellow',
  colorDisabled: 'gray', // color for disabled elements.
  colorPlaceholder: '#d8d8d8' // color for placeholder text, such as input placeholder.
}
export const THEME = {
  light: THEME_DEFAULT,
  pink: {...THEME_DEFAULT, colorBackground: 'pink', colorText: 'white'}
}
