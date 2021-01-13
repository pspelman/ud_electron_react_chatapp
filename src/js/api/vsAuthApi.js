import {io} from 'socket.io-client'
import {v4 as uuidv4} from 'uuid';
import {writeToScreen} from "../components/socketChat/ChatSocket";
import * as vSocket from "../db/vsConnect";
import config from "../db/vStore";
import {handleSocketMessage, sendViaSocket} from "../db/vsConnect";


const msgQ = []
const deviceID = "64e3fbb1-ae97-486b-a8ee-d669bf426303"

function procMessage(msg) {
  console.log(`got message: `, msg)
  console.log(JSON.parse(msg));

}


export const listenToSocketMessages = () => dispatch => {
  // dispatch({type: 'S_MESSAGE_RECEIVED'})  // this fires off to initialize authentication
  vSocket.setSocketOnMessageCallback(message => {
    console.log(`\n\nVS WEBSOCKET onmessage: `, JSON.stringify(message))
    // check for "sLoginComplete"
    // todo: check for session info if it is a login complete message
    // console.log(`\n\nLOGIN COMPLETE MESSAGE RECEIVED! --> update session info: `, JSON.stringify(message));
    writeToScreen(message, 'inbound')
    dispatch({type: 'S_MESSAGE_RECEIVED', message: message})
    })
}


export const cLogout = ({sessionID}) => {
  console.log(`trying to logout: `,)
  let logoutPayload = {
    method: "cLogout",
    txnID: uuidv4(),
    deviceID: deviceID,
    sessionID: sessionID,
  }

  console.log(`sending cLogout with payload: `, JSON.stringify(logoutPayload))
  // TODO: wait for socket connected status to be ready
  sendViaSocket(logoutPayload)

}

export const cLogin = (loginPayload={}) => {
  loginPayload = {
    method: "cLogin",
    txnID: uuidv4(),
    deviceID: deviceID,
    address: config.devUserLogin,
    password: config.devUserPassword,
    deviceFriendlyName: "Reactron Testing",
    platform: 'diving board',
  }

  console.log(`sending cLogin with payload: `, JSON.stringify(loginPayload))
  // debugger
  sendViaSocket(loginPayload)
  // wait for new message back
}


// export const initVsSocket = vSocket.socket()

export const initVsSocket = () => vSocket.socket()

export const cConnect = () => {
  console.log(`\n\n[vsSocketsApi] - cConnect - sending cConnect message`,)
  sendViaSocket({
    method: 'cConnect',
    platform: 'qatest',
    version: "1.0.0",
  })
}

export const WScConnect = (socket) => {
  let msg = {
    method: 'cConnect',
    platform: 'qatest',
    version: "1.0.0",
    txnID: uuidv4(),
    deviceID: deviceID,
  }
  console.log(`\n\n[vsSocketsApi] - WScConnect - sending cConnect message: `, msg)
  socket.send(JSON.stringify(msg))
  return socket
}

export const wsSend = msg => {
  if (!msg.txnID) {
    msg.txnID = uuid();
    msg.deviceID = deviceID;
  }
  if (!['cConnect', 'ack', 'cLogin', 'cRegister', 'cRegisterConfirm'].includes(msg.method)) {
    // msg.sessionID = db.sessionID || db.config.sessionID;
    // let ind = msgQueue.findIndex(q => q.msg.txnID == msg.txnID);
    // if (ind >= 0) msgQueue[ind].n = 0; else msgQueue.push({n: 0, msg: msg});
  }
  if (ws.alive) {
    if (ws.readyState != ws.OPEN) console.log(`WS state: ${ws.readyState} ${msg.method}`)
    else {
      debug(msg);
      ws.send(JSON.stringify(msg));
    }
  }
}


/*
{
    "method"              : "cConnect",
    "txnID"               : UUID 4 String,
    "deviceID"            : UUID 4 String,
    "platform"            : qatest,        // 'android', 'iOS', 'web', 'qatest', 'desktop'
    "version"             : 1.0.0,        // x.y.z, major.minor.build, maximum of 3 digits in any section
    "isBackgroundConnect" : BOOL,          // OPTIONAL: Should be True when cConnect is sent in response to silent (heartbeat) push notification
    "api"                 : INT            // The API version number. Refer to top of this doc.
}
*/
// cRegister  - can use email or text code
// cRegisterConfirm -- send back to VS w/received auth code

// cLogin
// connect to the socket


// send cConnect