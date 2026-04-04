import { useState, useEffect } from 'react';
import { fetchBusDepartures, fetchJourneyOptions } from './services/transportService';
import { MapPin, Navigation, Clock, CreditCard, Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet default marker icons in React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function TravelPage({ onBack }) {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [journeyOptions, setJourneyOptions] = useState(null);
  const [planningJourney, setPlanningJourney] = useState(false);
  const [locationError, setLocationError] = useState(null);
  
  // Map and Location States
  const [locationInput, setLocationInput] = useState("");
  const [userCoords, setUserCoords] = useState(null);
  const campusCoords = [52.5880528, -2.1274831]; // Approx WLV Campus Coordinates

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

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSearchLocation = async () => {
    if (!locationInput.trim()) return;
    
    setPlanningJourney(true);
    setLocationError(null);
    setJourneyOptions(null);

    const coords = await geocodeAddress(locationInput);
    if (coords) {
      setUserCoords(coords);
      try {
        const options = await fetchJourneyOptions({ latitude: coords[0], longitude: coords[1] });
        setJourneyOptions(options);
      } catch (error) {
        setLocationError("Failed to calculate routes");
      }
    } else {
      setLocationError("Could not find that location. Try specifying a city or postcode.");
    }
    setPlanningJourney(false);
  };

  const handleGPSJourney = () => {
    setPlanningJourney(true);
    setLocationError(null);
    setJourneyOptions(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser. Please type your location.");
      setPlanningJourney(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        setUserCoords(coords);
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
        setLocationError("Unable to retrieve your location. Please type it in.");
        setPlanningJourney(false);
      },
      { timeout: 10000 }
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
          <p className="journey-text">Find the best route to campus from your current location, or type an address.</p>
          
          <div className="location-input-group">
            <input 
              type="text" 
              placeholder="e.g. Birmingham New Street" 
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchLocation()}
            />
            <button className="action-btn" onClick={handleSearchLocation} disabled={planningJourney}>
              <Search size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', color: 'var(--text-muted)' }}>
            <hr style={{ flex: 1, borderTop: '1px solid #e2e8f0', display: 'block' }} />
            <span style={{ padding: '0 1rem', fontSize: '0.9rem' }}>OR</span>
            <hr style={{ flex: 1, borderTop: '1px solid #e2e8f0', display: 'block' }} />
          </div>

          <button className="action-btn full-width outline" onClick={handleGPSJourney} disabled={planningJourney}>
            <Navigation size={18} style={{ marginRight: '8px' }} />
            Use My Current Location
          </button>

          {planningJourney && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Locating & calculating routes...</p>
            </div>
          )}

          {locationError && (
            <div className="error-message">
              ⚠️ {locationError}
            </div>
          )}

          {/* Interactive Map Section */}
          {(userCoords || !locationError) && (
            <div className="map-section">
              <div className="map-container-wrapper">
                <MapContainer 
                  center={userCoords || campusCoords} 
                  zoom={userCoords ? 11 : 14} 
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                  />
                  {/* Campus Pin */}
                  <Marker position={campusCoords}>
                    <Popup>
                      <b>WLV Campus</b><br />Destination
                    </Popup>
                  </Marker>
                  {/* User Pin */}
                  {userCoords && (
                    <>
                      <Marker position={userCoords}>
                        <Popup>Your Location</Popup>
                      </Marker>
                      <Polyline 
                        positions={[userCoords, campusCoords]} 
                        color="var(--primary-color)" 
                        weight={4}
                        dashArray="5, 10"
                      />
                    </>
                  )}
                </MapContainer>
              </div>
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
              <button className="text-btn" onClick={() => { setJourneyOptions(null); setUserCoords(null); }}>Clear Search</button>
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




