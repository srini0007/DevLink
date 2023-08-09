import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import formatDate from '../../utils/formatDate';
import { deleteEducation } from '../../reducer/profileSlice';
function Education() {
    const {profile} = useSelector(state=>state.profile);
    const dispatch= useDispatch();
    const education= profile.education;
    if(education.length===0){
        return;
    }
    const educations = education?.map(edu=>(
        <tr className='tr' key={edu._id}>
        <td className='td'>{edu.college}</td>
        <td className='td'>{edu.degree}</td>
        <td className='td'>
          {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
        </td>
        <td className='td'>
          <button
            onClick={() => dispatch(deleteEducation(edu._id))}
            className="but dash-del but-del"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  return (
    <>
    
    <h2 className='dash-exp'>Education </h2>
    <table className='table'>
        <thead>
            <tr>
                <th className='t1'>College</th>
                <th className='t2'>Degree</th>
                <th className='t3'>Years</th>
                <th className='t4'/>
            </tr>
        </thead>
        <tbody>
        {educations}
        </tbody>
    </table>
     
    </>
  )
}

export default Education