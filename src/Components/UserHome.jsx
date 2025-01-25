import React, { useContext, useEffect, useState } from 'react'
import LoginContext from '../context/LoginContext';
import { useForm } from "react-hook-form";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { showToast } from './ToastComponent';
import NavBar from './Navbar';

export default function UserHome() {

    const { getUser, user } = useContext(LoginContext);

    const { register, unregister, handleSubmit, setValue, getValues, formState: { errors }, reset, resetField } = useForm({
        defaultValues: {
            classYear: user?.classYear || "",
            teamName: user?.teamName || ""
        }
    });


    const [subjects, setSubjects] = useState([{}]);
    const [counter, setCounter] = useState(0);
    const [formSubmit,setFormSubmit] = useState(false);

    const addRow = () => {
        setSubjects([...subjects, { subjectName: '', subjectTitle: '' }]);
        setCounter(counter + 1);
    }

    const removeRow = () => {
        if (subjects.length == 0)
            return;
        const index = subjects.length - 1;
        unregister(`subjects[${index}].subjectName`);
        unregister(`subjects[${index}].subjectTitle`);

        const newSub = subjects.slice(0, -1);
        setSubjects(newSub);
        setCounter(counter - 1);
    }

    const onSubmit = async (data) => {
        try {

            data.subjects = data.subjects.map((sub)=>{
                return {
                    ...sub,
                    status:'Not Submitted'
                };
            })


            let url = String(import.meta.env.VITE_USER);
            url += '/addClientInfo';

            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
 
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                body: JSON.stringify(data)
            });
            reset();
            const json = await response.json();
            if (json.status) {
                showToast(json.message, "success");
                //setShowBtn(false);
            } else
                showToast(json.message, "error");

            setFormSubmit(true);
            reset();
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        reset();
        resetField('classYear');
        resetField('teamName');
        resetField('subjects');
        getUser();
    },[]);

    useEffect(() => {
        reset();
        getUser(); // Fetch user data
    }, [formSubmit,reset]); // Runs once on mount

    useEffect(() => {
        if (user.subjects && user.subjects.length > 0) {
            setSubjects(user.subjects);
            setCounter(user.subjects.length);
        }
        if (user.teamName)
            setValue('teamName', user.teamName);
        if (user.classYear)
            setValue('classYear', user.classYear);
        console.log('user',user.teamName);
    }, [user]);

    return (
        <div className='container-fluid'>
            <NavBar/>
        
        <div className='container'>
            {
                localStorage.getItem('token') !== null ?
                <div className='container-fluid'>
                <h1 className='text-center'>Your Profile</h1>
            <div className='container'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} className="mb-3" controlId="formTeamLeaderName">
                        <Form.Label column sm="2" className='fw-bold'>
                            Team Leader Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control readOnly defaultValue={user.name} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formTeamLeaderEmail">
                        <Form.Label column sm="2" className='fw-bold'>
                            Team Leader Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control readOnly defaultValue={user.email} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formTeamLeaderPRN">
                        <Form.Label column sm="2" className='fw-bold'>
                            Team Leader PRN
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control readOnly defaultValue={user.prn} />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="teamMembers">
                        <Form.Label className='fw-bold'>Team Members</Form.Label>
                        {user && user.teamMembers &&
                            user.teamMembers.map((member, index) => {
                                return (
                                    <div className="d-flex align-items-center mb-2" key={index}>
                                        <Form.Control type="text" placeholder="Name" readOnly className="me-2" defaultValue={member.name} />
                                        <Form.Control type="text" placeholder="PRN" readOnly defaultValue={member.prn} />
                                    </div>
                                )
                            })
                        }

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="teamName">
                        <Form.Label column sm="2" className='fw-bold'>
                            Team Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder='Team Name' minLength={2} maxLength={25} type='text'
                                {...register('teamName')} 
                                required
                                defaultValue={user?.teamName || getValues('teamName') || ''}
                                onChange={(e)=>setValue('teamName',e.target.value)}
                                readOnly={user.teamName === undefined || user.teamName === '' ? false : true}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="teamClass">
                        <Form.Label column sm="2" className='fw-bold'>
                            Class
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select aria-label="Default select example" {...register('classYear')}
                                defaultValue={user?.classYear || getValues('classYear') || ''}
                                onChange={(e) => setValue('classYear', e.target.value)}
                                disabled={user && user.classYear ? true : false} >
                                <option value="First Year">First Year</option>
                                <option value="Second Year">Second Year</option>
                                <option value="Third Year">Third Year</option>
                                <option value="Fourth Year">Fourth Year</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3' controlId='subjectID'>
                        <Form.Label column sm="2" className='fw-bold'>Subjects</Form.Label>
                        {
                            user && user.subjects && user.subjects.length > 0 ? (
                                subjects.map((sub, index) => {
                                    return (
                                        <Col sm='10' as={Row} key={index} className={`${counter >= 1 ? 'mleft mb-2' : ''}`}>

                                            <Col sm='5'>
                                                <Form.Control placeholder='Subject Name' minLength={2} maxLength={25} type='text'

                                                    {...register(`subjects[${index}].subjectName`)} required defaultValue={sub.subjectName}
                                                    readOnly={sub.subjectName !== ""} />
                                            </Col>
                                            <Col sm='5'>
                                                <Form.Control placeholder='Subject Title' minLength={2} maxLength={25} type='text'
                                                    {...register(`subjects[${index}].subjectTitle`)} required
                                                    defaultValue={sub.subjectTitle}
                                                    // onChange={(e) =>
                                                    //   handleInputChange(index, "subjectTitle", e.target.value)
                                                    // }
                                                    readOnly={sub.subjectTitle !== ""} />
                                            </Col>
                                        </Col>
                                    )
                                })
                            ) : (<>
                                {subjects.map((sub, index) => {
                                    return (
                                        <Col sm='10' as={Row} key={index} className={`${counter >= 1 ? 'mleft' : ''}`}>
                                            <Col sm='5' className='mt-2'>
                                                <Form.Control placeholder='Subject Name' minLength={2} maxLength={25} type='text' {...register(`subjects[${index}].subjectName`)} required />
                                            </Col>
                                            <Col sm='5' className='mt-2'>
                                                <Form.Control placeholder='Subject Title' minLength={2} maxLength={25} type='text' {...register(`subjects[${index}].subjectTitle`)} required />
                                            </Col>
                                        </Col>
                                    )
                                })
                                }
                            </>

                            )
                        }

                        <div className='d-flex justify-content-center mt-2'>
                            <Button className='mt-1 col-5 m-1' variant='outline-success' onClick={addRow}>
                                Add Subject
                            </Button>
                            <Button className='mt-1 col-5 m-1' variant='outline-danger' onClick={removeRow} disabled={counter === 0}>
                                Remove Subject
                            </Button>
                        </div>


                    </Form.Group>

                    <div className="d-flex">
                        <Button type="submit" variant="success">Save</Button>
                        <Button type="reset" variant="danger" className="ms-auto">Cancel</Button>
                    </div>

                </Form>
            </div>
            </div>
            :
            <h1>Please Login</h1>
            }
            
        </div >
        </div>
    )
}
