export default store => next => action => {
  switch (action.type) {
    case 'APP_IS_ONLINE':
    case 'APP_IS_OFFLINE':
      alert('Middleware stuff for connection status change')
  }
  next(action)
}