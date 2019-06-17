
import BaseView from 'frontend/Containers/BaseView'
import React, { Component } from 'react'
import {
  StyleSheet, Text, View
} from 'react-native'
import { connect } from 'react-redux'
import { THEME_DEFAULT, height, scale } from 'utils/globalStyles'
import { getRandomNumber, copyObject } from 'utils/globalFunctions'
import Takuzu from 'frontend/Components/Takuzu'

// Create cell value {(-1 || 0 || 1), isDefault}
const createCellValue = (isDefault) => {
  return { value: isDefault ? getRandomNumber(0, 1) : -1, isDefault }
}

const sum = (arr) => {
  let sum = 0
  arr.map(i => { if (i.value >= 0) sum += i.value })
  return sum
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
    let tempX = new Set()
    let tempY = new Set()
    let position = {x: 0, y: 0}

    do {
      const x = getRandomNumber(0, 3)
      const y = getRandomNumber(0, 3)
      position = {x, y}
      if (!tempSet.has(position) && !tempX.has(x) && !tempY.has(y)) {
        tempSet.add(position)
        tempX.add(x)
        tempY.add(y)
        takuzu[x][y] = createCellValue(true)
      }
    } while (tempSet.size < numRandom)
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
    this.setState({takuzu}, () =>
      this.checkRules())
  }
  checkRules = () => {
    const isCorrect = this.rule()
    if (isCorrect) {
      alert('OK')
    }
  }

  // Rule
  rule = () => {
    const { takuzu } = this.state

    let rowEquas = {}
    let columnEquas = {}

    for (let i = 0; i < this.takuzuSize; i++) {
      this.column = []

      for (let j = 0; j < this.takuzuSize; j++) {
        // kiem tra 3 phan tu lien ke ROW
        if (takuzu[i][j + 1] !== undefined && takuzu[i][j + 2] !== undefined) {
          let sum3 = 0
          if (takuzu[i][j].value >= 0) sum3 += takuzu[i][j].value
          if (takuzu[i][j + 1].value >= 0) sum3 += takuzu[i][j + 1].value
          if (takuzu[i][j + 2].value >= 0) sum3 += takuzu[i][j + 2].value
          if (sum3 === 0 || sum3 === 3) {
            return false
          }
        }

        // kiem tra 3 phan tu lien ke COLUMN
        if (takuzu[j + 1] !== undefined && takuzu[j + 1][i] !== undefined && takuzu[j + 2] !== undefined && takuzu[j + 2][i] !== undefined) {
          let sum3 = 0

          if (takuzu[j][i].value >= 0) sum3 += takuzu[j][i].value
          if (takuzu[j + 1][i].value >= 0) sum3 += takuzu[j + 1][i].value
          if (takuzu[j + 2][i].value >= 0) sum3 += takuzu[j + 2][i].value
          if (sum3 === 0 || sum3 === 3) {
            return false
          }
        }
        this.column.push(takuzu[j][i])
      }
      // kiem tra so phan tu 0, 1 co bang nhau
      if (sum(takuzu[i]) !== this.takuzuSize / 2) {
        return false
      }
      if (sum(this.column) !== this.takuzuSize / 2) {
        return false
      }
      // Kiem tra moi dong la unique
      let arrValueRow = []
      takuzu[i].map(i => arrValueRow.push(i.value))
      arrValueRow = arrValueRow.join('')

      if (rowEquas[arrValueRow] !== undefined) {
        return false
      } else {
        rowEquas[arrValueRow] = arrValueRow
      }
      // Kiem tra moi hang la unique
      let arrValueColumn = []
      this.column.map(t => arrValueColumn.push(t.value))
      arrValueColumn = arrValueColumn.join('')

      if (columnEquas[arrValueColumn] !== undefined) {
        return false
      } else {
        columnEquas[arrValueColumn] = arrValueColumn
      }
    }
    return true
  }

  render () {
    const { minutes, seconds, takuzu } = this.state
    return (
      <BaseView >
        <View style={styles.container}>
          <Text style={styles.timerTitle}>Timer</Text>
          <Text style={styles.timer}>{`${minutes}:${seconds}`}</Text>
          <Takuzu takuzu={takuzu} onPressCell={this.onPressCell}/>
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
  }
})
