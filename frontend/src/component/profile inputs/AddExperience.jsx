import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { addExperience } from '../../reducer/profileSlice';
import { getProfile } from '../../reducer/profileSlice';
import { useEffect } from 'react';
let submitted=false;
function AddExpereience() {
    const {error,loading} = useSelector(state=>state.profile);
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(getProfile());
    },[dispatch]);
    console.log(error);
    if(submitted && error.length===0){
        submitted=false;

        return <Navigate to={'/dashboard'}/>
    }
    const handleSubmit=()=>{
        let data={
            title:document.getElementsByClassName('e1')[0].value,
            company:document.getElementsByClassName('e2')[0].value,
            location:document.getElementsByClassName('e3')[0].value,
            from:document.getElementsByClassName('e4')[0].value,
            to:document.getElementsByClassName('e6')[0].value,
            current:document.getElementsByClassName('e5')[0].value,
            description:document.getElementsByClassName('e7')[0].value,
            }
            dispatch(addExperience(data));
            submitted=true;
    };
    if(loading){
        return <div>Loading add experience</div>
    }
  return (
    <div className="exp">
        <div className="hide exp-err">
        {
        (()=>{
            const element=[];
            for(let i=0;i<error.length;i++){
                element.push(<div key={i} className='exp-error'> {error[i]}</div>)
            }
            return element;
        })()}
        </div>
        <div className="exp-head">
            Add Your Experience
        </div>
        <div className="exp-field">
            <small className='exp-desc'>* = required field</small>
            <input type='text' className='inp e1' placeholder='* Job Title' />
            <input type='text' className='inp e2' placeholder='* Company' />
            <input type='text' className='inp e3' placeholder='Location' />
            <div className="element">
                <small>From Date</small>
                <input type='date' className='inp e4' />
            </div>
            <div className="element">
            <input type="checkbox" className='e5' value={true} /><label>Current Job</label>
            </div>
            <div className="element">
                <small>To Date</small>
                <input type='date' className='inp e6' />
            </div>
            <textarea className='inp e7' placeholder='Job Description' />
        </div>
        <div className="exp-but">
           
                <button className="but sub" onClick={handleSubmit}>
                    Submit
                </button>
          
            <Link to={'/dashboard'} >
                <button className="but back">
                    Go Back
                </button>
            </Link>
        </div>
    </div>
  )
}

export default AddExpereience