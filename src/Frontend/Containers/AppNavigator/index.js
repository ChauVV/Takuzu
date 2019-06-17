import { createStackNavigator } from 'react-navigation'
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import transition from './transitions'

import HomeScreen from 'frontend/Screens/Home'
import Play from 'frontend/Screens/Play'
import Results from 'frontend/Screens/Results'

const middlewareNav = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.navigate
)

const RootNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    Play: { screen: Play },
    Results: { screen: Results }
  }, {
    headerMode: 'none',
    transitionConfig: transition
  }
)

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root')

const mapStateToProps = (state) => ({
  state: state.navigate
})

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState)

export { RootNavigator, AppNavigator, middlewareNav }
