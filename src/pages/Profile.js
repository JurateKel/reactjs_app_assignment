import React from 'react';
import { useRef, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { updateAllUsers, loginUser } from '../features/user'

function Profile() {
    const dispatch = useDispatch()
    const allUsersStore = useSelector(state=>state.user.value.allUsers)
    const userLogged = useSelector(state=>state.user.value.userLoggedIn)
    const imgRef = useRef()
    const oldPassRef = useRef()
    const passOneRef = useRef()
    const passTwoRef = useRef()
    const changePassRef = useRef()

    const allUsersSpreaded = [...allUsersStore]
    const [changePassw, setChangePassw] = useState(false)
    const [error, setError] = useState('')
    const [successPassw, setSuccessPassw] = useState(false)

    function editUser(element) {
        let terminateFunc = false
        const editedUser = {
            userName: userLogged.userName,
            password: userLogged.password,
            image: userLogged.image,
            rights: userLogged.rights,
            blockedFrom: userLogged.blockedFrom
            }

        if (element === 'image' && imgRef.current.value.length > 0) {
            editedUser.image = imgRef.current.value
            imgRef.current.value = ''
        }

        if (element === 'pass' && changePassw === false) {
            changePassRef.current.textContent = 'Save changes'
            setChangePassw(true)
            return terminateFunc = true
        }
        if (element === 'pass' && changePassw === true) {
            confirmNewPass(userLogged)
            if (error) {
                return terminateFunc = true
            }
            else {
                changePassRef.current.textContent = 'Change password'
                editedUser.password = passOneRef.current.value
                terminateFunc = false
            }
        }
        if (terminateFunc === false) {
            allUsersStore.map((x,i) => {
                if (x.userName === editedUser.userName) {
                    allUsersSpreaded[i] = editedUser
                }
            })
            dispatch(updateAllUsers(allUsersSpreaded))
            dispatch(loginUser(editedUser))
        }
    }

    function confirmNewPass(x) {
        let confirmation = ''
        const validatePassword = (pass) => {
            return String(pass).match(
                /(?=.*?[A-Z])(?=.*?[!@#$%^&*_+]){4,20}/
            )
        }

        if (oldPassRef.current.value !== x.password) confirmation = 'Incorrect old password.'

        else if (!validatePassword(passOneRef.current.value))confirmation = 'Your password should be from 4 to 20 symbols, include upper case and at least one symbol (!@#$%^&*_+).'

        else if (passOneRef.current.value !== passTwoRef.current.value) 
            confirmation = 'Password 1 and password 2 must match.'

        setError(confirmation)

        if (!confirmation) {
            setChangePassw(false)
            setSuccessPassw(true)
            setTimeout(()=>{setSuccessPassw(false)}, 3000)
        }
    }

  return (
    <div className='profile-wrapper'>
        <div className='basic-info-wrapper'>
            <h4>Basic information:</h4>
            <div className='img'><img src={userLogged.image} alt="" /></div>
            <h4>Your user name: {userLogged.userName}</h4>
            <p>Your role: {userLogged.rights}</p>
        </div>

        <div className='settings-wrapper'>
            <h4>Settings:</h4>
            <div className='change-img-wrapper'>
                <input ref={imgRef} type="text" placeholder='Ypur image url' />
                <button onClick={() => editUser('image')}>Change image</button>
            </div>
            <div className='change-password-wrapper'>
                {changePassw &&
                    <div>
                        <input ref={oldPassRef} type="password" name="old-pass" id="old-pass" placeholder='Old password' />
                        <input ref={passOneRef} type="password" name="new-pass-one" id="new-pass-one" placeholder='New password' />
                        <input ref={passTwoRef} type="password" name="new-pass-two" id="new-pass-two" placeholder='Repeat new password' />
                        {error && <p>{error}</p>}
                    </div>
                }
                {successPassw && <p>Password was updated successfully</p>}
                <button ref={changePassRef} onClick={() => editUser('pass')}>Change password</button>
            </div>
        </div>

    </div>
  )
}

export default Profile

