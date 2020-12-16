import React from 'react'

export default function LoadingView({message = "Just a moment please"}) {
  return (
    <div className="loading-screen">
      <div className="loading-view">
        <div className="loading-view-container">
          {/*<div className="mb-3">{message}</div>*/}
          <div className="mb-3 loader">{message}...</div>

        </div>
      </div>
    </div>
  )
};