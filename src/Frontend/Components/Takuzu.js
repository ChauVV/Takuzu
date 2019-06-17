
import React from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native'
import { THEME_DEFAULT, width, scale } from 'utils/globalStyles'
import PropTypes from 'prop-types'

const renderTakuzuCell = (item, i, j, onPressCell) => {
  return (
    <TouchableOpacity
      key={`${i}${j}`}
      style={[styles.cell, {
        opacity: item.isDefault ? 1 : 0.8,
        backgroundColor: item.value === 1 ? THEME_DEFAULT.colorSuccess : item.value === 0 ? THEME_DEFAULT.colorDanger : THEME_DEFAULT.colorPlaceholder
      }]}
      onPress={() => onPressCell(item, i, j)}
      disabled={item.isDefault}
    >
      <Text style={[styles.cellText]}>{`${item.value === -1 ? '' : item.value}`}</Text>
    </TouchableOpacity>
  )
}
const Takuzu = ({takuzu, onPressCell}) => {
  return (
    <View style={styles.takuzu}>
      { takuzu.map((t, i) => {
        return (
          <View key={`${i}`} style={styles.takuzuRow} >
            {t.map((item, j) => renderTakuzuCell(item, i, j, onPressCell))}
          </View>
        )
      }) }
    </View>
  )
}

export default Takuzu

Takuzu.defaultProps = {
  takuzu: [],
  onPressCell: () => {}
}

Takuzu.propTypes = {
  takuzu: PropTypes.array,
  onPressCell: PropTypes.func
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
