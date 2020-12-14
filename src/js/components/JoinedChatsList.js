import React from "react";
import ChatSearch from "./ChatSearch";
import {useHistory} from 'react-router-dom'
import ninjaImage from '../ninja_PNG18.png';

export default function JoinedChatsList(props) {
  const history = useHistory()

  let joinedChats = props.chats.map((chat) => {
    return (
      <li
        key={chat.id}
        onClick={() => history.push(`/chat/${chat.id}`)}
        className="item">
        <div className="item-status">
          <img
            // src="https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg"
            src={chat.image.indexOf('bodhi') > 0 ? ninjaImage : chat.image}
            alt="chat image"/>
          <span className="status online"></span>
        </div>
        <p className="name-time">
          <span className="name mr-2">{chat.name}</span>
        </p>
      </li>
    )
  })

  return (
    <div className="list-container">
      <ChatSearch/>
      <ul className="items">
        {joinedChats}
      </ul>
    </div>
  )
}