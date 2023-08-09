import React from 'react'
import { Link } from 'react-router-dom';
function ProfileItem({profile}){
    const {name,_id,avatar} = profile.user;
    const {status,company,skills,location} =profile;
  return (
    <div className='profile'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='but pro-but'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='pro-skills'>
             {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfileItem