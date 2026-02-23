function Header({ setActivePage, activePage }) {
  return (
    <header>
      <div className="header-left">
        <h1 onClick={() => setActivePage("home")} style={{cursor: 'pointer'}}>Student Hub</h1>
      </div>
      
      <nav className="nav-links">
        <button 
          className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => setActivePage("home")}
        >
          Home
        </button>
        <button 
          className={`nav-link ${activePage === 'Library' ? 'active' : ''}`}
          onClick={() => setActivePage("Library")}
        >
          Library
        </button>
        <button 
          className={`nav-link ${activePage === 'Gym' ? 'active' : ''}`}
          onClick={() => setActivePage("Gym")}
        >
          Gym
        </button>
      </nav>

      <div className="user-profile" onClick={() => setActivePage("Profile")} style={{cursor: 'pointer'}}>
        <span>John Doe</span>
        <div className="avatar">JD</div>
      </div>
    </header>
  )
}

export default Header