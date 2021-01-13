import * as vsApi from '../db/vsConnect'
import {sendViaSocket} from "../db/vsConnect";
import {v4 as uuidv4} from "uuid";


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


