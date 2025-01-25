import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import PdfComp from "./PdfComp";
import { showToast } from "../ToastComponent";

export default function ModalViewer({ item }) {
  const { register, handleSubmit,reset } = useForm({});

  const sendData = async (data) => {
    try {
      let url = String(import.meta.env.VITE_API);
      url += "/setComment";

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );

      const response = await fetch(url,{
        method:'PATCH',
        headers:myHeaders,
        mode:'cors',
        body:JSON.stringify({
            comment:data.comment,
            id:item._id
        })
      });

      const json = await response.json();

      if(json.status){
        showToast(json.message,'success');
        reset();
      }else 
        showToast(json.message,'error');

    } catch (err) {
      console.log("ModelViewer Error", err);
    }
  };

  return (
    <div className="container">
      <Modal.Header closeButton>
        <Modal.Title>{item.courseTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <div className=".pdf-container">
          <PdfComp pdf={item.pdf} key={item._id} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Form onSubmit={handleSubmit(sendData)} style={{ width: "100%" }}>
          <Row className="w-100">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={2} {...register("comment")} />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Comment
            </Button>
          </Row>
        </Form>
      </Modal.Footer>
    </div>
  );
}
