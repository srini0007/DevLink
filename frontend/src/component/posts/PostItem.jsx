import React from 'react'
import formatDate from '../../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, addUnlike, deletePost } from '../../reducer/postSlice';
import { Link } from 'react-router-dom';


function PostItem({post}) {
    const {user} = useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const handleLike=()=>{
        dispatch(addLike(post._id));
    }
    const handleUnlike=()=>{
        dispatch(addUnlike(post._id));
    }

    const handleDelete=()=>{
        dispatch(deletePost(post._id));
    }

  return (
    <div className='post-item'>
        <div className="post-left">
            <img src={post.avatar} className='round-img post-avatar' alt='img :/'/>
            <div className="post-name">{post.name}</div>
        </div>
        <div className="post-content">
            <div className="post-text">
                {post.text}
            </div>
            <div className='post-rbottom'>
                <div className="post-date">
                    Uploaded on {formatDate(post.date)}
                </div>
                <div className="post-but">
                    <button className="p-like but p-but" onClick={handleLike}>
                     {post.likes.length>0 && post.likes.length}  Like
                    </button>
                   
                    <button className="p-dislike but p-but" onClick={handleUnlike}>
                        Unlike
                    </button>
                    <Link to={`/post/${post._id}`}>
                        <button className="p-cmt p-but">
                            {post.comments.length>0 && post.comments.length} Comment
                        </button>
                    </Link>
                    {user._id===post.user &&
                        <button className="p-del but-del " onClick={handleDelete}>
                            Delete
                        </button>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostItem;