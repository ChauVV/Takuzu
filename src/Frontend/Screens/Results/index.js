
import BaseView from 'frontend/Containers/BaseView'
import React, { Component } from 'react'
import {
  StyleSheet, Text, View
} from 'react-native'
import { connect } from 'react-redux'
import { THEME_DEFAULT } from 'utils/globalStyles'
// import PropTypes from 'prop-types'
// import { actionsType, RouteKey } from 'utils/globalConstants'

class Results extends Component {
  render () {
    return (
      <BaseView>
        <View style={styles.container}>
          <Text>Results</Text>
        </View>
      </BaseView>
    )
  }
}

const mapStateToProps = (state) => ({
})
const mapactionsTypeToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapactionsTypeToProps)(Results)

Results.defaultProps = {
}

Results.propTypes = {
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_DEFAULT.colorBackground
  }
})
