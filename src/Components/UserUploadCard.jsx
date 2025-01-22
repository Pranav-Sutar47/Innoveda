import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { Tooltip } from 'react-tooltip'
import { showToast } from "./ToastComponent";
import NavBar from './Navbar';

export default function UserUploadCard() {

    const { register, handleSubmit, formState: { errors }, reset} = useForm({});

    const location = useLocation();
    const data = location.state?.data;
    const [load,setLoad] = useState(false);
    const [show,setShow] = useState(false);
    const [name,setName] = useState('Uploaded File');
    const [display,setDisplay] = useState(true); // button should display
    const [del,setDel] = useState(false);

    useEffect(()=>{
        console.log(data);
        if(data.status==='Submitted'){
            setShow(true);
            setDisplay(false); // button should not display
        }
    },[]);

    const uploadDoc = async(val) =>{
        try{
            setLoad(true);
            const formData = new FormData();
            formData.append('courseName',data.subjectName);
            formData.append('courseTitle',data.subjectTitle);
            formData.append('file',val.file[0]);
            
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    
            let url = String(import.meta.env.VITE_UPLOAD);
            url += '/uploadinfo';

            const response = await fetch(url,{
                method:'POST',
                mode:'cors',
                headers:myHeaders,
                body:formData
            });
    
            //const json = await response.json();
            if(json.status){
                showToast(json.message,'success');
                setShow(true);
                setDisplay(false);
                setName(json.fileName);
            }else 
                showToast(json.message,'error');
            setLoad(false);
        }catch(err){
            console.log(err);
        }   
    }

    const enable = async()=>{
        setDisplay(true);
    }

    const deleteFile = async()=>{
        try{
            setDel(true);

            let url = String(import.meta.env.VITE_UPLOAD);
            url += '/deletefile';

            const myHeaders = new Headers();
            myHeaders.append('Content-Type','application/json');
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

            const obj = {
                courseName:data.subjectName,
                courseTitle:data.subjectTitle
            };

            //console.log(obj);

            const response = await fetch(url,{
                mode:'cors',
                headers:myHeaders,
                body: JSON.stringify(obj),
                method:'POST'
            });

            const json = await response.json();
            console.log(json);

            if(json.status){
                setShow(false);
                showToast(json.message,'success');
            }else 
                showToast(json.message,'error');

            setDel(false);
        }catch(err){
            console.error('Error while deleting file',err);
        }
    }

    return (
        <div className='container-fluid'>
            <NavBar/>
            <h1 className='text-center'>{data.subjectName}</h1>
            <h3 className='text-center'>{data.subjectTitle}</h3>

            <div className='container'>
                <div className='container bg-light p-2 shadow-lg rounded'>
                    <Form onSubmit={handleSubmit(uploadDoc)}>
                        <Form.Group as={Row} className="mb-3" controlId="formFile">
                            <Form.Label column sm="2" className="fw-bold">
                                Upload File
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    {...register('file')}
                                    required
                                />
                            </Col>
                        </Form.Group>
                    <div className='container row'>
                        <Button type='submit' disabled={!display} variant='outline-success' className='col-6'
                        style={{cursor:`${display === false ? 'not-allowed' :'pointer'}`}}
                        >
                            {load === true ? <span className='spinner-border text-success'></span>:'Turn In'}
                        </Button>
                        <Button type='reset' variant='outline-danger' className='col-6' onClick={enable}>Unsubmit</Button>
                    </div>
                    </Form>
                </div>
                {
                    show && 
                    <div className='container mt-5 bg-light p-2 shadow-lg rounded' style={{cursor:'pointer'}}>
                        <h3>File Name : {name} 
                            <span data-tooltip-id="my-tooltip" data-tooltip-content="Delete File" onClick={deleteFile}
                            className={`${del===true ? 'spinner-border text-success': ''}`}
                            >
                                {!del && <MdCancel/>} &nbsp;
                            </span>
                        </h3>
                        <Tooltip id="my-tooltip" />
                    </div>
                }
            </div>
        </div>
    )
}
