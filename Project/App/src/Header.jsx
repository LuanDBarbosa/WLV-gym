import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import icon from "./assets/Icon.png"
function Header({ setActivePage, activePage, user }) {
  const displayUser = user?.username || "Guest";
  const initials = displayUser.charAt(0).toUpperCase();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="header-left">
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      <div onClick={() => setActivePage("home")} style={{ display: 'flex', alignItems: 'center', position: 'fixed', paddingBottom:'8px', left:'10px', cursor: 'pointer'}}>
          <div className="logo-icon">
            <img src={icon} alt="Icon" style={{ width: '50px', paddingTop: '8px'}} />
          </div>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '6px' }}>
            <h1 style={{ 
              color: 'var(--primary-color)', 
              fontSize: '30px', 
              margin: 0, 
              borderBottom: '1px solid var(--text-main)',
              fontFamily: 'serif' 
            }}>
              WLV
            </h1>
            <p style={{ 
              color: 'var(--primary-color)', 
              fontSize: '14px', 
              paddingTop: '2px',
              letterSpacing: '4px', 
              margin: 0, 
              fontWeight: 'bold' 
            }}>
              STUDENT HUB
            </p>
        </div>
      </div>
      </div>
      
      <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}  style={{paddingLeft: '95px'}}>
        <div className="mobile-sidebar-header">
          <h2>Menu</h2>
          <button 
            className="mobile-close-btn" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>
        <button 
          className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => handleNavClick("home")}
        >
          Home
        </button>
        <button 
          className={`nav-link ${activePage === 'Library' ? 'active' : ''}`}
          onClick={() => handleNavClick("Library")}
        >
          Library
        </button>
        <button 
          className={`nav-link ${activePage === 'Gym' ? 'active' : ''}`}
          onClick={() => handleNavClick("Gym")}
        >
          Gym
        </button>
      </nav>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <div className="user-profile" onClick={() => handleNavClick("Profile")} style={{cursor: 'pointer'}}>
        <span className="user-name-desktop">{displayUser}</span>
        <div className="avatar">{initials}</div>
      </div>
    </header>
  )
}

export default Header