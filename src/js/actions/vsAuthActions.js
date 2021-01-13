import * as vsApi from '../db/vsConnect'


export const loginUser = loginPayload => dispatch => {
  console.log(`trying to login with `, loginPayload)
  // call a cLogin
  dispatch({type: 'VS_LOGIN_INIT'})
  vsApi.cLogin(loginPayload)


}