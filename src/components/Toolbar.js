import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {loginUser} from '../features/user'


function Toolbar() {
    const dispatch = useDispatch()
    const userLoggedIn = useSelector(state=>state.user.value.userLoggedIn)
    function logOut() {
        dispatch(loginUser())
    }


  return (
    <div className='toolbar'>

        {userLoggedIn ? 
        <div className='isLogged-toolbar'>
            <div>
                <Link to="/profile">Profile</Link>
                <Link to="/all_users">All users</Link>
                <Link to="/conversations">Conversations</Link>
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