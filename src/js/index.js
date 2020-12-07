// bootstrap the react application

import React from 'react'
import ReactDOM from 'react-dom'

import App from "./app"

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

ReactDOM
  // .render(<h1>Welcome to the Chat</h1>, document.getElementById('electronChat'));
  // .render(<App />, document.getElementById('electronChat'));
  .render(<App />, document.getElementById('chatApp'));
