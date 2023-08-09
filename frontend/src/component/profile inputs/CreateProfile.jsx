import React from 'react'
import { createProfile } from '../../reducer/profileSlice'
import { useDispatch,useSelector } from 'react-redux'
import { Link,Navigate } from 'react-router-dom';
import { useState } from 'react';
let submitted=false;
function CreateProfile() {
    const dispatch= useDispatch();
    const {loading,error} = useSelector(state=>state.profile);
    const [addsocial,setAddSocial]= useState(false);

    if(submitted && error.length===0){
        submitted=false;

        return <Navigate to={'/dashboard'}/>
    }
    const handleSubmit= ()=>{
        let data={
        status:document.getElementsByClassName('cp-1')[0].value,
        website:document.getElementsByClassName('cp-2')[0].value,
        company:document.getElementsByClassName('cp-3')[0].value,
        location:document.getElementsByClassName('cp-4')[0].value,
        skills:document.getElementsByClassName('cp-5')[0].value,
        githubusername:document.getElementsByClassName('cp-6')[0].value,
        bio:document.getElementsByClassName('cp-7')[0].value,
        twitter:document.getElementsByClassName('cp-8')[0].value,
        facebook:document.getElementsByClassName('cp-9')[0].value,
        linkedin:document.getElementsByClassName('cp-10')[0].value,
        youtube:document.getElementsByClassName('cp-11')[0].value,
        instagram:document.getElementsByClassName('cp-12')[0].value
        }
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
        <div className='create-pro-head'>Create Your Profile</div>
        <div className="create-pro-field">
            <small className='create-pro-desc'>* = required field</small>
            <div className="element">
                <input type='text' className='inp cp-1' placeholder='* Professional Status' />
                <small>Write your Proffesional Status</small>
            </div>
            <div className="element">
                <input type='text' className='inp cp-2' placeholder='Website' />
                <small>Could be your own or company website</small>
            </div>
            <div className="element">
                <input type='text' className='inp cp-3' placeholder='Company' />
                <small>Write your Proffesional Status</small>
            </div>
            <div className="element">
                <input type='text' className='inp cp-4' placeholder='Location' />
                <small>Write your City and State</small>
            </div>
            <div className="element">
                <input type='text' className='inp cp-5' placeholder='* Skills' />
                <small>Write your Technical Skills. use comma seperated values (eg: HTML, CSS ,Javascript)</small>
            </div>
            <div className="element">
                <input type='text' className='inp cp-6' placeholder='Github Username' />
                <small>Include your Github Username to show latest repository</small>
            </div>
            <div className="element">
                <textarea className='inp cp-7' placeholder='short bio of yourself' />
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
            <input type="text" className='inp cp-8' placeholder="Twitter URL" name="twitter" />
            </div>

            <div className="element">
            {/* <i class="fab fa-facebook fa-2x"></i>/ */}
            <input type="text" className='inp cp-9' placeholder="Facebook URL" name="facebook" />
            </div>

            <div className="element">
            {/* <i class="fab fa-youtube fa-2x"></i> */}
            <input type="text" className='inp cp-10' placeholder="YouTube URL" name="youtube" />
            </div>

            <div className="element">
            {/* <i class="fab fa-linkedin fa-2x"></i> */}
            <input type="text" className='inp cp-11' placeholder="Linkedin URL" name="linkedin" />
            </div>

            <div className="element">
            {/* <i class="fab fa-instagram fa-2x"></i> */}
            <input type="text" className='inp cp-12' placeholder="Instagram URL" name="instagram" />
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

export default CreateProfile