import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import chatReducer from "../reducers/chatsReducer";
import authReducer from "../reducers/authReducer";


export default function configureStore() {

  const middlewares = [
    thunkMiddleware
  ]

  // const store = createStore(() => {
  //   return {
  //     message: "hello world",
  //     data1: 'just some testing data',
  //     data2: 'some more testing data',
  //   }
  // }, applyMiddleware(...middlewares))
  const store = createStore(
    combineReducers({  // Note: hook up the store, reducer, and action handlers (middleware)
      chats: chatReducer,
      auth: authReducer
    }), applyMiddleware(...middlewares))

  return store
}
