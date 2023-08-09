import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileItem from './ProfileItem';
import { getAllProfiles } from '../../reducer/profileSlice';

function Profiles() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllProfiles());
  },[dispatch]);
  const {profiles,loading} = useSelector(state=>state.profile);
  if(loading){
    return <div>Loading all Users</div>
  }
  
  return (
    <div className="profiles-top">
      {profiles===null? <div>loading Profile</div>:
        <>
        <div className="pro-head">
            Developers
        </div>
        <div className="pro-desc">
            Link with Other Developers
        </div>
        <div className="profiles">
            {profiles?.map(profile => (
              <ProfileItem profile={profile} key={profile._id} />
            ))}
        </div>
        </>
  }
    </div>
  )
}

export default Profiles