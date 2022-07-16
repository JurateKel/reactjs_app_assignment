import { useSelector, useDispatch } from 'react-redux'
import { pushMessage } from '../features/user'
import { useRef } from 'react'

function RenderChatMessages({getChat, setChat, getFriend}) {
  const dispatch = useDispatch()
  const usersStore = useSelector(state => state.user.value.allUsers)
  const userLogged = useSelector(state => state.user.value.userLoggedIn)
  const chatFriendData = usersStore.filter(x => x.userName === getFriend)
  const messageRef = useRef()

  function getMessage() {
    if (!userLogged.blockedFrom.includes(chatFriendData[0].userName) &&
    !chatFriendData[0].blockedFrom.includes(userLogged.userName)) {
    const messageToDispatch = {
        text: messageRef.current.value,
        participants: [userLogged.userName, chatFriendData[0].userName],
        sender: userLogged.userName,
        id: Date.now()
    }
    setChat([...getChat, messageToDispatch])
    dispatch(pushMessage(messageToDispatch))
    }
  }


  return (
    <div className="overlay">
        <div className='chat-box-messages'>
          {getChat.map((message, i) =>
            <div key={i} className={message.participants[0] === userLogged.userName ? 'sender chat-message' : 'chat-message'}>
                <div><img src={message.participants[0] === userLogged.userName ? userLogged.image : chatFriendData[0].image} alt="" /></div>
                <p>{message.text}</p>
            </div>
          )}
      </div>
      <div className='chat-box-footer'>
        <textarea ref={messageRef} name="" id="" cols="30" rows="10" placeholder='Your message' />
        <div>
          <button onClick={getMessage}>Send message</button>
          <button onClick={()=>setChat([])}>Close chat</button>
        </div>
      </div>
    </div>
  )
}

export default RenderChatMessages