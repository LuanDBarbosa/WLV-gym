export default function LibraryPage({ onBack }) {
  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">Harrison Library</h1>
        <span className="status-badge status-green">Open 24/7</span>
      </div>

      <div className="section">
        <div className="search-bar full-width">
          <span>🔍</span>
          <input type="text" className="search-input" placeholder="Search for books, journals, or articles..." />
        </div>
      </div>

      <div className="section">
        <h2>Live Availability</h2>
        <div className="availability-grid">
            <div className="avail-card">
                <h3>Silent Study (3rd Floor)</h3>
                <div className="progress-ring status-green">
                    <span>Low</span>
                    <small>Occupancy</small>
                </div>
            </div>
            <div className="avail-card">
                <h3>Group Rooms</h3>
                <div className="progress-ring status-red">
                    <span>Full</span>
                    <small>Occupancy</small>
                </div>
                <p className="avail-note">Next available: 14:00</p>
            </div>
            <div className="avail-card">
                <h3>PC Suites</h3>
                <div className="progress-ring status-amber">
                    <span>Busy</span>
                    <small>Occupancy</small>
                </div>
                <p className="avail-note">12 PCs available</p>
            </div>
        </div>
      </div>

      <div className="section">
        <h2>Quick Links</h2>
        <div className="quick-links">
            <button className="link-card">
                <span>💻</span>
                <span>Book a PC</span>
            </button>
            <button className="link-card">
                <span>📚</span>
                <span>My Loans</span>
            </button>
            <button className="link-card">
                <span>🖨️</span>
                <span>Print Credits</span>
            </button>
            <button className="link-card">
                <span>❓</span>
                <span>Ask a Librarian</span>
            </button>
        </div>
      </div>
    </div>
  );
}
