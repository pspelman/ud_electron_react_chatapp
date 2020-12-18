import * as api from '../api/chatsApi'


// export function fetchChats() {
//   return async function (dispatch) {
//     // dispatch actions
//     console.log(`dispatching api.fetchChats`, )
//
//     const chats = await api.fetchChats()
//       // .then(response => {
//       //   console.log(`chats response: `, response)
//       // })
//       dispatch({
//         type: 'CHATS_FETCH_SUCCESS',
//         chats
//       })
//     return chats
//
//   };
// }

export const fetchChats = () => dispatch => { // Note: this is a rewritten version of the code above
  console.log(`going to dispatch CHATS_FETCH_INIT`, )

  dispatch({type: 'CHATS_FETCH_INIT'})
  api
    .fetchChats()
    .then(chats => dispatch({
      type: 'CHATS_FETCH_SUCCESS',
      chats
    }))
    .catch(err => {
      console.log(`error fetching chats: `, err)
      dispatch({type: 'CHATS_FETCH_ERROR', error: err})
    })
}