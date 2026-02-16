import { useState, useEffect } from 'react';
import { fetchBusDepartures, fetchJourneyOptions } from './services/transportService';
import { MapPin, Navigation, Clock, CreditCard } from 'lucide-react';

export default function TravelPage({ onBack }) {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [journeyOptions, setJourneyOptions] = useState(null);
  const [planningJourney, setPlanningJourney] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchBusDepartures();
        setDepartures(data);
      } catch (error) {
        console.error("Failed to load transport data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handlePlanJourney = () => {
    setPlanningJourney(true);
    setLocationError(null);
    setJourneyOptions(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setPlanningJourney(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const options = await fetchJourneyOptions(position.coords);
          setJourneyOptions(options);
        } catch (error) {
          setLocationError("Failed to calculate routes");
        } finally {
          setPlanningJourney(false);
        }
      },
      (error) => {
        setLocationError("Unable to retrieve your location");
        setPlanningJourney(false);
      }
    );
  };

  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">Travel & Transport</h1>
      </div>

      <div className="section">
        <h2>Plan Your Journey</h2>
        <div className="journey-planner">
          <p className="journey-text">Find the best route to campus from your current location.</p>
          
          {!journeyOptions && !planningJourney && (
            <button className="action-btn full-width" onClick={handlePlanJourney}>
              <MapPin size={18} style={{ marginRight: '8px' }} />
              Find Best Route
            </button>
          )}

          {planningJourney && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Acquiring location & calculating routes...</p>
            </div>
          )}

          {locationError && (
            <div className="error-message">
              ⚠️ {locationError}
            </div>
          )}

          {journeyOptions && (
            <div className="journey-options">
              {journeyOptions.map((option, index) => (
                <div key={index} className="journey-card">
                  <div className="journey-header">
                    <span className="journey-type">{option.provider}</span>
                    <span className="journey-label">{option.label}</span>
                  </div>
                  <div className="journey-details">
                    <div className="journey-stat">
                      <Clock size={16} />
                      <span>{option.duration}</span>
                    </div>
                    <div className="journey-stat">
                      <CreditCard size={16} />
                      <span>{option.cost}</span>
                    </div>
                  </div>
                  <div className="journey-times">
                    Departs {option.depart} • Arrives {option.arrive}
                  </div>
                  <button className="action-btn outline small">Select</button>
                </div>
              ))}
              <button className="text-btn" onClick={() => setJourneyOptions(null)}>Clear Search</button>
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <h2>Live Bus Departures</h2>
        
        {loading ? (
          <p className="loading-text">Loading live times...</p>
        ) : (
          departures.map(group => (
            <div key={group.id} className="transport-card">
              <div className="transport-header">
                <span>{group.name}</span>
                <span className={`status-badge status-${group.status === 'On Time' ? 'green' : 'amber'}`}>
                  {group.status}
                </span>
              </div>
              {group.departures.map((dep, index) => (
                <div key={index} className="departure-row">
                  <span className="route-number">{dep.route}</span>
                  <span className="destination">{dep.destination}</span>
                  <span className="time-due">{dep.due}</span>
                </div>
              ))}
            </div>
          ))
        )}

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




