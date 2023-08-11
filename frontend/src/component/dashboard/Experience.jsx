import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import formatDate from '../../utils/formatDate';
import { deleteExperience } from '../../reducer/profileSlice';
function Experience() {
    const {cur_profile} = useSelector(state=>state.profile);
    const dispatch= useDispatch();
    const experience= cur_profile.experience;
    if(experience.length===0){
        return;
    }
    const experiences = experience?.map(exp=>(
        <tr className='tr' key={exp._id}>
        <td className='td'>{exp.company}</td>
        <td className='td'>{exp.title}</td>
        <td className='td'>
          {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
        </td>
        <td className='td'>
          <button
            onClick={() => dispatch(deleteExperience(exp._id))}
            className="but dash-del but-del"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    
  return (
    <>
    
    <h2 className='dash-exp'>Experience </h2>
    <table className='table'>
        <thead>
            <tr>
                <th className='t1'>Company</th>
                <th className='t2'>Title</th>
                <th className='t3'>Years</th>
                <th className='t4'/>
            </tr>
        </thead>
        <tbody>
        {experiences}
        </tbody>
    </table>
     
    </>
  )
}

export default Experience
