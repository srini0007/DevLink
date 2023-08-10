import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import { loadUser, log_out, register_success } from "./authSlice";

const initialState = {
    auth_error:[]
}


const autherrorSlice = createSlice({
    name:'autherror',
    initialState,
    reducers:{
        
        AddErrorSign(state,action){
            if(action.payload==='success'){
                document.getElementsByClassName('sign-error-head')[0].classList.add('hide');
                return;
            }
            let n=action.payload.length;
            state.auth_error=[];
            
            document.getElementsByClassName('sign-error-head')[0].classList.remove('hide');            
            for(let i=0;i<n;i++){
                state.auth_error.push(action.payload[i].msg);   
            }
        },AddErrorLog(state,action){
            if(action.payload==='success'){
                document.getElementsByClassName('log-error-head')[0].classList.add('hide');
                return;
            }
            let n=action.payload.length;
            state.auth_error=[];
            
            document.getElementsByClassName('log-error-head')[0].classList.remove('hide');            
            for(let i=0;i<n;i++){
                state.auth_error.push(action.payload[i].msg);   
            }
        }
        
    }
});


   
export function handleSign(name,email,pass){
    return async function handleSignThunk(dispatch,getState){
        try{

            let data={
                name:name,
                email:email,
                password:pass
            };
            
            const res= await axios.post('http://localhost:5000/api/users',data);
            dispatch(AddErrorSign('success'));
            dispatch(register_success(res.data));
            dispatch(loadUser());

        }catch(err){
            dispatch(AddErrorSign(err.response.data.errors));
            dispatch(log_out());

        }
    }
}

export function handleLog(email,pass){
    return async function handleLogThunk(dispatch,getState){
        try{

            let data={
                email:email,
                password:pass
            };
            const res= await axios.post('http://localhost:5000/api/auth',data);
            dispatch(AddErrorLog('success'));
            dispatch(register_success(res.data));
            dispatch(loadUser());
        }catch(err){
            console.log(err);
            dispatch(AddErrorLog(err.response.data.errors));
            dispatch(log_out());
        }
    }
}

export const {AddErrorSign,AddErrorLog} = autherrorSlice.actions;
export default autherrorSlice.reducer;
