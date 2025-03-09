import {configureStore} from'@reduxjs/toolkit'
import userReducer from './slice/user'
import tokenReducer from './slice/token'


const store = configureStore({
    reducer : {
        user: userReducer,
        token: tokenReducer
    }
})

export default store;