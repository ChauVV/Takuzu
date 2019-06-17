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
    return moment(Date.parse(time)).format('hh:mm   DD/MM/YYYY')
  } catch (error) {
    return time
  }
}
/**
* NAME: sortArray
* PARAMS: arrSort
* Sort array id from user input
*/
export const sortArray = (arrSort, key) => {
  return arrSort.sort((a, b) => {
    if (a[key] && b[key]) {
      return (Number(a[key]) > Number(b[key])) ? 1 : -1
    } else {
      return false
    }
  })
}

export const getRandomNumber = (min, max) => Math.random() * (max - min) + min
