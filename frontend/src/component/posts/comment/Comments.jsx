import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import formatDate from '../../../utils/formatDate';
import { deleteComment } from '../../../reducer/postSlice';

function Comments({comment,avatar ,postId}) {
    const {user} = useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const handleDelete=()=>{
        dispatch(deleteComment(comment._id,postId));
    }
  return (
    <div className='post-item'>
        <div className="post-left">
            <img src={avatar} className='round-img post-avatar' alt='img :/'/>
            <div className="post-name">{comment.name}</div>
        </div>
        <div className="post-content">
            <div className="post-text">
                {comment.text}
            </div>
            <div className='post-rbottom'>
                <div className="post-date">
                    Uploaded on {formatDate(comment.date)}
                </div>
                <div className="post-but">
                    {user._id===comment.user &&
                        <button className="p-del but but-del" onClick={handleDelete}>
                            Delete
                        </button>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comments