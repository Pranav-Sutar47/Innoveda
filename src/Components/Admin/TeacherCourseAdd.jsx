import React from "react";
import TeacherCourseForm from "./TeacherCourseForm";
import TeacherCourse from "./TeacherCourse";

export default function TeacherCourseAdd() {
  return (
    <>

<nav className="navbar navbar-secondary bg-light">
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center">
            <button
            className="navbar-toggler me-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
            <div className="ms-left">
                Add Course
            </div>
            </div> 
        </div>
      </nav>

      <div
        className="collapse"
        id="navbarToggleExternalContent"
        data-bs-theme="dark"
      >
        <div className="bg-light p-4">
            <TeacherCourseForm/>   
        </div>
        </div>
    </>
  );
}
