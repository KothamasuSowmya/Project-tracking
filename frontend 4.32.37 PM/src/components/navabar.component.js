import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import { Button } from '@mui/material';

const Navbar1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn && !isLoginPage() && !isRegisterPage()) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/login');
  };

  const isLoginPage = () => {
    return window.location.pathname === '/login';
  };

  const isRegisterPage = () => {
    return window.location.pathname === '/';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="p-2">
      <Container fluid>
        <Navbar.Brand as={Link} to="/exerciselist">
        <div style={{ fontSize: '20px',color:'white' }}>ETW</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
           
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/exerciselist">
                    <div style={{ fontSize: '1.1rem',color:'white' }}> All Exercises</div>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/create">
                    <div style={{ fontSize: '1.1rem' ,color:'white'}}>CreateExercises</div>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/user">
                    <div style={{ fontSize: '1.1rem',color:'white' }}>CreateUser</div>
                  </Nav.Link>
                  
                </>
              )}
          
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                  Register
                </Nav.Link>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleLogout}
                color="primary"
                sx={{
                  color: 'black',
                  bgcolor: 'white',
                  '&:hover': {
                    bgcolor: 'white',
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
