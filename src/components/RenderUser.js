import React from 'react'
import { useNavigate } from 'react-router-dom'

function RenderUser({user}, ) {
    const navigate = useNavigate()

  return (
    <div className='user-card' onClick={() => navigate('/user/' + user.userName)}>
        <div><img src={user.image} alt="" /></div>
        <h4>User name: {user.userName}</h4>
        <p>User role: {user.rights}</p>
    </div>
  )
}

export default RenderUser