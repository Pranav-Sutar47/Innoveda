import React from 'react'
import NavBar from '../Navbar'
import TeacherCourseAdd from './TeacherCourseAdd'
import TeacherCourse from './TeacherCourse'

export default function Home() {
  return (
    <div className='container-fluid'>
        <NavBar/>
        <div className='container'>
            <TeacherCourseAdd/>
            <TeacherCourse/>
        </div>
    </div>
  )
}
