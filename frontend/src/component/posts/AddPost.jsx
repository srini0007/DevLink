import React from 'react'
import { useDispatch } from 'react-redux';
import { addPost } from '../../reducer/postSlice';

function AddPost() {
  const dispatch=useDispatch();
  const handleSubmit = ()=>{
    const text=document.getElementsByClassName('post-add')[0].value;
    if(text.length>9){
      document.getElementsByClassName('post-add')[0].value='';
    }
    dispatch(addPost(text));
  }
  
  return (
    <>
    <div className='post-add-head'>
        Add Your Post
    </div>
    <textarea className='post-add inp' placeholder='create a post'></textarea>
    <button className="but post-sub" onClick={handleSubmit}>
        Submit
    </button>
    </>
  )
}

export default AddPost