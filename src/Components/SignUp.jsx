import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { showToast } from "./ToastComponent";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const { register: studentRegister, handleSubmit: handleStudentSubmit, formState: { errors: studentErrors }, reset: resetStudent, resetField: resetStudentField ,unregister} = useForm();

    const { register: facultyRegister, handleSubmit: handleFacultySubmit, formState: { errors: facultyErrors }, reset: resetFaculty, resetField: resetFacultyField } = useForm();

    const navigate = useNavigate();

    const facultySignUp = async (data) => {
        let url = String(import.meta.env.VITE_LOGIN);
        url += '/signupadmin';
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        const json = await response.json();

        if (json.status)
            showToast(json.message, 'success');
        else
            showToast(json.message, 'error');

        resetFaculty();
        navigate('/login');
    }

    const [teamMembers, setTeamMembers] = useState([]);

    const [counter, setCounter] = useState(-1);

    const addRow = () => {
        setTeamMembers([...teamMembers, { name: '', prn: '' }]);
        setCounter(counter + 1);
    }

    const removeRow = () => {

        if(teamMembers.length==0)
            return ;

        const index = teamMembers.length - 1;

        unregister(`teamMembers[${index}].name`);
        unregister(`teamMembers[${index}].prn`);

        const newTeam = teamMembers.slice(0,-1);
        setTeamMembers(newTeam);
        setCounter(counter - 1);
    }


    const studentSignUp = async (data) => {
        console.log(data)
        let url = String(import.meta.env.VITE_LOGIN);
        url += '/signupuser';

        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
            mode:'cors'
        });

        const json = await response.json();
        console.log(json)
        if(json.status)
            showToast(json.message,'success');
        else 
            showToast(json.message,'error');
        
        resetStudent();
        navigate('/login');
    }

    return (
        <div className='container-fluid'>
            <h1 className="text-center mb-3">Sign Up</h1>

            <Tabs
                defaultActiveKey="home"
                id="fill-tab-example"
                className="mb-3"
                fill
                variant='pills'
            >
                <Tab eventKey="home" className='text-black' title="Student Sign Up">
                    <Form onSubmit={handleStudentSubmit(studentSignUp)}>
                        <Form.Group controlId="studentNameId" className="mb-4">
                            <Form.Control
                                required
                                type="text"
                                minLength={3}
                                maxLength={50}
                                placeholder="Name"
                                {...studentRegister('name', { required: true })}
                                aria-invalid={studentErrors.name ? "true" : "false"}
                            />
                            {studentErrors.name && <span className='alert'>Name is Required</span>}
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="studentEmailId">
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                {...studentRegister('email', { required: true })}
                                aria-invalid={studentErrors.email ? "true" : "false"}
                            />
                        </Form.Group>
                        {studentErrors.email && <span className="alert">Email is required</span>}
                        <Form.Group controlId="studentPasswordId" className="mb-4">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                minLength={4}
                                maxLength={8}
                                {...studentRegister('password', { required: true })}
                                aria-invalid={studentErrors.password ? "true" : "false"}
                            />
                        </Form.Group>
                        {studentErrors.password && <span className="alert">Password is required</span>}

                        <Form.Group controlId="studentPrnNo" className="mb-4">
                            <Form.Control
                                required
                                type="text"
                                minLength={7}
                                maxLength={9}
                                placeholder="PRN"
                                {...studentRegister('prn', { required: true })}
                                aria-invalid={studentErrors.uniqueId ? 'true' : 'false'}
                            />
                            {studentErrors.uniqueId && (<span className="alert">Student PRN is required</span>)}
                        </Form.Group>

                        {teamMembers.map((member, index) => (
                            <Form.Group  className='mb-3' key={index}>
                                <div className='row'>
                                    <div className='col-md-6 mt-2'>
                                        <Form.Control
                                            required
                                            id = {`teamMemberName-${index}`}
                                            type='text'
                                            minLength={3}
                                            maxLength={50}
                                            placeholder='Team Member Name'
                                            {...studentRegister(`teamMembers[${index}].name`, { required: true })}
                                        />
                                    </div>
                                    <div className='col-md-6 mt-2'>
                                        <Form.Control
                                            required
                                            id={`teamMemberPrn-${index}`}
                                            type='text'
                                            minLength={7}
                                            placeholder='Team Member PRN'
                                            maxLength={9}
                                            {...studentRegister(`teamMembers[${index}].prn`, { required: true })}
                                        />
                                    </div>
                                </div>


                                {studentErrors.teamMembers?.[index]?.name && (
                                    <span className="alert">Team Member Name is required</span>
                                )}
                                {studentErrors.teamMembers?.[index]?.prn && (
                                    <span className='alert'>Team Member PRN is required</span>
                                )}
                            </Form.Group>
                        ))

                        }
                        <div className='row'>
                            <Button variant='outline-primary' className='mb-3 col-md-6' onClick={addRow} disabled={counter >= 3}>
                                Add Team Members
                            </Button>
                            <Button variant='outline-danger' className='mb-3 col-md-6' onClick={removeRow} disabled={counter === -1}>
                                Remove Team Member
                            </Button>
                        </div>

                        <div className="d-flex mt-2">
                            <Button type="submit" variant="success">Login</Button>
                            <Button type="reset" variant="danger" onClick={() => resetStudent()} className="ms-auto">Cancel</Button>
                        </div>
                    </Form>
                </Tab>
                <Tab eventKey="profile" title="Faculty Sign Up">
                    <Form onSubmit={handleFacultySubmit(facultySignUp)}>
                        <Form.Group controlId="facultyNameId" className="mb-4">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Name"
                                {...facultyRegister('name', { required: true })}
                                aria-invalid={facultyErrors.name ? "true" : "false"}
                            />
                            {facultyErrors.name && <span className='alert'>Name is Required</span>}
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="facultyEmailId">
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                {...facultyRegister('email', { required: true })}
                                aria-invalid={facultyErrors.email ? "true" : "false"}
                            />
                            {facultyErrors.email && <span className="alert">Email is required</span>}
                        </Form.Group>

                        <Form.Group controlId="facultyPasswordId" className="mb-4">
                            <Form.Control
                                required
                                type="text"
                                minLength={4}
                                maxLength={8}
                                placeholder="Password"
                                {...facultyRegister('password', { required: true })}
                                aria-invalid={facultyErrors.password ? "true" : "false"}
                            />
                            {facultyErrors.password && <span className="alert">Password is required</span>}
                        </Form.Group>

                        <Form.Group controlId="facultyUniqueId" className="mb-4">
                            <Form.Control
                                required
                                type="password"
                                minLength={8}
                                maxLength={8}
                                placeholder="Unique Id"
                                {...facultyRegister('uniqueId', { required: true })}
                                aria-invalid={facultyErrors.uniqueId ? 'true' : 'false'}
                            />
                            {facultyErrors.uniqueId && (<span className="alert">Unique Id is Improtant</span>)}
                        </Form.Group>


                        <div className="d-flex">
                            <Button type="submit" variant="success">Login</Button>
                            <Button type="reset" variant="danger" className="ms-auto" onClick={() => resetFaculty()}>Cancel</Button>
                        </div>
                    </Form>
                </Tab>
            </Tabs>

            <div className="container">
                <h6 className="text-center link" onClick={() => navigate('/login')}>Already User? Sign In</h6>
            </div>
        </div>
    )
}
