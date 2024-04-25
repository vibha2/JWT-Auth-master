import React from 'react'
import { NavLink } from 'react-router-dom';
import './Dashboard.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
            <NavLink to="/dashboard/my-profile" className="sidebarLinks" >
                My Profile
            </NavLink>
            <NavLink to="/dashboard/setting">
                Setting
            </NavLink>

    </div>
  )
}

export default Sidebar;
