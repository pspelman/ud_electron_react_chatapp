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
    case 'SETTINGS_UPDATE': {
      const {setting, value } = action  // get the items out of the action
      const currentSettings = localStorage.getItem('app-settings')
      const parsedCurrentSettings = currentSettings ? JSON.parse(currentSettings) : {}  // if local storage HAS them, parse them out
      const settings = {...parsedCurrentSettings, [setting]: value}  // new settings
      localStorage.setItem('app-settings', JSON.stringify(settings))
    }

    case 'AUTH_LOGOUT_SUCCESS': {
      const {messageSubscriptions} = store.getState().chats  // get the message subscriptions from the store
      if (messageSubscriptions) {
        Object.keys(messageSubscriptions).forEach(messageSub => {
          messageSubscriptions[messageSub]()
        });
      } else {
        console.log(`THERE WERE NO MESSAGE SUBS!?!?!?`, )
      }

    }

  }
  next(action)
}