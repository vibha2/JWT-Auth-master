import React from 'react'
import Sidebar from './Sidebar';
import './Dashboard.css';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='dashboardWrapper'>
     <Sidebar />
      <div className='dashboardContainer'>
            <div className='dashboardRightContainer'>
                <Outlet />
            </div>
      </div>
    </div>
  )
}

export default Dashboard;
