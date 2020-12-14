const DEFAULT_STATE = {
  items: []
}

export default function chatReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'CHATS_FETCH_SUCCESS':
      console.log(`got the chats`, action.chats)
      return {items: action.chats}  // this means the action that comes in is going to have a chats objects
    default:
      return state;
  }
};