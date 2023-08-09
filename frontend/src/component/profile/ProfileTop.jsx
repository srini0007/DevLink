import React from 'react'

function ProfileTop({profile}) {
  const {name,avatar} = profile.user;
  const {status,company,location,website,social} =profile;
  
  return (
    <div className="profile-top p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large pt-light">{name}</h1>
      <p className="lead pt-light">
        {status} {company ? <span> at {company}</span> : null}
      </p>
      <p className='pt-light pt-l'>{location ? <span>{location}</span> : null}</p>
      <div className="icons my-1">
        {website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </a>
        ) : null}
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
  )
}

export default ProfileTop