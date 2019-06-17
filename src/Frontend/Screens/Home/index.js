
import BaseView from 'frontend/Containers/BaseView'
import React, { Component } from 'react'
import {
  StyleSheet, Text, View, BackHandler, TouchableOpacity, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { THEME_DEFAULT, ISIOS, scale } from 'utils/globalStyles'
import PropTypes from 'prop-types'
import { actionsType, RouteKey } from 'utils/globalConstants'
import { getActiveScreen } from 'utils/globalFunctions'
import { icGamePad, icTopic } from 'utils/globalIcons'

const MainButton = ({iconBtn, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.mainBtn} onPress={onPress}>
      {iconBtn}
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  )
}

class Home extends Component {
  constructor (props) {
    super(props)
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }
  componentDidMount () {
    if (ISIOS) {
      SplashScreen.hide()
    } else {
      setTimeout(() => SplashScreen.hide(), 100)
    }
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }
  onBackPress = () => {
    const { navigate } = this.props
    const activeRoute = getActiveScreen(navigate)
    if (activeRoute.routeName === RouteKey.HomeScreen) {
      BackHandler.exitApp()
      return true
    } else {
      this.props.back()
      return true
    }
  }

  render () {
    const { gotoPlay, gotoResults } = this.props

    return (
      <BaseView >
        <View style={styles.top}>
          <Text style={styles.title}>Takuzu</Text>
        </View>
        <View style={styles.bottom}>
          <ScrollView>
            <View style={styles.content}>
              <MainButton iconBtn={icGamePad(THEME_DEFAULT.colorRed)} onPress={() => gotoPlay()} title={'Play'} marginTop/>
              <MainButton iconBtn={icTopic(THEME_DEFAULT.colorRed)} onPress={() => gotoResults()} title={'Results'} marginTop/>
            </View>
          </ScrollView>
        </View>
      </BaseView>
    )
  }
}

const mapStateToProps = (state) => ({
  navigate: state.navigate
})
const mapactionsTypeToProps = (dispatch) => ({
  gotoPlay: () => dispatch({ type: actionsType.PUSH, routeName: RouteKey.Play }),
  gotoResults: () => dispatch({ type: actionsType.PUSH, routeName: RouteKey.Results })
})
export default connect(mapStateToProps, mapactionsTypeToProps)(Home)

Home.defaultProps = {
  navigation: {},
  gotoPlay: () => {},
  gotoResults: () => {}
}

Home.propTypes = {
  navigation: PropTypes.object,
  gotoPlay: PropTypes.func,
  gotoResults: PropTypes.func
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    flex: 2
  },
  title: {
    color: THEME_DEFAULT.colorPrimary,
    fontSize: THEME_DEFAULT.fontSizeTitle,
    fontWeight: 'bold'
  },
  btnText: {
    fontSize: THEME_DEFAULT.fontSizeMedium,
    paddingVertical: scale(2),
    marginTop: scale(5),
    color: THEME_DEFAULT.colorPrimary
  },
  mainBtn: {
    height: scale(90),
    width: '90%',
    backgroundColor: THEME_DEFAULT.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(30),

    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1

    // shadowColor: 'black',
    // shadowRadius: 3,
    // shadowOffset: { width: 1, height: 2 },
    // shadowOpacity: 5,
    // elevation: 3
  },
  content: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: THEME_DEFAULT.colorBackground,
    paddingBottom: scale(15)
  }
})
