import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Header({ setActivePage, activePage, user }) {
  const displayUser = user?.username || "Guest";
  const initials = displayUser.charAt(0).toUpperCase();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false); // Close sidebar on navigation
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
        <h1 onClick={() => handleNavClick("home")} style={{cursor: 'pointer'}}>Student Hub</h1>
      </div>
      
      <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
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