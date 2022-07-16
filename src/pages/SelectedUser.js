import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import RenderUser from '../components/RenderUser';
import { useRef } from 'react';
import { pushMessage, updateAllUsers } from '../features/user'

function SelectedUser() {
    const selectedUser = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allUsersStorage = useSelector(state => state.user.value.allUsers)
    const userLogged = useSelector(state => state.user.value.userLoggedIn)
    const selectedUserCard = allUsersStorage.filter(user => user.userName === selectedUser.userName)


    const messageRef = useRef()

    function getMessage() {
        if (!userLogged.blockedFrom.includes(selectedUserCard[0].userName) &&
        !selectedUserCard[0].blockedFrom.includes(userLogged.userName)){
        const messageToDispatch = {
            text: messageRef.current.value,
            participants: [userLogged.userName, selectedUser.userName],
            sender: userLogged.userName,
            id: Date.now()
        }
        dispatch(pushMessage(messageToDispatch))
        }
    }

    function deleteUser() {
        const updatedUsers = [...allUsersStorage]
        allUsersStorage.map((x,i) => {
            if (x.userName === selectedUser.userName) {
                let deletedUser = {...x}
                deletedUser.status = 'deleted'
                updatedUsers[i] = deletedUser
            }
        })
        dispatch(updateAllUsers(updatedUsers))
        navigate('/all_users')
    }


  return (
        <div className='settings-wrapper selected-user'>
        <RenderUser user={selectedUserCard[0]}/>
            <div className='settings'>
                <textarea ref={messageRef} name="message" cols="30" rows="10" />
                <button onClick={getMessage}>Send message</button>
            </div>
            {userLogged.rights === 'admin' && <button onClick={deleteUser}>Delete user</button>}
        </div>
  )
}

export default SelectedUser

