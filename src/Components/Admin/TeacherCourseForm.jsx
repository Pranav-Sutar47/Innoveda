import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { showToast } from "../ToastComponent";

export default function TeacherCourseForm() {
  const [counter, setCounter] = useState(0);
  const [subjects, setSubjects] = useState([]);
  //const [inputVal,setInputVal] = useState('');
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
        subjectTitle: [], // Array to store subject titles
      },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjectTitle", // Key that holds the array of subject titles
  });

  const onSubmit = async(data) => {
    try{
        let url = String(import.meta.env.VITE_COURSE);
        url += '/addcourse';

        let myHeaders = new Headers();
        myHeaders.append('Content-Type','application/json');
        myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`);


        const response = await fetch(url,{
            method:'POST',
            headers:myHeaders,
            body:JSON.stringify(data)
        });

        const json = await response.json();

        if(json.status){
            showToast(json.message,'success');
        }else 
            showToast(json.message,'error');
        
        reset();
    }catch(err){
        console.log('Error at Teacher Course Add Form',err);
    }
  };


  useEffect(() => {
    if (fields.length === 0) {
      append(""); // Add an empty field when the form loads
    }
  }, [fields, append]);

  return (
    <div className="container-fluid">
      <Form onSubmit={handleSubmit(onSubmit)} className="bg-light">
        <Form.Group as={Row} className="mb-3" controlId="formTeamLeaderName">
          <Form.Label column sm="2" className="fw-bold">
            Enter Year
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" className="text-black bg-light placeholder-custom" placeholder="Enter Year" required {...register("year")} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formTeamLeaderEmail">
          <Form.Label column sm="2" className="fw-bold">
            Enter Subject Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" required {...register("subjectName")}
            className="bg-light text-black placeholder-custom" placeholder="Enter Subject Name" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="subjectID">
          <Form.Label column sm="3" className="fw-bold">
            Enter Subject Title
          </Form.Label>

          {fields.map((field, index) => (

        <div key={index} className="mb-3">
          <Form.Control
            placeholder={`Subject Title ${index + 1}`}
            {...register(`subjectTitle.${index}`)} // Register field for React Hook Form
            className="bg-light text-black placeholder-custom"
            required
        
          />
          
        </div>
      ))}

          <div className="d-flex justify-content-center align-items-center mt-2">
          <Button
          variant="outline-success"
          onClick={() => setCounter((prev)=>{
            setCounter(prev + 1);
            fields.push("")
          })} // Add a new empty input field
        >
          Add Subject Course
        </Button>
        <Button
            variant="danger"
            className="ms-5"
            onClick={() => remove(fields.length-1)} // Remove the specific field
          >
            Remove Subject Course
          </Button>
          </div>
        </Form.Group>

        <div className="d-flex">
          <Button type="submit" variant="success">
            Save
          </Button>
          <Button type="reset" variant="danger" className="ms-auto">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
