import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            allUsers: [
                {userName: 'Dana',
                password: 'Dana!',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                rights: 'admin',
                blockedFrom: [],
                status: 'active'
            },

                {userName: 'Tadas',
                password: 'Tadas!',
                image: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
                rights: 'regular',
                blockedFrom: [],
                status: 'active'
            },

                {userName: 'Jonas',
                password: 'Jonas!',
                image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
                rights: 'regular',
                blockedFrom: [],
                status: 'active'
            },

                {userName: 'Alina',
                password: 'Alina!',
                image: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg?fit=640,427',
                rights: 'admin',
                blockedFrom: [],
                status: 'active'
            }
            ],
            userLoggedIn:'',
            messages: []        
        }
    },
    
    reducers: {
        addUser: ({value}, {payload}) => {
            const user = {
                userName: payload.userName,
                password: payload.passOne,
                image: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
                rights: payload.rights,
                blockedFrom: payload.blockedFrom,
                status: payload.status
            }
            value.allUsers.push(user)
        },
        loginUser: ({value}, {payload}) => {
            value.userLoggedIn = payload
        },
        updateAllUsers: ({value}, {payload}) => {
            value.allUsers = payload
        },
        pushMessage: ({value}, {payload}) => {
            value.messages.push(payload)
        },
        updateAllMessages: ({value}, {payload}) => {
            value.messages = payload
        }
    }
})

export const {addUser, loginUser, updateAllUsers, pushMessage, updateAllMessages} = userSlice.actions

export default userSlice.reducer