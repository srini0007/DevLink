import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Link,Navigate } from 'react-router-dom';
import { getProfile } from '../../reducer/profileSlice';
import { useEffect } from 'react';
import { addEducation } from '../../reducer/profileSlice';

let submitted=false;
function AddEducation() {
    const {error,loading} = useSelector(state=>state.profile);
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(getProfile());
    },[dispatch]);
    console.log(submitted);
    if(submitted && error.length===0){
        submitted=false;
        console.log('endsf');
        return <Navigate to={'/dashboard'}/>
    }
    const handleSubmit=()=>{
        let data={
            college:document.getElementsByClassName('e1')[0].value,
            degree:document.getElementsByClassName('e2')[0].value,
            course:document.getElementsByClassName('e3')[0].value,
            from:document.getElementsByClassName('e4')[0].value,
            to:document.getElementsByClassName('e6')[0].value,
            current:document.getElementsByClassName('e5')[0].value,
            description:document.getElementsByClassName('e7')[0].value,
            }
            dispatch(addEducation(data));
            submitted=true;
    };
  return (
    <div className="exp">
        {loading?<div>Loading add Education</div>:
        <>
        <div className="hide edu-err">
        {
        (()=>{
            const element=[];
            for(let i=0;i<error?.length;i++){
                element.push(<div key={i} className='edu-error'> {error[i]}</div>)
            }
            return element;
        })()}
        </div>
        <div className="exp-head">
            Add Your Education
        </div>
        <div className="exp-field">
            <small className='exp-desc'>* = required field</small>
            <input type='text' className='inp e1' placeholder='* College' />
            <input type='text' className='inp e2' placeholder='* Degree' />
            <input type='text' className='inp e3' placeholder='* Course' />
            <div className="element">
                <small>From Date</small>
                <input type='date' className='inp e4' />
            </div>
            <div className="element">
            <input type="checkbox" className='e5' value={true} /><label>Currently in College</label>
            </div>
            <div className="element">
                <small>To Date</small>
                <input type='date' className='inp e6' />
            </div>
            <textarea className='inp e7' placeholder='Course Description' />
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
        </>
    }
    </div>
  )
}

export default AddEducation