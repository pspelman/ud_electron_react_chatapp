import config from "./vStore";
import {v4 as uuidv4} from "uuid";

const deviceID = "64e3fbb1-ae97-486b-a8ee-d669bf426303"

// export const cLogin = ({username, password}, socket=null) => {  // todo: implement ACTION of login, adding {username, pass}

const vsSocketsEndpointDev = "wss://ws.dev.sly.cr"
const vsSocketsEndpoint = "wss://ws.sly.cr"

let ws


// initialize websocket
const initSocket = () => {
  console.log(`initSocket--> calling initWS() `, )

  return initWS()
}

export let sessionData = {}

export function setSocketOnMessageCallback(callback) {
  let socket = makeWS()
  console.log(`setting the socket message callback`, )
  socket.onmessage = callback
  return socket
}


const ack = (txnID) => {
  console.log(`\n\nacknowledging txnID: `, txnID)
  sendViaSocket({
    method: 'ack',
    txnID: txnID
  })
}

export const handleSocketMessage = (ev) => dispatch => {
  let data = JSON.parse(ev.data)
  // TODO: ONLY ACK when the client is DONE handling the message (successfully)
  ack(data?.txnID)
  // attach the actions handler for socket messages
  if (data?.method === "sLoginComplete") {
    console.log(`sLoginComplete detected! --> setting sessionData: `, data);
    dispatch({'type': 'sLoginComplete', sessionData: data});
  }
  if (data?.method === "sThreadCreate") {  // note: separate sThreadCreate for each thread I belong to
    console.log(`sThreadCreate detected! --> adding to threads: `, data);
    dispatch({'type': 'sThreadCreate', thread: data})
  }
  if (data?.method === "sServerDeletedThread") {  // note: server deleting thread for some reason
    console.log(`sServerDeletedThread detected! --> : `, data)
    dispatch({'type': 'sServerDeletedThread', thread: data})
  }
  if (data?.method === "sShredThread") {  // note: manually shredded by owner who is NOT ME
    console.log(`sShredThread detected! --> : `, data)
    dispatch({'type': 'sShredThread', thread: data})

  } else {
    console.log(`[vsConnect.js] - handleSocketMessage: `, JSON.stringify(data))
  }

}

function initWS() {
  ws = null
  console.log(`INITIALIZING SOCKET`, )
  // const opts = {protocols: ['websockets']}
  let socket = new WebSocket(vsSocketsEndpointDev, ['websockets'])
  socket.alive = true
  // console.log(`[vsConnect.js] -> initWS() -> setting a message listener callback`, )
  // socket.onmessage = handleSocketMessage

  socket.onopen = ev => {
    console.log(`\n\n[onopen] | SOCKET OPEN -> ready to CONNECT : `, ev.data)
    // eventually need to call cConnect
  }
  socket.onerror = ev => {
    console.log(`onerror: `, ev.data)
  }
  socket.onclose = ev => {
    console.log(`onclose: `, ev.data)
  }
  ws = socket
  return socket
}

// connect the websocket
function makeWS() {
  if (ws && ws.alive && ws.readyState) {
    switch (ws.readyState) {
      case ws.OPEN:
        console.log(`WS alive: `, ws.alive, `ws.readyState === ws.OPEN -> good to go `,)
        return ws

      case 2:
        console.log(`WS alive: `, ws.alive, `readyState is 2 --> not sure what that means`)
        return ws

      case 3:
        console.log(`WS alive: `, ws.alive, `readyState is 3 --> need to re-open`)
        return initWS()

      default:
        console.log(`WS alive: `, ws.alive, `readyState is ${ws.readyState} --> NOT SURE WHAT TO DO`)
        return ws

    }
  }

  console.log(`INITIALIZING THE WS SOCKET | ws.alive: ${ws?.alive} | ws.readyState: ${ws?.readyState}`,);
  return initWS()
}


export const socket = () => {  // expose the socket
  return makeWS()
}

export const sendViaSocket = msg => {
  msg.txnID = uuidv4()
  msg.deviceID = deviceID
  console.log(`[vsSocketsApi] - sendViaSocket - sending message`, JSON.stringify(msg))
  console.log(`socket connected? `, socket().readyState)
  socket()
    .send(JSON.stringify(msg))
}


// export default vsAPI => {
//   let socket
//   const init = () => {
//     socket = makeWS()
//
//   };
//   const cLogin = (socket = null) => {
//     let loginPayload = {
//       method: "cLogin",
//       txnID: uuidv4(),
//       deviceID: deviceID,
//       address: config.devUserLogin,
//       password: config.devUserPassword,
//       deviceFriendlyName: "Reactron Testing",
//       platform: 'diving board',
//     }
//
//     const login = async () => {
//       socket = makeWS()
//       console.log(`sending cLogin with payload: `, JSON.stringify(loginPayload))
//       // TODO: wait for socket connected status to be ready
//       console.log(`Using socket: `, socket)
//       debugger
//       socket.send(JSON.stringify(loginPayload))
//     }
//
//     return login()
//     //
//     // socket send the cLogin message
//     // wait for new message back
//   }
// }

