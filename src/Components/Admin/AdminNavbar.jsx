import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../ToastComponent';


export default function AdminNavbar() {

    const navigate  = useNavigate();

    const handleLogOut = ()=>{
        showToast('Logout successful','success');
        navigate('/login');
    }

  return (
<Navbar expand={false} className="bg-body-tertiary mb-3">
    <Container fluid>
      <Navbar.Brand as={Link} to="/">Innoveda</Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-false`}
        aria-labelledby={`offcanvasNavbarLabel-expand-false`}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
            Innoveda
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link as={Link} to="/userHome">Home</Nav.Link>
            <Nav.Link as={Link} to="/useruploads">Uploads</Nav.Link>
            <Button variant='outline-danger' onClick={handleLogOut}>Log Out</Button>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
  )
}
