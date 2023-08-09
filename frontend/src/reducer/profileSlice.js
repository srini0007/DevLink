import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { log_out } from "./authSlice";

const initialState={
    profile: null,
    cur_profile:null,
    profiles: [],
    repos: [],
    loading: true,
    error: []
}

const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
        get_profile(state,action){
            state.profile=action.payload; 
            state.loading=false;
        },
        get_all_profile(state,action){
            state.profiles=action.payload;
            state.loading=false;

        },
        profile_error(state,action){
            if(action.payload==='success'){
                document.getElementsByClassName('create-pro-error')[0].classList.add('hide');
                return;
            }
            let n=action.payload.length;
            state.error=[];
            
            document.getElementsByClassName('create-pro-error')[0].classList.remove('hide');            
            for(let i=0;i<n;i++){
                state.error.push(action.payload[i].msg);   
            }

        },
        exp_error(state,action){
            state.error=[];
            if(action.payload==='success'){
                document.getElementsByClassName('exp-err')[0].classList.add('hide');
                return;
            }
            let n=action.payload.length;
            
            document.getElementsByClassName('exp-err')[0].classList.remove('hide');            
            for(let i=0;i<n;i++){
                state.error.push(action.payload[i].msg);   
            }

        },
        edu_error(state,action){
            state.error=[];
            if(action.payload==='success'){
                document.getElementsByClassName('edu-err')[0].classList.add('hide');
                return;
            }
            let n=action.payload.length;
            
            document.getElementsByClassName('edu-err')[0].classList.remove('hide');            
            for(let i=0;i<n;i++){
                state.error.push(action.payload[i].msg);   
            }

        },
        clear_profile(state,action){
            state.profile=null;
            state.repos=[];
            state.loading=true;
        },
        get_repo(state,action){
            state.loading=false;
            state.repos=action.payload;
        },
        no_repo(state,action){
            state.loading=false;
            state.repos=[];
        },
        no_profile(state,action){
            state.loading=false;
        },
        get_cur_profile(state,action){
            state.loading=false;
            state.cur_profile=action.payload;
        }
    }
})

export const {get_all_profile,profile_error,get_profile,clear_profile,exp_error,no_profile,edu_error,get_repo,no_repo,get_cur_profile} = profileSlice.actions;
export default profileSlice.reducer;

export function getProfile(){
    return async function getProfileThunks(dispatch,getState){
        try{
            const res=  await axios.get('http://localhost:5000/api/profile/me');
            dispatch(get_cur_profile(res.data)); 
        }
        catch(err){
            dispatch(no_profile());
        }
    }
}



export function createProfile(formdata){
    return async function createProfileThunks(dispatch,getState){
        try{
            const res= await axios.post('http://localhost:5000/api/profile',formdata);
            dispatch(get_profile(res.data));
            dispatch(profile_error('success'));
        }
        catch(err){
            dispatch(profile_error(err.response.data.errors));
        }
    }
}

export function addExperience(formdata){
    return async function addExperienceThunks(dispatch,getstate){
        try {
            const res = await axios.post('http://localhost:5000/api/profile/experience', formdata);
        
            dispatch(get_profile(res.data));
            dispatch(exp_error('success'));
          } catch (err) {
            console.log(err);
            dispatch(exp_error(err.response.data.errors));
          }
    }
}

export function deleteExperience(id){
    return async function deleteExperienceThunks(dispatch,getstate){
        try {
            const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`);
            console.log(res);
            dispatch(get_profile(res.data));
          } catch (err) {
            console.log(err);
          }
    }
}

export function getAllProfiles(){
    return async function getAllProfilesThunks(dispatch,getState){
        try{
            const res= await axios.get('http://localhost:5000/api/profile');
            dispatch(get_all_profile(res.data));
        }catch(err){
            console.log(err);
        }
    }
}

export function getProfileById(id){
    return async function getProfileByIdThunks(dispatch,getState){
        try{
            const res=await axios.get(`http://localhost:5000/api/profile/${id}`);
            dispatch(get_profile(res.data));
        }
        catch(err){
            console.log(err);
        }
    }
}

export function addEducation(formdata){
    return async function addEducationThunks(dispatch,getstate){
        try {
            const res = await axios.put('http://localhost:5000/api/profile/education', formdata);
        
            dispatch(get_profile(res.data));
            console.log(res);
            dispatch(edu_error('success'));
          } catch (err) {
            console.log(err);
            dispatch(edu_error(err.response.data.errors));
          }
    }
}

export function deleteEducation(id){
    return async function deleteEducationThunks(dispatch,getstate){
        try {
            const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`);
            console.log(res);
            dispatch(get_profile(res.data));
          } catch (err) {
            console.log(err);
          }
    }
}

export function getGithub(username){
    return async function getGithubThunks(dispatch,getstate){
        try {
            const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`);
            console.log(res);
            dispatch(get_repo(res.data));
          } catch (err) {
            console.log(err);
            dispatch(no_repo());
          }
    }
}

export function deleteAccount(){
    return async function deleteAccountThunks(dispatch,getstate){
        try {
            await axios.delete(`http://localhost:5000/api/profile`);
            dispatch(clear_profile());
            dispatch(log_out());
          } catch (err) {
            console.log(err);
          }
    }
}
