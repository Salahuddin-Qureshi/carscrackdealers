import React, { useState } from 'react';
import Sidebar from './Sidebar';
import NotificationBell from './NotificationBell';
import companyLogo from '../assets/images/company-logo-black.png';
import '../styles/Layout.css';

const Layout = ({ children, title = "Page Title" }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="layout-container">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`layout-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Header */}
        <header className="layout-header">
          <div className="header-left">
            <img src={companyLogo} alt="Logo" className="header-logo" />
            <h1 className="header-title">{title}</h1>
          </div>
          <div className="header-right">
            <NotificationBell />
          </div>
        </header>

        {/* Main Content */}
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
