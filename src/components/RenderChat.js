import { useSelector, useDispatch } from 'react-redux';
import { updateAllMessages, updateAllUsers, pushMessage } from '../features/user';
import { useState, useEffect } from 'react';


function RenderChat({chatFriend, setChat, setFriend}) {
  const dispatch = useDispatch()
  const usersStore = useSelector(state=>state.user.value.allUsers)
  const messagesStore = useSelector(state => state.user.value.messages)
  const userLogged = useSelector(state => state.user.value.userLoggedIn)
  const [buttonVisibility, setButtonVisibility] = useState(true)

  const chatFriendData = usersStore.filter(x => x.userName === chatFriend)

  useEffect(()=>{
    if (chatFriendData[0].blockedFrom.includes(userLogged.userName)) setButtonVisibility(false)
  }, [])

  function showChat() {
      const chatMessages = messagesStore.filter(x => x.participants.includes(chatFriendData[0].userName) && x.participants.includes(userLogged.userName))
      setChat(chatMessages)
      setFriend(chatFriendData[0].userName)
  }
  
  function deleteChat() {
    const updatedStore = messagesStore.filter(x =>
      !(x.participants.includes(userLogged.userName) && x.participants.includes(chatFriend)))
    dispatch(updateAllMessages(updatedStore))
  }

  function blockUser() {
    if (buttonVisibility) {
      const updatedUsersStore = [...usersStore]
      const index = usersStore.findIndex(x => x.userName === chatFriendData[0].userName)
      const userToBlock = {...updatedUsersStore[index]}
      userToBlock.blockedFrom = [...userToBlock.blockedFrom, userLogged.userName]
      updatedUsersStore[index] = userToBlock
      const messageToDispatch = {
        text: 'You was blocked by ' + userLogged.userName,
        participants: [userLogged.userName, chatFriendData[0].userName],
        sender: userLogged.userName,
        id: Date.now(),
        status: 'blocked'
      }
      dispatch(updateAllUsers(updatedUsersStore))
      dispatch(pushMessage(messageToDispatch))
      setButtonVisibility(false)
    }
  }

  return (
    <div className='d-flex'>
      <div className='chat-wrapper' onClick={showChat}>
          <div><img src={userLogged.image} alt="" /></div>
          <h4>{userLogged.userName}, your chat with {chatFriend}</h4>
          <div><img src={chatFriendData[0].image} alt="" /></div>
      </div>
          <div className="chat-box-buttons">
            <button className='chat-box-button' onClick={deleteChat}>Delete conversation</button>
            <button className={buttonVisibility === true ? 'chat-box-button': 'chat-box-button inactive'} onClick={blockUser} >Block user</button>
          </div>
    </div>
  )
}

export default RenderChat