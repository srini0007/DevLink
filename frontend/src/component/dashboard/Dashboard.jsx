import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount, getProfile } from '../../reducer/profileSlice';
import { Link, Navigate } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';


function Dashboard() {
    const {user} = useSelector(state=>state.auth);
    const {cur_profile,loading} = useSelector(state=>state.profile);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProfile());
    },[dispatch]);
    
    if(loading){
        return <div>Dashboard loading</div>
    }

    const handleDelete=()=>{
        if(window.confirm('Are You Sure Do You Want To Delete Your Account? This also includes Deleting your Post and Profile')===true){  
          dispatch(deleteAccount());
        }
    }

    if(user===null){
        console.log(user);
        return <Navigate to={'/'}/>
    }
  return (
    <div className="dash">
        <div className="dash-head">
            Dashboard
        </div>
        <div className="dash-desc">
            Welcome {user && user.name}
        </div>
        <div className="dash-field">
            {cur_profile===null? 
            <>
            <div className="dash-desc2">you have not created Profile</div>
            <Link to={'/dashboard/createProfile'}>
                <button className="but pro-create-but">Create Profile</button>
            </Link>
            </>:
            <>
            <div className="dash-pro-but">
                <Link to={'/dashboard/editProfile'}>
                    <button className="but pro-update-but">Update Profile</button>
                </Link>
                <Link to={'/dashboard/experience'}>
                    <button className="but pro-exp-but">Add Experience</button>
                </Link>
                <Link to={'/dashboard/education'}>
                    <button className="but pro-edu-but">Add Education</button>
                </Link>
            </div>
            </> 
            }
        </div>
        {cur_profile!==null &&<>
        <Experience />
        <Education />
        </>}
        
        <button className="but dash-del del-act but-del" onClick={handleDelete}>Delete Account</button>
        
    </div>
  )
}

export default Dashboard