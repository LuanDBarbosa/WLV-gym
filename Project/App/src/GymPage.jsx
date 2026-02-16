export default function GymPage({ onBack }) {
  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">WLV Gym</h1>
        <span className="status-badge status-green">Open Now</span>
      </div>

      <div className="occupancy-meter">
        <div className="meter-label">
          <span>Current Capacity</span>
          <span>25%</span>
        </div>
        <div className="meter-bar">
          <div className="meter-fill" style={{ width: '25%' }}></div>
        </div>
        <p className="meter-text">Plenty of space available.</p>
      </div>

      <div className="section">
        <h2>Today's Classes</h2>
        <div className="class-list">
          <div className="class-item">
            <div className="class-time">10:00</div>
            <div className="class-info">
              <h3>Yoga Flow</h3>
              <p>Studio A • Sarah J.</p>
            </div>
            <button className="action-btn">Book</button>
          </div>
          <div className="class-item">
            <div className="class-time">12:30</div>
            <div className="class-info">
              <h3>HIIT Blast</h3>
              <p>Studio B • Mike T.</p>
            </div>
            <button className="action-btn">Book</button>
          </div>
          <div className="class-item">
            <div className="class-time">17:00</div>
            <div className="class-info">
              <h3>Spin Cycle</h3>
              <p>Cycle Room • Jenny W.</p>
            </div>
            <div className="status-full">Full</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Opening Hours</h2>
        <table className="info-table">
          <tbody>
            <tr>
              <td>Monday - Friday</td>
              <td>06:30 - 22:00</td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>08:00 - 20:00</td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td>08:00 - 18:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
