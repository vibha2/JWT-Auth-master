import React, {useState, useEffect} from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { Link, matchPath } from 'react-router-dom'

import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/userAuthSlice';


const Header = () => {

  const { token } = useSelector( (state) => state.auth );
  const { userInfo, userAccountType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logoutApi ] = useLogoutMutation();

  useEffect(()=> {
    if(userInfo)
    {
      
      console.log("data=> ", userAccountType?userAccountType:null);
    }
  }, []);

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
      <Navbar variant='dark' expand='lg' style={{ borderBottom: "1px solid #2C333F", backgroundColor: "#161D29"}} collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>MERN Auth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
             {/* {
              userAccountType && (
                <Link to="/memberlist" className='profileBtn'>
                          Item
                </Link>
              )
             } */}
            
              {userInfo ? (
                <>
                  {/* <NavDropdown title={userInfo.firstName} id='username'> */}
                    <div className='profileButton'>
                    {/* { userInfo?.accountType === "Admin" && (
                        <LinkContainer to='/admin' className='profileBtn'>
                          <NavDropdown.Item>Admin</NavDropdown.Item>
                        </LinkContainer>
                    )} */}

                    {
                      userAccountType === "Admin" && (
                        <LinkContainer to='/admin' className='profileBtn'>
                          <NavDropdown.Item>Admin</NavDropdown.Item>
                        </LinkContainer>
                      )
                    }

                    {
                      userAccountType && (
                        <LinkContainer to='/memberlist' className='profileBtn'>
                          <NavDropdown.Item>
                              Item
                          </NavDropdown.Item>
                        </LinkContainer>
                      )
                    }

                    {/* { userAccountType === "Member" && (
                        <LinkContainer to='/memberlist' className='profileBtn'>
                          <NavDropdown.Item>Item</NavDropdown.Item>
                        </LinkContainer>
                    )} */}
                    <LinkContainer to='/dashboard/my-profile' className='profileBtn'>
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