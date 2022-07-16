import { useSelector } from 'react-redux'
import { useState } from 'react'
import RenderChatMessages from '../components/RenderChatMessages'
import RenderChat from '../components/RenderChat'

function Conversations() {
  const messagesStore = useSelector(state => state.user.value.messages)
  const userLogged = useSelector(state => state.user.value.userLoggedIn)
  const [showChat, setShowChat] = useState([])
  const [getFriend, setFriend] = useState('')

  const userMessages = messagesStore.filter(x => x.participants.includes(userLogged.userName))

  const chatFriends = []
  userMessages.map(x=>chatFriends.push(x.participants.filter(y=> y !== userLogged.userName)))

  const uniqueChatFriends = [ ...new Set(chatFriends.flat())]

  return (
    <div>
      <div className={showChat.length === 0 ? 'user-chats' : 'user-chats as-background'}>
        {uniqueChatFriends && uniqueChatFriends.map((friend,i) =>
          <div key={i}>
            <RenderChat chatFriend={friend} setChat={setShowChat} setFriend={setFriend}/>
          </div>)}
      </div>
        {showChat.length > 0 && <RenderChatMessages getChat={showChat} setChat={setShowChat} getFriend={getFriend} />}
    </div>
  )
}

export default Conversations