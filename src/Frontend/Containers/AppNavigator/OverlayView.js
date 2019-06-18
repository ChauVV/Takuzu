
import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View, Text, Animated
} from 'react-native'
import { connect } from 'react-redux'
import { THEME_DEFAULT, height, scale } from 'utils/globalStyles'
import { actionsType } from 'utils/globalConstants'
import PropTypes from 'prop-types'

class OverlayView extends PureComponent {
  state={
    animatedValue: new Animated.Value(0)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.prompt.isShow !== this.props.prompt.isShow) {
      Animated.sequence([
        Animated.timing(this.state.animatedValue, {
          toValue: 1,
          duration: 500
        }),
        Animated.timing(this.state.animatedValue, {
          toValue: 0,
          duration: 500,
          delay: 2000
        })
      ]).start()
    }
  }
  renderModalNotification = () => {
    return (
      <View style={styles.modal}>
        <View/>
      </View>
    )
  }
  render () {
    const {
      prompt
    } = this.props
    const { animatedValue } = this.state

    return (
      <View style={styles.container}
        pointerEvents="box-none"
      >
        {
          <View style={styles.promtView} pointerEvents="none">
            <Animated.View style={[{ opacity: animatedValue }]}>
              <View style={styles.promt} pointerEvents="none">
                <Text numberOfLines={2} style={styles.overlayText}>{prompt.message}</Text>
              </View>
            </Animated.View>
          </View>
        }
      </View >
    )
  }
}

const mapStateToProps = (state) => ({
  // internet: state.internet,
  appStatus: state.appStatus,
  notification: state.notification,
  prompt: state.prompt
})
const mapactionsTypeToProps = (dispatch) => ({
  offNotification: () => dispatch({ type: actionsType.OFF_NOTIFICATION })
})
export default connect(mapStateToProps, mapactionsTypeToProps)(OverlayView)

OverlayView.defaultProps = {
  notification: {title: '', message: '', isShow: false},
  offNotification: () => {},
  prompt: {}
}

OverlayView.propTypes = {
  notification: PropTypes.any,
  offNotification: PropTypes.func,
  prompt: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  promtView: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    width: '100%',
    bottom: height(3),
    paddingHorizontal: scale(20)
  },
  promt: {
    flexDirection: 'row',
    paddingHorizontal: height(2),
    paddingVertical: height(1),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: height(2)
  },
  overlayText: {
    color: THEME_DEFAULT.colorPrimary,
    fontSize: height(2),
    marginBottom: 0
  },
  modal: {
    width: height(110),
    height: height(70),
    alignItems: 'center',
    paddingTop: height(5)
  }
})
