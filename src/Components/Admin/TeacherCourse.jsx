import React, { Fragment, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

export default function TeacherCourse() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {

    const fetchData = async()=>{
        try {
            setShow(true);
            let url = String(import.meta.env.VITE_COURSE);
            url += "/getCourse";
      
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append(
              "Authorization",
              `Bearer ${localStorage.getItem("token")}`
            );
      
            const response = await fetch(url, {
              headers: myHeaders,
            });
      
            const json = await response.json();
      
            if (json.status && json.result.length > 0) {
              setData(json.result);
            } else {
              setData([]);
            }
            setShow(false);
        } catch (err) {
            console.log("Error at Teacher Course", err);
        }
    }

    fetchData();
  }, []);

  return (
    <div className="container-fluid mt-5">
      <h2 className="text-center">Your Courses</h2>
      {setShow === true ? (
        <Spinner animation="border" variant="success" />
      ) : (
        <>
        {
            data && data.length > 0 ?
            (
            <Table responsive className="table table-striped table-hover mt-2">
            <thead>
              <tr>
                <th>Sr No.</th>

                <th>Year</th>
                <th>Subject Name</th>
                <th>Subject Title</th>
              </tr>
            </thead>
            <tbody className="table-group-divider mt-2">
              {
                data.map((item,index)=>{
                    return (                            
                        <tr key={index}>
                            <td>{index+1}</td>
                            
                                <td>{item.year}</td>
                                <td>{item.subjectName}</td>
                                <td>{
                                        item.subjectTitle.map((ele,pos)=> {return(
                                            <Fragment key={pos}>
                                                {ele}
                                                <br/>
                                                {
                                                item.subjectTitle.length-1 !== pos &&
                                                <div style={{ borderBottom: "1px solid #ddd", margin: "4px 0" }}></div>
                                                }
                                            </Fragment>
                                        )})
                                    }</td>
                        </tr>
                    )
                })
              }
            </tbody>
          </Table>
            ):(
                <h3 className="text-center">No Course Added</h3>
            )
        }
        </>
      )}
    </div>
  );
}
