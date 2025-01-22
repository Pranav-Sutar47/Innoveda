import { useState } from "react"
import LoginContext from "./LoginContext"

export default function LoginState(props){
    const [logOut,setLogOut] = useState(false);
    const [showBtn, setShowBtn] = useState(true);
    const [user,setUser] = useState({});
    const [clientInfo,setClientInfo ] = useState({});

    const getClientInfo = async() =>{
        try{
            let url = String(import.meta.env.VITE_USER);
            url += '/getClientInfo';

            let myHeaders = new Headers();
            myHeaders.append('Content-Type','application/json');
            myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`);

            const response = await fetch(url,{
                method:'GET',
                mode:'cors',
                headers:myHeaders
            });

            const json = await response.json();
            
            if(json.status)
                setClientInfo(json.result);
            else
                setClientInfo(json.message,'danger');

        }catch(error){
            console.log(error);
        }
    }

    const getUser = async()=>{
        try{
            let url = String(import.meta.env.VITE_USER);
            url += '/getClient';
            let myHeaders = new Headers();
            myHeaders.append('Content-Type','application/json');

            myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`);
            const response = await fetch(url,{
                method:'GET',
                headers: myHeaders,
                mode:'cors'
            });

            const json = await response.json();
            if(json.status && json.switch === 1){
                // Extracting proper data
                const result = {...json.obj._doc,teamName:json.obj.teamName,classYear:json.obj.classYear,
                    subjects: Array.isArray(json.obj.subjects) ? json.obj.subjects.map(subject => ({
                        subjectName: subject.subjectName,
                        subjectTitle: subject.subjectTitle
                    })) : []
                };
                //console.log('result',result);
                //console.log(result.subjects);
                setUser(result);

            }else if(json.status && json.switch === 2){
                setUser(json.user);
            }
            else 
                setUser(json.message,'danger');
        }catch(err){
            console.log("Error at getUser()",err);
        }
    }

    return(
        <LoginContext.Provider value={{logOut,setLogOut,user,getUser,showBtn,setShowBtn,clientInfo,getClientInfo}}>
            {props.children}
        </LoginContext.Provider>
    )
}