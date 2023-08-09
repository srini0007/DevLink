import React, { useEffect } from 'react'
import PostItem from './PostItem';
import AddPost from './AddPost';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost } from '../../reducer/postSlice';

function Posts() {
    const {error,posts} = useSelector(state=>state.post);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllPost());
    },[dispatch]);

  return (
    <div className="posts">
        <div className="hide post-error-head">
        {
        (()=>{
            const element=[];
            for(let i=0;i<error.length;i++){
                element.push(<div key={i} className='post-error'> {error[i]}</div>)
            }
            return element;
        })()}
        </div>
        <div className="post-head">
            Post
        </div>
        
            <AddPost />
        
        <div className="post-field" >
            {posts?.map((post)=>(
                <PostItem post={post} key={post._id}/>
            ))
            }
        </div>
    </div>
  )
}

export default Posts