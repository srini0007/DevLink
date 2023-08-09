import React from 'react'
import { Link, Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux';

function Landing() {
    const {auth,loading} = useSelector(state=>state.auth);
 
    if(auth && !loading){
        return <Navigate to={'/dashboard'} />
    }
  return (
    <div className='landing'>
        <div className='landing-head'>
            DevLink
        </div>
        <div className='landing-desc'>
            Connecting Developers in the Digital World
        </div>
        <div className="wrap-but">
            <Link to={'/SignUp'}>
                <button className='but landing-but'>
                    SignUp
                </button>
            </Link>
            <Link to={'/Login'}>
                <button className="but landing-but">
                    Login
                </button>
            </Link>
        </div>
      
    </div>
  )
}

export default Landing