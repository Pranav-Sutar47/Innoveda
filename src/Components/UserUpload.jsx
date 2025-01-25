import React, { useContext, useEffect, useState } from 'react'
import LoginContext from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';

export default function UserUpload() {

    const { getClientInfo, clientInfo } = useContext(LoginContext);

    const [subjects, setSubjects] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async() =>{
            await getClientInfo();
        }
        fetchData();
    },[])

    useEffect(()=>{
        if(clientInfo && clientInfo.subjects)
            setSubjects(clientInfo.subjects);
    },[clientInfo]);

    const handleClick = (data) =>{
        navigate('/usercard',{state:{data,userId:clientInfo.userId}});
    }

    return (
        <div className='container-fluid'>
            <NavBar/>
            <h1 className='text-center mb-4'>Upload</h1>
            <div className='container row'>

                {
                    subjects.length > 0 ? (
                        subjects.map((sub, index) => {
                            return (
                                <div className='col-md-4 col-sm-12 bg-light text-black border-1 rounded p-3 z-1 shadow-lg' style={{cursor:'pointer'}} key={index} onClick={() => handleClick(sub)}>
                                    <div>
                                        <h3 style={{color:'orange'}}>Subject Name:<span style={{color:'black'}}>{sub.subjectName}</span></h3>
                                        <h3 style={{color:'orange'}}>Title:<span style={{color:'black'}}>{sub.subjectTitle}</span></h3>
                                        <h6 style={{color:'orange'}}>Status:<span style={{color:'black'}}>{sub.status}</span></h6>
                                    </div>
                                </div>
                            )
                        })
                    ) : (<h1>Add the Subjects First</h1>)
                }

            </div>
        </div>
    )
}
