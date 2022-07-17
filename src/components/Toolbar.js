import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {loginUser} from '../features/user'


function Toolbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const messagesStore = useSelector(state => state.user.value.messages)
    const userLogged = useSelector(state => state.user.value.userLoggedIn)
    const userLoggedIn = useSelector(state=>state.user.value.userLoggedIn)
    let uniqueChatFriends = []
    function logOut() {
        dispatch(loginUser())
        navigate('/')
    }
    if (userLoggedIn) {
    const userMessages = messagesStore.filter(x => x.participants.includes(userLogged.userName))
    const chatFriends = []
    userMessages.map(x=>chatFriends.push(x.participants.filter(y=> y !== userLogged.userName)))
    uniqueChatFriends = [ ...new Set(chatFriends.flat())]
    }

  return (
    <div className='toolbar'>

        {userLoggedIn ? 
        <div className='isLogged-toolbar'>
            <div>
                <Link to="/profile">Profile</Link>
                <Link to="/all_users">All users</Link>
                <Link to="/conversations">Conversations (total: {uniqueChatFriends.length})</Link>
            </div>
            <div>
                <p>User: {userLoggedIn.userName}</p>
                <Link onClick={logOut} to="/">Log out</Link>
            </div>
        </div>
        : 
        <div className='isNotLogged-toolbar'>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
        </div>
        }
    </div>
  )
}

export default Toolbar