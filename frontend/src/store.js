import {configureStore} from '@reduxjs/toolkit';
import autherrorSlice from './reducer/autherrorSlice';
import authSlice from './reducer/authSlice';
import profileSlice from './reducer/profileSlice';
import postSlice from './reducer/postSlice';
const store=configureStore({
    reducer:{
        autherror:autherrorSlice,
        auth:authSlice,
        profile:profileSlice,
        post:postSlice
    }
});
export default store;