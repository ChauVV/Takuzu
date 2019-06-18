
import BaseView from 'frontend/Containers/BaseView'
import React, { Component } from 'react'
import {
  StyleSheet, Text, View, FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { THEME_DEFAULT, scale } from 'utils/globalStyles'
import PropTypes from 'prop-types'
import {
  romanize, strToTime
} from 'utils/globalFunctions'
import XButton from 'frontend/Components/XButton'
import { actionsType } from 'utils/globalConstants'

const renderSCore = (ob) => {
  const { item, index } = ob
  return (
    <View style={styles.cell}>
      <Text style={styles.cellTextBold}>{`${romanize(index + 1)}:`}</Text>
      <Text style={styles.cellText}>{`${item.timeDisplay}`}</Text>
      <Text style={styles.cellTextDate}>{`${strToTime(item.date)}`}</Text>
    </View>
  )
}

const Recent = ({item}) => {
  if (item.timeDisplay !== undefined) {
    return (
      <View style={[styles.cell, styles.footer]}>
        <Text style={styles.cellTextBold}>{`Recent:`}</Text>
        <Text style={styles.cellText}>{`${item.timeDisplay}`}</Text>
        <Text style={styles.cellTextDate}>{`${strToTime(item.date)}`}</Text>
      </View>
    )
  } else {
    return (<View/>)
  }
}
const NaviButton = ({title = '', onPress = () => {}}) => {
  return (
    <XButton style={styles.btnNavi} onPress={() => onPress()} >
      <Text style={styles.btnNavText}>{title}</Text>
    </XButton>
  )
}
class HightScores extends Component {
  render () {
    const { hightScores } = this.props

    return (
      <BaseView >
        <View style={styles.top}>
          <Text style={styles.title}>Hight Scores</Text>
        </View>
        <View style={styles.bottom}>
          <FlatList
            data={hightScores.scores}
            renderItem = {(ob) => renderSCore(ob)}
            keyExtractor={(_, index) => index.toString()}
            style={styles.flatlist}
          />
          <Recent item={hightScores.new}/>
          <NaviButton title={'Back'} onPress={() => this.props.back()}/>
        </View>
      </BaseView>
    )
  }
}

const mapStateToProps = (state) => ({
  hightScores: state.hightScores
})
const mapactionsTypeToProps = (dispatch) => ({
  back: () => dispatch({ type: actionsType.POP })
})
export default connect(mapStateToProps, mapactionsTypeToProps)(HightScores)

HightScores.defaultProps = {
  hightScores: {
    scores: [],
    new: {}
  }
}

HightScores.propTypes = {
  hightScores: PropTypes.object
}

const styles = StyleSheet.create({
  btnNavi: {
    marginTop: '5%',
    marginBottom: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(120),
    height: '10%',

    borderWidth: 1,
    borderRadius: 5,
    borderColor: THEME_DEFAULT.colorPrimary
  },
  btnNavText: {
    color: THEME_DEFAULT.colorPrimary,
    fontSize: THEME_DEFAULT.fontSizeLarge
  },
  footer: {
    height: '10%',
    width: '80%',
    marginTop: '7%',
    paddingHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: THEME_DEFAULT.colorPrimary
  },
  cellTextBold: {
    width: '20%',
    color: THEME_DEFAULT.colorPrimary
  },
  cellTextDate: {
    color: THEME_DEFAULT.colorPrimary
  },
  cellText: {
    fontWeight: 'bold',
    color: THEME_DEFAULT.colorPrimary
  },
  cell: {
    width: '100%',
    marginTop: '7%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: THEME_DEFAULT.colorPrimary
  },
  flatlist: {
    width: '80%',
    height: '80%',
    padding: '3%',
    borderColor: THEME_DEFAULT.colorPrimary,
    borderWidth: 1,
    borderRadius: 5
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    flex: 2,
    alignItems: 'center',
    paddingBottom: '2%'
  },
  title: {
    color: THEME_DEFAULT.colorPrimary,
    fontSize: THEME_DEFAULT.fontSizeTitle,
    fontWeight: 'bold'
  }
})
