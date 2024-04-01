import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.css';

import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/userAuthSlice';


const Header = () => {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logoutApi ] = useLogoutMutation();

  const logoutHandler = async() => {
    try{
      await logoutApi().unwrap();
      dispatch(logout());
      navigate('/login');
    }catch(err){
      console.error(err);
    }
   
  }

  return (
<header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>MERN Auth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            
              {userInfo ? (
                <>
                  {/* <NavDropdown title={userInfo.firstName} id='username'> */}
                    <div className='profileButton'>
                    { userInfo?.accountType === "Admin" && (
                        <LinkContainer to='/admin' className='profileBtn'>
                          <NavDropdown.Item>Admin</NavDropdown.Item>
                        </LinkContainer>
                    )}

                    { userInfo?.accountType === "Member" && (
                        <LinkContainer to='/memberlist' className='profileBtn'>
                          <NavDropdown.Item>Item</NavDropdown.Item>
                        </LinkContainer>
                    )}
                    <LinkContainer to='/profile' className='profileBtn'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler} className='logoutBtn'>
                      Logout
                    </NavDropdown.Item>
                    </div>
                  {/* </NavDropdown> */}
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt />
                       Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt />
                       Signup
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header