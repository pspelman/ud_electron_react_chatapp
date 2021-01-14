import React from 'react'
import {useDispatch, useSelector} from "react-redux";

const ThreadsList = () => {
  const threads = useSelector(({vschats}) => vschats.threads)
  const selectedThread = useSelector(({vschats}) => vschats.threads.selectedThread)
  const dispatch = useDispatch()

  const selectThread = thread => {
    console.log(`selecting threadID: `, thread.threadID)
    dispatch({type: 'SET_SELECTED_THREAD', thread: thread})
  }

  const threadOutput = threads.map(thread => {
    const {threadID} = thread
    return (
      <div key={thread.threadID}
           onClick={() => selectThread(thread)}
      >
        {threadID}  {selectedThread && selectedThread.threadID === threadID ? '***** SELECTED ******' : ''}
      </div>
    )
  })
  return (
    <React.Fragment>
      ThreadsList
      <br/>
      {threadOutput}
    </React.Fragment>
  )
}

export default ThreadsList