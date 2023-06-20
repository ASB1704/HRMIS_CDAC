import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { SiFormstack } from 'react-icons/si'
import { FaChartLine } from 'react-icons/fa';
import '../../css/side-bar.css'

export const SideBar2 = () => {
  const [active, setActive] = useState('dashboard')

  return (
    <aside className='side-bar'>
      <Link className={`sidebar-item ${active === 'Dashboard' ? 'active' : ''}`} onClick={() => setActive('Dashboard')} to=''>
        <i><FaUserAlt /></i>
        <span>Dashboard</span>
      </Link>
      <Link className={`sidebar-item ${active === 'Forms' ? 'active' : ''}`} onClick={() => setActive('Forms')} to='forms'>
        <i><SiFormstack /></i>
        <span>Forms</span>
      </Link>
      <Link className={`sidebar-item ${active === 'Analytics' ? 'active' : ''}`} onClick={() => setActive('Analytics')} to='Analytics'>
        <i> <FaChartLine /> </i>
        <span>Analytics</span>
      </Link>
    </aside>
  )
}
