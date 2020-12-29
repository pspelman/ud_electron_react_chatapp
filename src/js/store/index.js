import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import chatReducer from "../reducers/chatsReducer";
import authReducer from "../reducers/authReducer";
import appReducer from "../reducers/appReducer";
import appMiddleware from "./middlewares/appMiddleware";
// import {devToolsEnhancer} from "electron-redux-devtools";
// import { devToolsEnhancer } from 'electron-redux-devtools';

export default function configureStore() {
  console.log(`devToolsEnhancer: `, window.electron.devToolsEnhancer)


  const middlewares = [
    // window.electron.devToolsEnhancer,
    thunkMiddleware,
    appMiddleware,
    // devToolsEnhancer(),
  ]

  // const store = createStore(() => {
  //   return {
  //     message: "hello world",
  //     data1: 'just some testing data',
  //     data2: 'some more testing data',
  //   }
  // }, applyMiddleware(...middlewares))
  return createStore(
    combineReducers({  // Note: hook up the store, reducer, and action handlers (middleware)
      chats: chatReducer,
      auth: authReducer,
      app: appReducer,
    }), applyMiddleware(...middlewares))
}
