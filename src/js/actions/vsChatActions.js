import * as vsApi from '../db/vsConnect'
import {sendViaSocket} from "../db/vsConnect";
import {v4 as uuidv4} from "uuid";
import * as api from "../api/chatsApi";


/*
* {
    "method"                      : "cThreadCreate",
    "txnID"                       : UUID_STRING,
    "deviceID"                    : UUID_STRING,
    "sessionID"                   : UUID_STRING,
    "threadID"                    : UUID_STRING,
    "threadType"                  : "chat"
    "members"                     : [{"serverGuid": <your guid>, "icon": "Icon1"}, {"serverGuid": <recipient guid>,"icon": "Icon2"}]
}
* */
export const cThreadCreate = ({sessionID, serverGuid}, members, msg) => dispatch => {
  let me = [serverGuid, ...members].map((guid, index) => ({serverGuid: guid, icon: `Icon${index+1}`}))
  console.log(`Members: `, JSON.stringify(me))

  let thread = {
    method: 'cThreadCreate',
    sessionID: sessionID,
    threadID: uuidv4(),
    threadType: "chat",
    members: me
  }
  console.log(`\n\ntrying to send a cThreadCreate with : `, thread)
  sendViaSocket(thread)
  dispatch({type: 'C_THREAD_CREATE', thread: thread})

}

export const selectThread = (thread) => dispatch =>
    dispatch({type: 'SET_SELECTED_THREAD', thread})


/*
*
* cThreadMessage
{
    "method"              : "cThreadMessage",
    "txnID"               : <generate>,
    "sessionID"           : <existing sessionID>,
    "deviceID"            : <existing deviceID>,
    "threadID"            : <existing threadID>,
    "msgID"               : <generate>,
    "contentType"         : "text",
    "data"                : <STRING>
}
* */
export const cThreadMessage = ({sessionID}, {threadID}, msg) => dispatch => {
  console.log(`\n\n[cThreadMessage] --> sessionID: ${sessionID} |  threadID: ${threadID} |  msg: ${msg} | `, )

  let threadMessage = {
    method: 'cThreadMessage',
    sessionID: sessionID,
    threadID: threadID,
    msgID: uuidv4(),
    contentType: "text",
    data: msg
  }

  console.log(`\n\ntrying to send message over thread : `, threadMessage)
  sendViaSocket(threadMessage)
  dispatch({type: 'C_THREAD_MESSAGE', thread: threadMessage})

}

/*
* cShredThread
{
    "method"       : "cShredThread",
    "txnID"        : UUID_STRING,
    "deviceID"     : UUID_STRING,
    "sessionID"    : UUID_STRING,
    "threadID"     : UUID_STRING,
}*/
export const cShredThread = ({sessionID}, {threadID}) => dispatch => {
  let shredMessage =   {
    method: "cShredThread",
    sessionID: sessionID,
    threadID: threadID,
  }
  console.log(`\n\ntrying to shred thread: `, threadID)

  sendViaSocket(shredMessage)

  dispatch({type: 'C_SHRED_THRED', threadID})

};


