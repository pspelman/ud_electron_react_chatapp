import Notification from "../../utils/notifications";

export default store => next => action => {
  switch (action.type) {
    case 'APP_IS_ONLINE':
    case 'APP_IS_OFFLINE':
      // alert('Middleware stuff for connection status change')
      // electron app notification
      Notification.show({
        title: 'Connection status:',
        body: action.isOnline ? 'Online' : 'Offline'})
      // console.log(`Middleware for connection status change`)
  }
  next(action)
}