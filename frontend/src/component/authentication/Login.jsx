import React from 'react'
import { handleLog } from '../../reducer/autherrorSlice';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate } from 'react-router-dom';


function Login() {
  const {auth_error}  = useSelector(state=>state.autherror);
  const dispatch = useDispatch();
  const {auth} = useSelector(state=>state.auth);
  if(auth){
    return <Navigate to={'/dashboard'} />;
  }
  const handleSubmit = (e)=>{
      e.preventDefault();
      const email=document.getElementsByClassName('log-i1')[0].value;    
      const pass=document.getElementsByClassName('log-i2')[0].value;    
      dispatch(handleLog(email,pass));
  }

  return (
    <div className='log'>
      <div className="hide log-error-head">
        {
        (()=>{
            const element=[];
            for(let i=0;i<auth_error.length;i++){
                element.push(<div key={i} className='log-error'> {auth_error[i]}</div>)
            }
            return element;
        })()}
        </div>
        <div className='log-head'>
            Login
        </div>
        <div className='log-desc'>
            Login Your Account
        </div>
        <form className="log-field">
            <input type='email' className='inp log-i1' placeholder='Email' required />
            <input type='password' className='inp log-i2' placeholder='Password' minLength={6} required />
            <button className="but log-but" onClick={handleSubmit}>Login</button>
        </form>
    </div>
  );
}

export default Login