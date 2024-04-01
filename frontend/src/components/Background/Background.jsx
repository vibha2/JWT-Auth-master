import React from 'react';
import './Background.css';
import { useSelector } from 'react-redux';


function Background() {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      { userInfo? (
        <div className='userBackground'>
          <div className='userContainer'>
            <h2>{`Welcome to ${ userInfo?.accountType} User Home Page`}</h2>
          </div>
        </div>
      )
      :(
        <div className="backgroundBody">
        <h2>Authentication with JWT</h2>
        <p>
        Empower your application with secure and seamless authentication solutions, all crafted with React at the core. Dive into a world where user authentication meets elegant user interfaces, making your application experience both intuitive and secure.
        </p>
    </div>
      )}
    </>
    
  )
}

export default Background