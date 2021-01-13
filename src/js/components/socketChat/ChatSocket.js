import React, {createContext} from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import ChatMessage from "../ChatMessage";
import {timeElapsedString} from "../../utils/time";
import * as api from "../../api/chatsApi";

const wsUri = "wss://echo.websocket.org/"
let websocket
const messages = []  // could limit the size of the list for memory concerns

export const joinChat = (userId, chat) => dispatch =>
  api.joinChat(userId, chat.id)
    .then(chatId => {
      console.log(`successfully joined chat `, chatId)
      dispatch({type: 'CHATS_JOIN_SUCCESS', chat})
    })

let output
export const init = () => {
  console.log(`[ECHO SOCKET ] - INIT -> BEGIN`,)
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
  console.log(`[ECHO SOCKET ] - CONNECTED! `,)
  // notify user connection is established
  writeToScreen("CONNECTED")
  doSend("WebSocket rocks")
}

export const onClose = (evt) => {
  console.log(`DISCONNECTED: `, evt.data)
  // send alert that the socket is disconnected
  writeToScreen("DISCONNECTED")
}

// export const onMessage = (evt) => {
//   // add response to messages with response attribute
//   writeToScreen('<span style="color: blue">RESPONSE: ' + JSON.stringify(evt.data) + '</span>')
//   console.log(`got response! `, evt.data)
//   // websocket.close()
// }

export const onMessage = (evt) => {
  // add response to messages with response attribute
  let receivedMsg = {
    content: evt.data,
    direction: 'inbound',
    timestamp: new Date(),
  }
  // writeToScreen('<span style="color: blue">RESPONSE: ' + JSON.stringify(evt.data) + '</span>')
  // console.log(`Got response!: `, JSON.stringify(evt.data))
  writeToScreen(receivedMsg)
  // console.log(`got response! `, evt.data)
  // websocket.close()
}

export const onError = (evt) => {
  console.log(`there was an ERROR: `, evt.data)
  // update the error display
  writeToScreen('<span style="color: red">ERROR:</span> ' + evt.data)
}

export const doSend = (message) => {
  // add message to messages with sent attribute
  // writeToScreen("SENT: " + {message})
  writeToScreen(message)
  // console.log(`sending message `, JSON.stringify(message))
  message = JSON.stringify(message)
  websocket.send(message)
}

const createSocketMessageDiv = ({content, timestamp, direction}, msgId) => {  // make sure to add direction to the message
  // timestamp
  // message content
  // incoming or outgoing
  console.log(`creating socket message DIRECTION: `, direction)
  let msgOutput, colorCode

  if (direction === 'inbound') {
    msgOutput = `RECEIVED: ${content}`;
    colorCode = "turquoise"
  } else if (direction === "outbound") {
    msgOutput = `SENT: ${content}`;
    colorCode = "pink";
  } else {
    msgOutput = `SYSTEM: ${content}`
    colorCode = "greenyellow"
  }
  return (
    <div key={msgId}
         className={`socket-message ${direction ? direction : 'no-direction'}`}
         style={{color: `${colorCode}`}}
    >
      {msgOutput}
      <hr/>
    </div>
  );
}

export const writeMessages = () => {
  // get all the messages and render them out
  const messageDivs = messages.map((message, msgId) => {
    // let msg = {'content': message}
    return createSocketMessageDiv(message, msgId)
  })

  ReactDOM.render(messageDivs, document.getElementById('output'))
}

export const writeToScreen = (msg, direction = null) => {
  // add the message to the overall messages
  // const pre = document.createElement("p")
  let message
  message = {
    timestamp: new Date(),
    direction: direction || 'no-direction',
  }
  if (msg && typeof msg.valueOf() === "string") {
    // s is a string
    message = {
      content: msg,
    }
  } else {
    message = {
      ...message,
      ...msg
    }
    // message.direction = msg.direction ? msg.direction : 'no-direction'
  }
  messages.push(message)
  writeMessages()
  // let element = createSocketMessageDiv(messages)
  // console.log(`writeToScreen with : `, message)
  // ReactDOM.render(element, document.getElementById('output'))
  // note: maybe try div? const pre = document.createElement("div")
  // const pre = createSocketMessageDiv(message)
  // output.appendChild(pre)
}

// export const writeToScreen = (message) => {
//   // add the message to the overall messages
//   const pre = document.createElement("p")
//   pre.style.wordWrap = "break-word"
//   pre.innerHTML = message
//   console.log(`writeToScreen with : `, message)
//   output.appendChild(pre)
// }


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