import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { showToast } from './ToastComponent';
import Button from 'react-bootstrap/Button';
import LoginContext from '../context/LoginContext';
import { Link } from 'react-router-dom';

function NavBar() {

  const {logOut,setLogOut} = useContext(LoginContext);
  const [display,setDisplay] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      setLogOut(true)
      setDisplay(true);
    }else{
      setLogOut(false);
      setDisplay(false);
    }
  },[setDisplay,logOut])

  const handleLogOut = ()=>{
    console.log('alo')
    setLogOut(false);
    localStorage.clear();
    setDisplay(false);
    showToast("Log Out Successful !",'success');
    navigate('/login');
  }

    return(
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
            {
              display && 
            <Button variant='outline-danger' onClick={handleLogOut}>Log Out</Button>
            }
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
  )
}
export default NavBar;
