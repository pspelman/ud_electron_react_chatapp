import React, {useState, useEffect} from 'react'
import {createTimestamp} from "../utils/time";
import {cConnect, cLogin, cLogout, initVsSocket,} from "../api/vsAuthApi";
import socketIOClient from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {handleSocketMessage} from "../db/vsConnect";
import {cShredThread, cThreadCreate, cThreadMessage} from "../actions/vsChatActions";
const faker = require('faker');

const ENDPOINT = "wss://ws.dev.sly.cr";
const MIKE_GUID = "9a6b39cc-ce8a-4026-b24f-7220ad2d71a4"
const VS_BOT_GUID = "264d1fd8-7e14-4d94-9169-a4c64fdadfe5"

export default function Messenger({onSubmit}) {
  const session = useSelector(({vs}) => vs.session)
  const thread = useSelector(({vschats}) => vschats.selectedThread)
  const [value, setValue] = useState(faker.commerce.productName())
  const [messageRecipients, setMessageRecipients] = useState([MIKE_GUID]);
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState("");

  const dispatch = useDispatch()
  // const setSessionInfo = session => dispatch({
  //   type: 'sLoginComplete',
  //   sessionData: session
  // })

  useEffect(() => {
    console.log(`calling setSocket()`,)
    setSocket(initVsSocket())
    // console.log(`initializing the socket `, )
    // setSocket(vSocket())
  }, [])


  useEffect(() => {
    if (socket) {
      socket.addEventListener('open', () => {
        console.log(`SOCKET IS OPEN --> calling cConnect`,)
        cConnect()
      });
      socket.addEventListener('message', ev => {
        console.log(`adding onmessage event listener`,)
        dispatch(handleSocketMessage(ev))
      })
    }
  }, [socket])


  const onKeyPress = e => {
    if (e.key === 'Enter') {
      // alert(value)  // show the value we're getting from the state
      e.preventDefault()  // prevent the new line creation
      sendMessage(value)
      setValue('')  // clear the text field
    }
  }

  const createThread = () => {
    console.log(`\n\ntrying to send thread with `, value.trim(), " to ", messageRecipients)
    // todo: add callback to wait for ack or cancel
    dispatch(cThreadCreate(session, messageRecipients, value.trim()))
  }

  const sendThreadMessage = () => {
    dispatch(cThreadMessage(session, thread, value.trim()))
    setValue(faker.commerce.productName())
  }

  const vaporizeThread = () => {
    dispatch(cShredThread(session, thread))
  }

  const sendMessage = () => {
    if (value.trim() === '') return  // prevent empty value from sending message
    // create message objects

    const message = {
      content: value.trim(),
      timestamp: createTimestamp(),
      direction: 'outbound',
    }
    onSubmit(message)
  }

  const doLogin = () => {
    console.log(`calling cLogin`,)
    cLogin()
  }


  const doLogout = () => {
    console.log(`session: `, session)
    console.log(`session.sessionData: `, session.sessionData)


    if (window.sessionData && window.sessionData.sessionID) {
      console.log(`calling cLogout with session info :  `, JSON.stringify(session))

      cLogout(window.sessionData);
    } else {
      console.log(`PRESSED LOGOUT but no window session: `, window.session)

    }
  }

  return (
    <div className={'chat-input form-group mt-3 mb-0'}>
      <ul id="messages"></ul>
      <form id="form" action="" onSubmit={e => {
        e.preventDefault()
      }}>
        <label htmlFor="chatMessage">Chat Message</label>
        <input id="chatMessage"
               className={'form-control'}
               onKeyPress={onKeyPress}
               onChange={e => setValue(e.target.value)}
               value={value}
               autoFocus={true}
               autoComplete="off"
        />

        <input id="messageRecipients"
               onKeyPress={onKeyPress}
               onChange={e => setValue(e.target.value)}
               value={messageRecipients}
               autoComplete="off"
        />

        <button className={'btn btn-outline-success ml-2'} onClick={doLogin}>
          cLogin
        </button>

        <button className={'btn btn-outline-success ml-2'} onClick={() => {
          console.log(`Sending ${value}`,)
          createThread()
        }}>
          Start cThread
        </button>

        <button className={'btn btn-outline-success ml-2'}
                onClick={sendThreadMessage}
        >
          Send Message
        </button>

        <button className={'btn btn-outline-success ml-2'}
                onClick={vaporizeThread}
        >
          Vaporize
        </button>


        <button className={'btn btn-outline-success ml-2'} onClick={doLogout} >
          cLogout
        </button>
      </form>
    </div>
  )
}
//     <div className="chat-input form-group mt-3 mb-0">
//       <label htmlFor="newChat">
//         input outgoing messages
//       </label>
//       <textarea
//         // onKeyPress={(e) => {onKeyPress(e)}}
//         onChange={e => setValue(e.target.value)}
//         onKeyPress={onKeyPress}
//         className={"form-control"}
//         value={value}
//         name="newChat"
//         id="newChat"
//         placeholder={"...your message..."}
//         cols="30"
//         rows="3">
//
//           </textarea>
//
//     </div>
//   )
// };