import { useState } from "react"
import Navbar from "./Components/Navbar"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import LoginState from "./context/LoginState"
import UserHome from "./Components/UserHome"
import UserUpload from "./Components/UserUpload"
import UserUploadCard from "./Components/UserUploadCard"
import AdminNavbar from "./Components/Admin/AdminNavbar"
import Home from "./Components/Admin/Home"
import ViewUploads from "./Components/Admin/ViewUploads"

function App() {

  //const [title,setTitle] = useState();
  // const [file,setFile] = useState();
  // const [courseName,setCourseName] = useState();
  // const [courseTitle,setCourseTitle] = useState();
  // const [userId,setUserId] = useState();

  // const submitImage = async(e)=>{
  //   e.preventDefault();
  //   const formData = new FormData();
  //   //formData.append("title",title);
  //   formData.append("file",file);
  //   formData.append('courseName',courseName);
  //   formData.append('courseTitle',courseTitle);
  //   formData.append('userId',userId);
  //   console.log(file,courseName,courseTitle,userId);

  //   const result = await fetch("http://localhost:5000/upload/uploadinfo", {
  //     method: "POST", // Specify method
  //     body: formData, // Pass formData in the body
  //   });
  
  //   if (result.ok) {
  //     const response = await result.text();
  //     console.log("Upload successful:", response);
  //   } else {
  //     console.error("Upload failed:", result.status, result.statusText);
  //   }

  // }


  return (
    <div>
      <LoginState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/userHome" element={<UserHome/>}/>
          <Route path="/useruploads" element={<UserUpload/>}/>
          <Route path="/usercard" element={<UserUploadCard/>}/>
          <Route path='/viewUpload' element={<ViewUploads/>}/>
          {/* <Route path="/adminHome" element={<AdminNavbar/>}/> */}
          <Route path="/teacherHome" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      </LoginState>
    </div>
    
  )
}

export default App


    // <div className="container">
    //   <form onSubmit={submitImage} method="POST">
      
    //   <input type="text" placeholder="userId" required onChange={(e)=>setUserId(e.target.value)}/>
    //   <br/>
    //   <input type="text" placeholder="courseName" required onChange={(e)=>setCourseName(e.target.value)}/>
    //   <br/>
    //   <input type="text" placeholder="courseTitle" required onChange={(e)=>setCourseTitle(e.target.value)}/>
    //   <br/>
    //   {/* <input type="text" placeholder="title" required onChange={(e)=>setTitle(e.target.value)}/>
    //   <br/> */}
    //   <input type="file" placeholder="Upload file" accept="application/pdf" required onChange={(e)=>setFile(e.target.files[0])}/>
    //   <br/>

    //   <button type='submit'>Submit</button>

    //   </form>      
    // </div>