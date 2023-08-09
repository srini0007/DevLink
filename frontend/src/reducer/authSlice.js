import { createSlice } from "@reduxjs/toolkit";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { clear_profile } from "./profileSlice";
const initialState = {
    auth:null,
    token:localStorage.getItem('token'),
    loading:true,
    user:null
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        register_success(state,action){
            state.auth=true;
            state.loading=false;
            localStorage.setItem('token',action.payload.token);
        },
        log_out(state,action){
            localStorage.removeItem('token');
            state.auth=null;
            state.loading=false;
            state.user=null;
        },
        user_loaded(state,action){
            state.auth=true;
            state.loading=false;
            state.user=action.payload;
        }
    }
})

export function loadUser(){
    return async function userLoadedThunks(dispatch,getState){
        if(localStorage.token){
            // console.log(localStorage.token);
            // console.log(localStorage.getItem('token'));
            setAuthToken(localStorage.getItem('token'));
        }
        
        try {
            const res= await axios.get('http://localhost:5000/api/auth');
            dispatch(user_loaded(res.data));
        } catch (err) {
            dispatch(clear_profile());
            dispatch(log_out());
        }
    }
}

export const {register_success,log_out,user_loaded} = authSlice.actions;
export default authSlice.reducer;