import {useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { addUser, loginUser } from '../features/user'

function UserRegistration() {
    const registrationUserName = useRef()
    const registrationPassw1 = useRef()
    const registrationPassw2 = useRef()
    const adminRef = useRef()
    const regularRef = useRef()
    const allUsers = useSelector(state=>state.user.value.allUsers)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    
    const validatePassword = (pass) => {
        return String(pass).match(
            /(?=.*?[A-Z])(?=.*?[!@#$%^&*_+]){4,20}/
        )
    }

    const checkIfUserNameExist = (userToCheck) => {
        const ifExists = allUsers.map(user => user.userName == userToCheck.userName)
    }

    function registerUser() {
        let confirmation = false

        const newUser = {
            userName: registrationUserName.current.value,
            passOne: registrationPassw1.current.value,
            passTwo: registrationPassw2.current.value,
            rights: adminRef.current.checked ? 'admin' : 'regular',
            blockedFrom: []
        }
        if (newUser.userName.length < 4 || newUser.userName.length > 20) confirmation = 'User name should be between 4 and 20 symbols.'
        else if (checkIfUserNameExist(newUser)) confirmation = 'Such user name already exists.'
        else if (!validatePassword(newUser.passOne)) confirmation = 'Your password should be from 4 to 20 symbols, include upper case and at least one symbol (!@#$%^&*_+).'
        else if (newUser.passOne !== newUser.passTwo) confirmation = 'Password 1 and password 2 must match.'
        
        if (confirmation) return setError(confirmation)
        dispatch(addUser(newUser))
        navigate('/')
    }

  return (
    <div className='registration'>
        <input ref={registrationUserName} type="text" placeholder="Username" />
        <input ref={registrationPassw1} type="password" name="password1" id="password1" placeholder='Password'/>
        <input ref={registrationPassw2} type="password" name="password2" id="password2" placeholder='Repeat password'/>
        <div className='registration-radio'>
            <label  htmlFor="admin"><input ref={adminRef} type="radio" name="rights" value="Admin" id="admin" defaultChecked /> Admin</label>
            
            <label htmlFor="regular"><input ref={regularRef} type="radio" name="rights" value="Regular" id="regular" /> Regular</label>
        </div>
        {error && <p>{error}</p>}
        <button onClick={registerUser}>Register</button>

    </div>
  )
}

export default UserRegistration