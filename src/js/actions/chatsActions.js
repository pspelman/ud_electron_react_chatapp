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

export const fetchChats = () => dispatch =>  // Note: this is a rewritten version of the code above
  api
    .fetchChats()
    .then(chats => dispatch({
      type: 'CHATS_FETCH_SUCCESS',
      chats
    }))