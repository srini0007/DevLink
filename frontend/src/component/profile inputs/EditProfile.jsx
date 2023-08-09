import React, { useEffect, useState } from 'react'
import { createProfile, getProfile } from '../../reducer/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link , Navigate} from 'react-router-dom';
let submitted=false;
function EditProfile() {
    const {profile,loading,error} = useSelector(state=>state.profile);
    const dispatch= useDispatch();
    const [addsocial,setAddSocial]= useState(false);
    useEffect(()=>{
        dispatch(getProfile());
    },[dispatch]);
    
    if(loading ){
        return <div>Loading Profile ...</div>
    }
    
    if(submitted && error.length===0){
        submitted=false;

        return <Navigate to={'/dashboard'}/>
    }
    const handleSubmit= ()=>{
        let data={
        status:document.getElementsByClassName('cp-1')[0]?.value || '',
        website:document.getElementsByClassName('cp-2')[0]?.value  || '',
        company:document.getElementsByClassName('cp-3')[0]?.value  || '',
        location:document.getElementsByClassName('cp-4')[0]?.value  || '',
        skills:document.getElementsByClassName('cp-5')[0]?.value  || '',
        githubusername:document.getElementsByClassName('cp-6')[0]?.value  || '',
        bio:document.getElementsByClassName('cp-7')[0]?.value  || '',
        twitter:document.getElementsByClassName('cp-8')[0]?.value  || '',
        facebook:document.getElementsByClassName('cp-9')[0]?.value  || '',
        linkedin:document.getElementsByClassName('cp-11')[0]?.value  || '',
        youtube:document.getElementsByClassName('cp-10')[0]?.value  || '',
        instagram:document.getElementsByClassName('cp-12')[0]?.value  || ''
        }
        console.log(data);
        dispatch(createProfile(data));
        submitted=true;
    }

    const handleSocial= ()=>{
        setAddSocial((prev)=>{
            return !prev;
        });
    };

    

    if(loading ){
        return <div>Loading Profile ...</div>
    }
  return (
    
    <div className="create-pro"> 
        <div className="hide create-pro-error">
        {
        (()=>{
            const element=[];
            for(let i=0;i<error.length;i++){
                element.push(<div key={i} className='pro-error'> {error[i]}</div>)
            }
            return element;
        })()}
        </div>
        <div className='create-pro-head'>Edit Your Profile</div>
        <div className="create-pro-field">
            <small className='create-pro-desc'>* = required field</small>
            <div className="element">
                <input type='text' className='inp cp-1' defaultValue={profile?.status || ''} placeholder='* Professional Status' />
                <small>Write your Proffesional Status</small>
            </div>
            <div className="element">
                <input type='text' className='inp cp-2' defaultValue={profile?.website || ''} placeholder='Website' />
                <small>Could be your website or company website</small>
            </div>
            <div className="element">
                <input type='text' className='inp cp-3' placeholder='Company' defaultValue={profile?.company || ''} />
                <small>Write your Company name</small>
            </div>
            <div className="element">
                <input type='text' className='inp cp-4' defaultValue={profile?.location || ''} placeholder='Location' />
                <small>Write your City and State</small>
            </div>
            <div className="element">
                <input type='text' className='inp cp-5' defaultValue={profile?.skills || ''} placeholder='* Skills' />
                <small>Write your Technical Skills. use comma seperated values (eg: HTML, CSS ,Javascript)</small>
            </div>
            <div className="element">
                <input type='text' className='inp cp-6' defaultValue={profile?.githubusername || ''} placeholder='Github Username' />
                <small>Include your Github Username to show latest repository</small>
            </div>
            <div className="element">
                <textarea className='inp cp-7' defaultValue={profile?.bio || ''} placeholder='short bio of yourself' />
                <small>give short description about yourself</small>
            </div>
        </div>
        <div >
          <button className="but soc-but" onClick={handleSocial}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {addsocial &&
        <div className="soc-field">

            <div className='element'>
            {/* <i class="fab fa-twitter fa-2x"></i> */}
            <input type="text" className='inp cp-8' defaultValue={profile?.social?.twitter || ''}  placeholder="Twitter URL" name="twitter" />
            </div>

            <div className="element">
            {/* <i class="fab fa-facebook fa-2x"></i>/ */}
            <input type="text" className='inp cp-9' defaultValue={profile?.social?.facebook || ''}  placeholder="Facebook URL" name="facebook" />
            </div>

            <div className="element">
            {/* <i class="fab fa-youtube fa-2x"></i> */}
            <input type="text" className='inp cp-10' defaultValue={profile?.social?.youtube || ''} placeholder="YouTube URL" name="youtube" />
            </div>

            <div className="element">
            {/* <i class="fab fa-linkedin fa-2x"></i> */}
            <input type="text" className='inp cp-11' defaultValue={profile?.social?.linkedin || ''} placeholder="Linkedin URL" name="linkedin" />
            </div>

            <div className="element">
            {/* <i class="fab fa-instagram fa-2x"></i> */}
            <input type="text" className='inp cp-12' defaultValue={profile?.social?.instagram || ''} placeholder="Instagram URL" name="instagram" />
            </div>
        </div>
        }
        <div className="create-pro-but">
             {/* <Link to={'dashboard'}> */}
                <button className="but sub" onClick={handleSubmit}>
                    Submit
                </button>
            {/* </Link> */}
            <Link to={'/dashboard'} >
                <button className="but back">
                    Go Back
                </button>
            </Link>
        </div>
    
    </div>
  )
}

export default EditProfile