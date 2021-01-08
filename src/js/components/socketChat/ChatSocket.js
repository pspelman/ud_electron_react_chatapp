import React, {createContext} from 'react'
import io from 'socket.io-client'
import ChatMessage from "../ChatMessage";
import {timeElapsedString} from "../../utils/time";
import * as api from "../../api/chatsApi";

const wsUri = "wss://echo.websocket.org/"
let websocket

export const joinChat = (userId, chat) => dispatch =>
  api.joinChat(userId, chat.id)
    .then(chatId => {
      console.log(`successfully joined chat `, chatId)
      dispatch({type: 'CHATS_JOIN_SUCCESS', chat})
    })

let output
export const init = () => {
  console.log(`INIT -> BEGIN`,)
  output = document.getElementById("output")
  testWebSocket()
}

export const testWebSocket = () => {
  websocket = new WebSocket(wsUri)
  websocket.onopen = function (evt) {
    onOpen(evt)
  }
  websocket.onclose = function (evt) {
    onClose(evt)
  }
  websocket.onmessage = function (evt) {
    onMessage(evt)
  }
  websocket.onerror = function (evt) {
    onError(evt)
  }
}

export const onOpen = (evt) => {
  console.log(`CONNECTED! `,)
  // notify user connection is established
  writeToScreen("CONNECTED")
  doSend("WebSocket rocks")
}

export const onClose = (evt) => {
  console.log(`DISCONNECTED: `, evt.data)
  // send alert that the socket is disconnected
  writeToScreen("DISCONNECTED")
}

export const onMessage = (evt) => {
  // add response to messages with response attribute
  writeToScreen('<span style="color: blue">RESPONSE: ' + JSON.stringify(evt.data) + '</span>')
  console.log(`got response! `, evt.data)
  // websocket.close()
}

export const onError = (evt) => {
  console.log(`ther was an ERROR: `, evt.data)
  // update the error display
  writeToScreen('<span style="color: red">ERROR:</span> ' + evt.data)
}

export const doSend = (message) => {
  // add message to messages with sent attribute
  console.log(`sending message `, message)
  writeToScreen("SENT: " + message)
  websocket.send(message)
}

export const writeToScreen = (message) => {
  // add the message to the overall messages
  const pre = document.createElement("p")
  pre.style.wordWrap = "break-word"
  pre.innerHTML = message
  output.appendChild(pre)
}
// export const ChatSocket = () => {
//   let output
//
//   function init() {
//     console.log(`INIT -> BEGIN`,)
//     output = document.getElementById("output")
//     testWebSocket()
//   }
//
//   function testWebSocket() {
//     const websocket = new WebSocket(wsUri)
//     websocket.onopen = function (evt) {
//       onOpen(evt)
//     }
//     websocket.onclose = function (evt) {
//       onClose(evt)
//     }
//     websocket.onmessage = function (evt) {
//       onMessage(evt)
//     }
//     websocket.onerror = function (evt) {
//       onError(evt)
//     }
//   }
//
//   function onOpen(evt) {
//     console.log(`CONNECTED! `,)
//     // notify user connection is established
//     writeToScreen("CONNECTED")
//     doSend("WebSocket rocks")
//   }
//
//   function onClose(evt) {
//     console.log(`DISCONNECTED: `, evt.data)
//     // send alert that the socket is disconnected
//     writeToScreen("DISCONNECTED")
//   }
//
//   function onMessage(evt) {
//     // add response to messages with response attribute
//     writeToScreen('<span style="color: blue">RESPONSE: ' + evt.data + '</span>')
//     console.log(`got response! `, evt.data)
//     websocket.close()
//   }
//
//   function onError(evt) {
//     console.log(`ther was an ERROR: `, evt.data)
//     // update the error display
//     writeToScreen('<span style="color: red">ERROR:</span> ' + evt.data)
//   }
//
//   function doSend(message) {
//     // add message to messages with sent attribute
//     console.log(`sending message `, message)
//     writeToScreen("SENT: " + message)
//     websocket.send(message)
//   }
//
//   function writeToScreen(message) {
//     // add the message to the overall messages
//     const pre = document.createElement("p")
//     pre.style.wordWrap = "break-word"
//     pre.innerHTML = message
//     output.appendChild(pre)
//   }
//
//   window.addEventListener("load", init, false)
//   console.log(`[ChatSocket] -> calling init()`,)
//
// }

// const ChatDirectMessagesList = () => {
//   return (
//     <div className="chat-container">
//       <ul ref={innerRef} className="chat-box chatContainerScroll">
//         {
//           messages.map(message => {
//           return (
//             <li
//               key={message.id}
//               className={`${chatClass}`}>
//               <div className="chat-avatar">
//                 <img
//                   src="https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png"
//                   alt="avatar placeholder"/>
//                 <div className="chat-name">{'Anonymous'}</div>
//               </div>
//               <div className="chat-text-wrapper">
//                 <span className="chat-text">{message || '...waiting on content'}</span>
//                 <span className="chat-spacer"></span>
//                 <div className="chat-hour">
//                   {timeElapsedString(message?.timestamp) || 'some time ago'}
//                 </div>
//               </div>
//             </li>
//           )
//         })}
//       </ul>
//       <br/>
//       <br/>
//     </div>
//   )
// }
//
// const ChatSocket = () => {
//   const [messages, setMessages] = useState([]);
//
//   // messages received
//   // send messages
//   // update the list of messages
//
//   // establish the socket connection
//   // send a message
//   // listen for messages on this socket
//   // update a view
//   console.log(`socket chat view`,)
//
//   return (
//     <React.Fragment>
//       <div>
//
//       </div>
//     </React.Fragment>
//   )
// }
//
// export default ChatSocket