import axios from 'axios'

/** ------------------------------------------*
* @method     : get
* @param      : url: string
* @param      : header: object
* @return     : promise
* @author     : Jack
* @description: description
* ------------------------------------------- */
export const get = (url = '', header = {}) => {
  const config = { headers: header }
  return axios.get(url, config)
    .then(response => response)
    .catch(e => e)
}
/** ------------------------------------------*
* @method     : post
* @param      : url
* @param      : data
* @param      : header
* @return     : void
* @author     : Jack
* @description: description
* ------------------------------------------- */
export const post = (url = '', data = {}, header = {}) => {
  const config = { headers: header }
  return axios.post(url, data, config)
    .then(response => response)
    .catch(e => e)
}
/** ------------------------------------------*
* @method     : put
* @param      : url
* @param      : data
* @param      : header
* @return     : void
* @author     : Jack
* @description: description
* ------------------------------------------- */
export const put = (url = '', data = {}, header = {}) => {
  const config = { headers: header }
  return axios.put(url, data, config)
    .then(response => response)
    .catch(e => e)
}
