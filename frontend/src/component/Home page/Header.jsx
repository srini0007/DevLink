import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { log_out } from '../../reducer/authSlice';


function Header() {
    const {auth,loading} = useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const handleLogout=()=>{
        dispatch(log_out());
    }
    const authenticated=
            <div className='head'>
                <Link to={'/'}>
                    <div className="title">
                        DevLink
                    </div>
                </Link>
                <div className="head-nav">
                    <Link to={'/profiles'}>
                        <button className='head-but but'>
                            Users
                        </button>
                    </Link>
                    <Link to={'/post'}>
                        <button className='head-but but'>
                            Post
                        </button>
                    </Link>
                    <Link to={'/dashboard'}>
                        <button className='head-but but'>
                            Dashboard
                        </button>
                    </Link>
                    <Link to={'/'}>
                        <button className='head-but but' onClick={handleLogout}>
                            Logout
                        </button>
                    </Link>
                    
                </div>
            
            </div>
        const guest=<div className='head'>
        <Link to={'/'}>
            <div className="title">
                DevLink
            </div>
        </Link>
        <div className="head-nav">
            <Link to={'/Profiles'}>
                <button className='head-but but'>
                    Users
                </button>
            </Link>
            <Link to={'/SignUp'}>
                <button className='head-but but'>
                    SignUp
                </button>
            </Link>
            <Link to={'Login'}>
                <button className='head-but but'>
                    Login
                </button>
            </Link>
        </div>
      
    </div>
    
  return (
    <>
    {!loading &&<> {auth? authenticated:guest}</>}
    </>
  )
}

export default Header