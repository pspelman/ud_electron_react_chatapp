

export default {
  setup() {
    if (!('Notification' in window)) {
      console.log(`browser window does not support notifications`);
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission()
        .then(permission => {
          if (permission === 'granted') {
            console.log(`Permission has been granted!` )
          }
        })
    }
  },

  show({title, body}) {
    new Notification(title, {body})
  }
}