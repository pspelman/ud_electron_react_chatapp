import * as api from '../api/chats'


export function fetchChats() {
  return async function (dispatch) {
    // dispatch actions
    console.log(`dispatching api.fetchChats`, )

    const chats = await api.fetchChats()
      // .then(response => {
      //   console.log(`chats response: `, response)
      // })
      dispatch({
        type: 'CHATS_FETCH_SUCCESS',
        chats
      })
    return chats

  };
}