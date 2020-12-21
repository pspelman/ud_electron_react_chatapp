import React from 'react';
import {useHistory} from 'react-router-dom'

function BackButton() {
  const history = useHistory()
  return (
    <button onClick={() => history.goBack()}>
      Go Back
    </button>
  );
}

export default BackButton;