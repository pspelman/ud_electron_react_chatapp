import React, {useState} from 'react'

export default function Messenger({onSubmit}) {
  const [value, setValue] = useState('')

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      // alert(value)  // show the value we're getting from the state
      e.preventDefault()  // prevent the new line creation
      onSubmit(value)
      setValue('')  // clear the text field
    }
  }
  return (
    <div className="chat-input form-group mt-3 mb-0">
          <textarea
            // onKeyPress={(e) => {onKeyPress(e)}}
            onChange={e => setValue(e.target.value)}
            onKeyPress={onKeyPress}
            className={"form-control"}
            value={value}
            name="newChat"
            id="newChat"
            placeholder={"...your message..."}
            cols="30"
            rows="3">

          </textarea>

    </div>
  )
};