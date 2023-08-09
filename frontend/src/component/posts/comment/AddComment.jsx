import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../../../reducer/postSlice';

function AddComment({post}) {
  const dispatch=useDispatch();
  const handleSubmit=()=>{
    const text=document.getElementsByClassName('cmt-add')[0].value;
    dispatch(addComment(post._id,text));
    if(text===''){
      document.getElementsByClassName('cmt-err')[0].textContent='Please enter Comment';
      document.getElementsByClassName('cmt-err')[0].classList.remove('hide');
    }
    else{
      document.getElementsByClassName('cmt-add')[0].value='';
      document.getElementsByClassName('cmt-err')[0].classList.add('hide');

    }
  }
  return (
    <>
    <div className='post-add-head'>
        Add Comment
    </div>
    <textarea className='cmt-add inp' placeholder='Place a Comment'></textarea>
    <button className="but post-sub cmt-sub" onClick={handleSubmit}>
        Submit
    </button>
    </>
  )
}

export default AddComment