export default function TravelPage({ onBack }) {
  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">Travel & Transport</h1>
      </div>

      <div className="section">
        <h2>Live Bus Departures</h2>
        <div className="transport-card">
          <div className="transport-header">
            <span>Campus Shuttle</span>
            <span className="status-badge status-green">On Time</span>
          </div>
          <div className="departure-row">
            <span className="route-number">U1</span>
            <span className="destination">City Campus</span>
            <span className="time-due">5 mins</span>
          </div>
          <div className="departure-row">
            <span className="route-number">U1</span>
            <span className="destination">Walsall Campus</span>
            <span className="time-due">20 mins</span>
          </div>
        </div>

        <div className="transport-card">
          <div className="transport-header">
            <span>Public Bus</span>
            <span className="status-badge status-amber">Delayed</span>
          </div>
          <div className="departure-row">
            <span className="route-number">529</span>
            <span className="destination">Wolverhampton</span>
            <span className="time-due">12 mins</span>
          </div>
          <div className="departure-row">
            <span className="route-number">1</span>
            <span className="destination">Dudley</span>
            <span className="time-due">18 mins</span>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Campus Parking</h2>
        <div className="parking-grid">
          <div className="parking-spot">
            <h3>North Car Park</h3>
            <div className="parking-status available">
              <span className="count">45</span>
              <span>Spaces</span>
            </div>
          </div>
          <div className="parking-spot">
            <h3>South Car Park</h3>
            <div className="parking-status limited">
              <span className="count">8</span>
              <span>Spaces</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
