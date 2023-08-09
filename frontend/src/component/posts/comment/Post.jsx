import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../../../reducer/postSlice';
import AddComment from './AddComment';
import Comments from './Comments';

function Post() {
    const {id} =useParams();
    const {loading,post} =useSelector(state=>state.post);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getPost(id));
    });
    

  return (
    <div className='p-id'>
        <Link to={'/post'}>
            <div className="but b-post">
                back to post
            </div>
        </Link>
        {(loading || post===null)?<div>Loading profile</div>:
        <>
            <div className="hide cmt-err"></div>
            <div className='post-item'>
                <div className="post-left">
                    <img src={post.avatar} className='round-img post-avatar' alt='img :/'/>
                    <div className="post-name">{post.name}</div>
                </div>
                <div className="post-content">
                    <div className="post-text">
                        {post.text}
                    </div>
                    
                </div>
            </div>
            <AddComment post={post}/>
            {post?.comments?.map(cmt=>(
                <Comments comment={cmt} avatar={post.avatar} postId={id} key={cmt._id} />
            ))
            }
        </>
        }
    </div>

  )
}

export default Post