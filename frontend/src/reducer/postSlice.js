import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    post:null,
    posts:[],
    error:[],
    loading:true
}

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        get_all_post(state,action){
            state.posts = action.payload;
            state.loading=false;
        },
        post_error(state,action){
            state.loading=false;
            if(action.payload==='success'){
                document.getElementsByClassName('post-error-head')[0].classList.add('hide');
                return;
            }
            let n=action.payload.length;
            state.error=[];
            
            document.getElementsByClassName('post-error-head')[0].classList.remove('hide');            
            for(let i=0;i<n;i++){
                state.error.push(action.payload[i].msg);   
            }
        },
        get_post(state,action){
            state.post=action.payload;
            state.loading=false;
        }
    }
    
});
export const {get_all_post,post_error,get_post} = postSlice.actions;
export default postSlice.reducer;

export function addPost(text){
    return async function addPostThunks(dispatch,getState){
        try{
            let data={
                text:text
            };
            console.log(data);
            await axios.post('https://devlink-o298.onrender.com/api/post',data);
            dispatch(post_error('success'));
            dispatch(getAllPost());
        }
        catch(err){
            console.log(err);
            dispatch(post_error(err.response.data.errors));
        }
    }
}

export function getAllPost(){
    return async function getAllPostThunks(dispatch,getState){
        try{
            const res=await axios.get('https://devlink-o298.onrender.com/api/post');
            dispatch(get_all_post(res.data));
        }
        catch(err){
            console.log(err);
        }
    }
}

export function addLike(id){
    return async function addLikeThunks(dispatch,getState){
        try{
            await axios.put(`https://devlink-o298.onrender.com/api/post/like/${id}`);
            dispatch(getAllPost());
        }
        catch(err){
            console.log(err);
        }
    }
}
export function addUnlike(id){
    return async function addUnikeThunks(dispatch,getState){
        try{
            await axios.put(`https://devlink-o298.onrender.com/api/post/unlike/${id}`);
            dispatch(getAllPost());
        }
        catch(err){
            console.log(err);
        }
    }
}

export function deletePost(id){
    return async function deletePostThunks(dispatch,getState){
        try{
            await axios.delete(`https://devlink-o298.onrender.com/api/post/${id}`);
            dispatch(getAllPost());
        }
        catch(err){
            console.log(err);
        }
    }
}

export function getPost(id){
    return async function deletePostThunks(dispatch,getState){
        try{
           const res= await axios.get(`https://devlink-o298.onrender.com/api/post/${id}`);
            dispatch(get_post(res.data));
        }
        catch(err){
            console.log(err);
        }
    }
}


export function addComment(id,text){
    return async function addCommentThunks(dispatch,getState){
        try{
            let data = {
                text:text
            };
           await axios.post(`https://devlink-o298.onrender.com/api/post/comment/${id}`,data);
            dispatch(getAllPost());
        }
        catch(err){
            console.log(err);
        }
    }
}


export function deleteComment(id,postId){
    return async function deleteCommentThunks(dispatch,getState){
        try{
           await axios.delete(`https://devlink-o298.onrender.com/api/post/comment/${postId}/${id}`);
            dispatch(getAllPost());
        }
        catch(err){
            console.log(err);
        }
    }
}
