
import BaseView from 'frontend/Containers/BaseView'
import React, { Component } from 'react'
import {
  StyleSheet, Text
} from 'react-native'
import { connect } from 'react-redux'
import { THEME_DEFAULT } from 'utils/globalStyles'
// import PropTypes from 'prop-types'
// import { actionsType, RouteKey } from 'utils/globalConstants'

class Play extends Component {
  render () {
    return (
      <BaseView style={styles.container}>
        <Text>Play</Text>
      </BaseView>
    )
  }
}

const mapStateToProps = (state) => ({
})
const mapactionsTypeToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapactionsTypeToProps)(Play)

Play.defaultProps = {
}

Play.propTypes = {
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_DEFAULT.colorBackground,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
