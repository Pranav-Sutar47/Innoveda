import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from "react";
import { showToast } from "./ToastComponent";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors },reset ,resetField} = useForm();
  
  const navigate = useNavigate();
  const context = useContext(LoginContext);
  const {setLogOut} = context;

  const onSubmit = async(data)=>{
    try{

      if(data.loginType === 'student'){
        let url = String(import.meta.env.VITE_LOGIN);
        url+='/loginuser';
        const res = {
          email : data.email,
          password:data.password
        };
        const response = await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(res),
          mode:'cors'
        });
  
        const json = await response.json();
  
        if(json.status){
          showToast(json.message,'success');
          localStorage.setItem('token',json.token);
          localStorage.setItem('name',json.name);
          localStorage.setItem('loginType','student');
          setLogOut(true);
          navigate('/userHome');
        }else 
          showToast(json.message,'error');
      }else{
          let url = String(import.meta.env.VITE_LOGIN);
          url += '/loginadmin';

          const res = {
            email : data.email,
            password : data.password,
            uniqueId : data.uniqueId
          };

          const response = await fetch(url,{
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(res),
            mode : 'cors'
          });

          const json = await response.json();

          if(json.status){
            localStorage.setItem('token',json.token);
            localStorage.setItem('name',json.name);
            localStorage.setItem('loginType','faculty');
            showToast(json.message,'success');
            setLogOut(true);
            navigate('/teacherHome');
          }else 
            showToast(json.message,'error');
      }
      reset();
    }catch(err){
      console.log(err)
    }
    
  };

    const [loginType,setLoginType] = useState();

  return (
    <div className="container-fluid">
      <h1 className="text-center mb-3 mt-1 bg-light shadow-lg z-1 rounded p-2">Innoveda</h1>
        <h1 className="text-center mb-3">Login</h1>
         <Form onSubmit={handleSubmit(onSubmit)}>
         <Form.Group className="mb-4" controlId="emailId">
          <Form.Control
            required
            type="email"
            placeholder="Email"
            {...register('email',{required:true})}
            aria-invalid={errors.email ? "true" : "false"}
          />
          </Form.Group>
          {errors.email && <span className="alert">Email is required</span>}
          <Form.Group  controlId="passwordId" className="mb-4">
          <Form.Control
            required
            type="text"
            placeholder="Password"
            {...register('password',{required:true})}
            aria-invalid={errors.password ? "true" : "false"}
          />
          </Form.Group>
          {errors.password && <span className="alert">Password is required</span>}
          <Form.Group  controlId="login" className="mb-4">
          <Form.Check
            inline
            type="radio"
            id="studentLogin"
            name="loginType" // Group radio buttons together
            label="Login as Student"
            value="student"
            onClick={(e)=>{
              setLoginType(e.target.id); 
              const uniqueIdField = document.getElementById('uniqueId');

              if (uniqueIdField) {
                uniqueIdField.value = null;
                resetField('uniqueId');
              }
            }
          }
            {...register('loginType',{required:true})}
            aria-invalid={errors.loginType ? "true" : "false"}
        />
        <Form.Check
            inline
            type="radio"
            id="facultyLogin"
            name="loginType" // Group radio buttons together
            label="Login as Faculty"
            value ="faculty"
            {...register('loginType',{required:true})}
            aria-invalid={errors.loginType ? "true" : "false"}
            onClick={(e)=>{setLoginType(e.target.id)}}
        />
          </Form.Group>
          {errors.loginType && <span className="alert">Select any one login Type</span>}
            { loginType === "facultyLogin" && (
          <Form.Group  controlId="uniqueId" className="mb-4">
          <Form.Control
            required
            type="text"
            placeholder="Unique Id"
            minLength={8}
            {...register('uniqueId',{required:true})}
            aria-invalid={errors.uniqueId ? 'true' : 'false'}
          />
             {errors.uniqueId && (<span className="alert">Unique Id is Improtant</span>)}
          </Form.Group>
           )}  
            <div className="d-flex">
                <Button type="submit" variant="success">Login</Button>
                <Button type="reset" variant="danger" className="ms-auto">Cancel</Button>
            </div>
         </Form>
         <div className="container">
            <h6 className="text-center link" onClick={()=>navigate('/signup')}>New User? Sign Up</h6>
         </div>
    </div>
  );
}
