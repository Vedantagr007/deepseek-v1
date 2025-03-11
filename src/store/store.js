import {configureStore} from'@reduxjs/toolkit'
import userReducer from './slice/user'
import newChatReducer from './slice/newChat'



const store = configureStore({
    reducer : {
        user: userReducer,
        newChat: newChatReducer
    }
})

export default store;