
import BaseView from 'frontend/Containers/BaseView'
import React, { Component } from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { THEME_DEFAULT, width, height, scale } from 'utils/globalStyles'
// import PropTypes from 'prop-types'
// import { actionsType, RouteKey } from 'utils/globalConstants'
import { getRandomNumber, copyObject } from 'utils/globalFunctions'

// Create cell value {(-1 || 0 || 1), isDefault}
const createCellValue = (isDefault) => {
  return { value: isDefault ? getRandomNumber(0, 1) : -1, isDefault }
}

class Play extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      hours: '00',
      minutes: '00',
      seconds: '00',
      takuzu: []
    })
    this.secondsRemaining = 0
    this.takuzuSize = 4
  }

  componentDidMount () {
    this.create2DimentionArray()
    this.startTimer()
  }

  componentWillUnmount () {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle)
    }
  }
  create2DimentionArray = () => {
    // Create arr[][]
    let takuzu = new Array(this.takuzuSize)
    for (i = 0; i < this.takuzuSize; i++) { takuzu[i] = new Array(this.takuzuSize) }

    // Set init value for arr[][]
    for (let i = 0; i < this.takuzuSize; i++) {
      for (let j = 0; j < this.takuzuSize; j++) {
        takuzu[i][j] = createCellValue(false)
      }
    }
    // // Add default value (random)
    const numRandom = Math.round(getRandomNumber(2, 4))
    let tempSet = new Set()
    let position = {x: 0, y: 0}

    do {
      const x = getRandomNumber(0, 3)
      const y = getRandomNumber(0, 3)
      position = {x, y}
      if (!tempSet.has(position)) {
        tempSet.add(position)
        takuzu[x][y] = createCellValue(true)
      }
    } while (tempSet.size < numRandom)
    console.log('takuzu: ', takuzu)
    this.setState({takuzu})
    return takuzu
  }

  startTimer = async () => {
    this.intervalHandle = setInterval(this.tick, 1000)
  }
  tick = () => {
    try {
      this.secondsRemaining += 1

      const hours = Math.floor(this.secondsRemaining % (60 * 60 * 24) / (60 * 60))
      const minutes = Math.floor(this.secondsRemaining % (60 * 60) / 60)
      const seconds = Math.floor(this.secondsRemaining % 60)

      this.setState({
        seconds: seconds < 10 ? '0' + seconds : seconds,
        minutes: minutes < 10 ? '0' + minutes : minutes,
        hours: hours < 10 ? '0' + hours : hours
      })
    } catch (error) {
      console.log('tick: ', error)
    }
  }
  onPressCell = (item, i, j) => {
    let takuzu = copyObject(this.state.takuzu)
    takuzu[i][j].value = (item.value === -1 || item.value === 1) ? 0 : 1
    this.setState({takuzu})

    this.checkRules(takuzu)
  }
  checkRules = (takuzu) => {

  }
  renderTakuzuCell = (item, i, j) => {
    return (
      <TouchableOpacity
        key={`${i}${j}`}
        style={[styles.cell, {
          opacity: item.isDefault ? 1 : 0.8,
          backgroundColor: item.value === 1 ? THEME_DEFAULT.colorBackground : item.value === 0 ? THEME_DEFAULT.colorDanger : THEME_DEFAULT.colorPlaceholder
        }]}
        onPress={() => this.onPressCell(item, i, j)}
        disabled={item.isDefault}
      >
        <Text style={[styles.cellText]}>{`${item.value === -1 ? '' : item.value}`}</Text>
      </TouchableOpacity>
    )
  }
  renderTakuzu = () => {
    const { takuzu } = this.state
    return (
      <View style={styles.takuzu}>
        { takuzu.map((t, i) => {
          return (
            <View key={`${i}`} style={styles.takuzuRow} >
              {t.map((item, j) => this.renderTakuzuCell(item, i, j))}
            </View>
          )
        }) }
      </View>
    )
  }
  render () {
    const { minutes, seconds } = this.state
    return (
      <BaseView >
        <View style={styles.container}>
          <Text style={styles.timerTitle}>Timer</Text>
          <Text style={styles.timer}>{`${minutes}:${seconds}`}</Text>
          {this.renderTakuzu()}
        </View>
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
  takuzuRow: {
    flexDirection: 'row',
    width: '100%',
    height: '22%',
    justifyContent: 'space-around'
  },
  cell: {
    width: '22%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  cellText: {
    color: THEME_DEFAULT.colorPrimary,
    fontSize: scale(22),
    fontWeight: 'bold'
  },
  timerTitle: {
    marginTop: height(17),
    color: THEME_DEFAULT.colorPrimary,
    fontSize: THEME_DEFAULT.fontSizeLarge,
    fontWeight: 'bold'
  },
  timer: {
    marginBottom: scale(60),
    color: THEME_DEFAULT.colorPrimary,
    fontSize: THEME_DEFAULT.fontSizeLarge
  },
  container: {
    flex: 1,
    backgroundColor: THEME_DEFAULT.colorBackground,
    alignItems: 'center'
  },
  takuzu: {
    width: width(82),
    height: width(82),

    justifyContent: 'space-around',
    backgroundColor: THEME_DEFAULT.colorPrimary,

    borderWidth: 2,
    borderColor: THEME_DEFAULT.colorPrimary,
    borderRadius: 5
  }
})
