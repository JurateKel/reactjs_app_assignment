import {useRef, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {loginUser} from '../features/user'
import {useNavigate} from 'react-router-dom'

function UserLogin() {
  const loginUserName = useRef()
  const loginPassword = useRef()

  const dispatch = useDispatch()
  const allUsers = useSelector(state => state.user.value.allUsers)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function login() {
    const user = {
      userName: loginUserName.current.value,
      password: loginPassword.current.value
    }
    const isRegistered = allUsers.find( x => x.userName === user.userName && x.password === user.password)
    
    if (!isRegistered) return setError('Such user does not exist')
    const userToDispatch = {
      image: isRegistered.image,
      password: isRegistered.password,
      userName: isRegistered.userName,
      rights: isRegistered.rights,
      blockedFrom: isRegistered.blockedFrom
    }

    if (isRegistered)  setError(null)
    dispatch(loginUser(userToDispatch))
    navigate('/profile')
  }

  return (
    <div className='login'>
        <input ref={loginUserName} type="text" placeholder="User name" />
        <input ref={loginPassword} type="password" placeholder="Password" />
        {error && <p>{error}</p>}
        <button onClick={login}>Login</button>
    </div>
  )
}

export default UserLogin