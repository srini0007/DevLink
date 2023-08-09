import React from 'react'
import formatDate from '../../utils/formatDate'


function ProfileEducation({
    education: { college, degree, course,  to, from, description }
  }) {
  return (
    <div>
    <h3 className="text-dark">{college}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : 'Now'}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Course </strong> {course}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
  )
}

export default ProfileEducation