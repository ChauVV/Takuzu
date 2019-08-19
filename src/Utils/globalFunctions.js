import moment from 'moment'
/***
 * Copy Object A return B
 */
export const copyObject = (A = {}) => {
  return JSON.parse(JSON.stringify(A))
}
/**
* NAME: strToTime
* PARAMS: time
* Convert from timeStamp to MM/DD h:mma
*/
export const strToTime = (time) => {
  try {
    return moment(Date.parse(time)).format('hh:mm DD/MM/YYYY')
  } catch (error) {
    return time
  }
}
/**
* NAME: sortArray
* PARAMS: arrSort
* Sort array id from user input
*/
export const sortArray = async (arrSort, key) => {
  const arr = await arrSort.sort((a, b) => {
    if (a[key] && b[key]) {
      return (Number(a[key]) > Number(b[key])) ? 1 : -1
    } else {
      return false
    }
  })
  return arr
}

export const romanize = (num) => {
  if (isNaN(num)) { return NaN }
  let digits = String(+num).split('')
  const key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
    '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
    '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  let roman = ''
  let i = 3
  while (i--) { roman = (key[+digits.pop() + (i * 10)] || '') + roman }
  return Array(+digits.join('') + 1).join('M') + roman
}

export const getRandomNumber = (min, max, isRound = true) => isRound ? Math.round(Math.random() * (max - min) + min) : Math.random() * (max - min) + min
