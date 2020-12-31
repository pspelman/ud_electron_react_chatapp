
const INITIAL_STATE =  {
  isDarkTheme: false,
  playSound: true,
  showNotifications: true
}

const localSettings = () => {
  const currentSettings = localStorage.getItem('app-settings')
  return  currentSettings ? JSON.parse(currentSettings) : {}
}


export default function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SETTINGS_UPDATE':
      return {...state, [action.setting]: action.value}
    case 'SETTINGS_LOAD_INITIAL':
      return {...state, ...localSettings()}
    default:
      return state
  }
}