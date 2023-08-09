import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams,Link } from 'react-router-dom'
import { getProfileById } from '../../reducer/profileSlice';
import ProfileTop from './ProfileTop';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';


function Profile() {
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProfileById(id));
    },[dispatch,id]);
    const {profile,loading} = useSelector(state=>state.profile);
    const authenticate = useSelector(state=>state.auth);
     if( loading || authenticate.loading || profile===null){
        return <div>Loading profile</div>
     }
  return (
    <div className='det-profile'>
        <>
          <Link to="/profiles">
            <button  className="but back-but">
                Back To Profile
            </button>
          </Link>
          {authenticate.auth &&
            authenticate.loading === false &&
            authenticate.user._id === profile.user._id && (
              <Link to="/dashboard/editProfile" >
                <button className="but edit-but">
                    Edit Profile
                </button>
              </Link>
            )}
          <div className="profile-grid my-1">

              <ProfileTop profile={profile} /> 
               <ProfileAbout profile={profile}/> 
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile?.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile?.education.length > 0 ? (
                <>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile?.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
        </div>

  )
}

export default Profile