import React, { Fragment, useContext, useEffect, useState } from "react";
import NavBar from "../Navbar";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import LoginState from "../../context/LoginState";
import LoginContext from "../../context/LoginContext";
import Modal from "react-bootstrap/Modal";
import ModalViewer from "./ModalViewer";

export default function ViewUploads() {
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    watch,
    reset,
  } = useForm({});

  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);

  const selectedYear = watch("year");
  const selectedSubjectName = watch("subjectName");

  useEffect(() => {
    if (selectedYear) {
      fetchSubjectName(selectedYear); // Call fetch function with the selected year
    }
  }, [selectedYear]);

  // To be done
  const submit = async (input) => {
    try {
      let url = String(import.meta.env.VITE_API);
      url += "/getUpload";

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );

      const response = await fetch(url, {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        body: JSON.stringify({
          subjectTitle: input.subjectTitle,
          subjectName: data[selectedSubjectName].subjectName,
        }),
      });

      const json = await response.json();

      setMainData(json.combinedData);
     
    } catch (err) {
      console.log("FetchSubjectName Error", err);
    }

  };

  const fetchSubjectName = async (year) => {
    try {
      let url = String(import.meta.env.VITE_COURSE);
      url += "/getsubjectname";

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );

      const response = await fetch(url, {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        body: JSON.stringify({ year }),
      });

      const json = await response.json();

      setData(json.result);

    } catch (err) {
      console.log("FetchSubjectName Error", err);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container-fluid">
      <NavBar />
      <h1 className="text-center">View Upload</h1>
      <div className="container-fluid">
        <Form onSubmit={handleSubmit(submit)}>
          <Row>
            <Col>
              <Form.Select aria-label="Select Year" {...register("year")}>
                <option>Select Year</option>
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Thrid Year</option>
                <option value="Fourth Year">Fourth Year</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Select Subject Name"
                {...register("subjectName")}
              >
                <option>Select Subject Name</option>
                {data &&
                  data.length > 0 &&
                  data.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item.subjectName}
                      </option>
                    );
                  })}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Select Subject Title"
                {...register("subjectTitle")}
              >
                <option>Select Subject Title</option>
                {selectedSubjectName !== null &&
                  data &&
                  data.length > 0 &&
                  data[selectedSubjectName] &&
                  data[selectedSubjectName].subjectTitle.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </Form.Select>
            </Col>
            <Col>
              <Button type="submit" variant="success">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="container-fluid mt-5">
        {mainData && mainData.length > 0 ? (
          <Table responsive className="table table-striped table-hover mt-2">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Research Paper Title</th>
                <th>Team Leader Name</th>
                <th>Team Members Name And PRN</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody className="table-group-divider mt-2">
              {mainData &&
                mainData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.courseTitle}</td>
                      <td>{item.name}</td>
                      <td>
                        {item.teamMembers.map((ele, pos) => {
                          return (
                            <Fragment key={pos}>
                              {ele.name}
                              &nbsp;
                              {ele.prn}
                              <br />
                              {item.teamMembers.length - 1 !== pos && (
                                <div
                                  style={{
                                    borderBottom: "1px solid #ddd",
                                    margin: "4px 0",
                                  }}
                                ></div>
                              )}
                            </Fragment>
                          );
                        })}
                      </td>
                      <td className="link-underline-primary">
                        <Button variant="primary" onClick={handleShow}>
                          {item.pdf}
                        </Button>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          fullscreen={true}
                          keyboard={false}
                        >
                          <ModalViewer item={item}/>
                        </Modal>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <h3 className="text-center mt-2">No Data Found</h3>
        )}

        {/* <Modal.Header closeButton> */}
        {/* <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
        {/* </Modal> */}
      </div>
    </div>
  );
}
