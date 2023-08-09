import React from 'react'
import { handleSign } from '../../reducer/autherrorSlice';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate } from 'react-router-dom';
function SignUp() {
    
    const {auth_error}  = useSelector(state=>state.autherror);
    const {auth} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    if(auth){
        return <Navigate to={'/dashboard'} />;
      }
   
    const handleSubmit = (e)=>{
        e.preventDefault();
        const name=document.getElementsByClassName('sign-i1')[0].value;    
        const email=document.getElementsByClassName('sign-i2')[0].value;    
        const pass=document.getElementsByClassName('sign-i3')[0].value;    
        dispatch(handleSign(name,email,pass));
    }
    
  return (
    <div className='sign'>
        <div className="hide sign-error-head">
        {
        (()=>{
            const element=[];
            for(let i=0;i<auth_error.length;i++){
                element.push(<div key={i} className='sign-error'> {auth_error[i]}</div>)
            }
            return element;
        })()}
        </div>
        
        <div className='sign-head'>
            Sign Up
        </div>
        <div className='sign-desc'>
            Create Your Account
        </div>
        <form className="sign-field">
            <input type='text' className='inp sign-i1'  placeholder='Name'  />
            <input type='email' className='inp sign-i2'  placeholder='Email'  />
            <input type='password' className='inp sign-i3'  placeholder='Password'  />
            <button className="but sign-but" onClick={handleSubmit}>Sign Up</button>
        </form>
    </div>
  );
}

export default SignUp