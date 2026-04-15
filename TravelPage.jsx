import { useState, useEffect } from 'react';
import { fetchBusDepartures } from './services/transportService';
import { MapPin, Navigation, ExternalLink, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

// Component to dynamically update map center/zoom
function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

const campuses = [
  { 
    name: "City Campus", 
    coords: [52.585, -2.128], 
    query: "University+of+Wolverhampton+City+Campus+WV1+1LY", 
    desc: "Main hub: Wulfruna, Millennium City, Library",
    buildings: [
      { name: "Wulfruna Building (MA)", coords: [52.5852, -2.1282], query: "Wulfruna+Building+Wolverhampton", desc: "The historic main entrance and admin hub" },
      { name: "Millennium City Building (MC)", coords: [52.5863, -2.1275], query: "Millennium+City+Building+Wolverhampton", desc: "Main restaurant, social learning, lecture theatres" },
      { name: "Harrison Learning Centre (MD)", coords: [52.5859, -2.1285], query: "Harrison+Learning+Centre+Wolverhampton", desc: "The main 4-story university library" },
      { name: "Alan Turing Building (MI)", coords: [52.5868, -2.1270], query: "Alan+Turing+Building+Wolverhampton", desc: "Computing and IT services" },
      { name: "Lord Swraj Paul Building (MU)", coords: [52.5872, -2.1265], query: "Lord+Swraj+Paul+Building+Wolverhampton", desc: "The Wolverhampton Business School" },
      { name: "George Wallis Building (MK)", coords: [52.5855, -2.1290], query: "George+Wallis+Building+Wolverhampton", desc: "School of Art (Brutalist architecture)" },
      { name: "Mary Seacole Building (MH)", coords: [52.5845, -2.1285], query: "Mary+Seacole+Building+Wolverhampton", desc: "Faculty of Education, Health and Wellbeing" },
      { name: "Rosalind Franklin Building (MB)", coords: [52.5848, -2.1275], query: "Rosalind+Franklin+Building+Wolverhampton", desc: "Science and laboratory facilities" },
      { name: "The Arena Theatre", coords: [52.5842, -2.1260], query: "The+Arena+Theatre+Wolverhampton", desc: "Located on Wulfruna Street (WV1 1SE)" }
    ]
  },
  { 
    name: "Springfield Campus", 
    coords: [52.607, -2.133], 
    query: "University+of+Wolverhampton+Springfield+Campus+WV10+0JR", 
    desc: "Architecture and Built Environment",
    buildings: [
      { name: "School of Architecture and Built Environment (SOABE)", coords: [52.6075, -2.133], query: "SOABE+Wolverhampton", desc: "Architecture and Built Environment" },
      { name: "National Brownfield Institute", coords: [52.6065, -2.133], query: "National+Brownfield+Institute+Wolverhampton", desc: "World-class research centre" }
    ]
  },
  { 
    name: "Walsall Campus", 
    coords: [52.582, -1.977], 
    query: "University+of+Wolverhampton+Walsall+Campus+WS1+3BD", 
    desc: "Sports, Performing Arts, Education & Health",
    buildings: [
      { name: "Performance Hub (WH)", coords: [52.5825, -1.976], query: "Performance+Hub+Walsall+Campus", desc: "State-of-the-art music and drama studios" },
      { name: "WLV Gym & Sports Centre", coords: [52.5815, -1.978], query: "WLV+Gym+Walsall+Campus", desc: "Extensive indoor and outdoor sports facilities" },
      { name: "Sister Dora Building (WP)", coords: [52.582, -1.979], query: "Sister+Dora+Building+Walsall+Campus", desc: "Health and nursing facilities" }
    ]
  },
  { 
    name: "Telford Innovation Campus", 
    coords: [52.697, -2.457], 
    query: "University+of+Wolverhampton+Telford+Innovation+Campus+TF2+9NN", 
    desc: "Engineering and Technology hub",
    buildings: [
      { name: "Priorslee Hall", coords: [52.6975, -2.457], query: "Priorslee+Hall+Telford", desc: "The historic center of the campus" },
      { name: "Angad Paul Building (SA)", coords: [52.6965, -2.456], query: "Angad+Paul+Building+Telford", desc: "The main engineering and manufacturing hub" },
      { name: "e-Innovation Centre", coords: [52.697, -2.458], query: "e-Innovation+Centre+Telford", desc: "Business incubation and tech workspace" }
    ]
  },
  { 
    name: "Science Park", 
    coords: [52.623, -2.106], 
    query: "University+of+Wolverhampton+Science+Park+WV10+9RU", 
    desc: "Business support and creative industries"
  }
];

export default function TravelPage({ onBack }) {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [expandedCampus, setExpandedCampus] = useState(null);
  const [showBuildingsFilter, setShowBuildingsFilter] = useState(false);
  const [mapCenter, setMapCenter] = useState([52.63, -2.2]);
  const [mapZoom, setMapZoom] = useState(10);

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

  const openGoogleMaps = (query, e) => {
    if (e) e.stopPropagation();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, "_blank");
  };

  const handleToggleCampus = (idx, campus) => {
    if (expandedCampus === idx) {
      setExpandedCampus(null);
      setMapCenter([52.63, -2.2]);
      setMapZoom(10);
    } else {
      setExpandedCampus(idx);
      setMapCenter(campus.coords);
      setMapZoom(campus.buildings ? 17 : 14); // Zoom in closer if it has sub-buildings
      if (campus.buildings) {
        setShowBuildingsFilter(true);
      }
    }
  };

  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">Travel & Transport</h1>
      </div>

      <div className="section">
        <h2>Campus Locations & Directions</h2>
        <div className="journey-planner">
          <p className="journey-text" style={{ marginBottom: '1.5rem' }}>Select a campus to expand for more details, get directions, or view them on the interactive map.</p>
          
          <div className="campus-buttons" style={{ display: 'flex', gap: '10px', flexDirection: 'column', marginBottom: '2rem' }}>
            {campuses.map((campus, idx) => {
              const isExpanded = expandedCampus === idx;
              
              return (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                  <button 
                    className="action-btn outline" 
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', width: '100%', border: 'none', background: 'var(--bg-color)', cursor: 'pointer' }}
                    onClick={() => handleToggleCampus(idx, campus)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <MapPin size={18} />
                      <span style={{ fontWeight: '500' }}>{campus.name}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button 
                         onClick={(e) => openGoogleMaps(campus.query, e)}
                         style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--primary-color)', color: 'white', borderRadius: '4px', border: 'none', fontSize: '0.85rem', cursor: 'pointer' }}
                      >
                        Directions <ExternalLink size={14} />
                      </button>
                      {campus.buildings && (
                        <div style={{ color: '#64748b' }}>
                           {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      )}
                    </div>
                  </button>
                  
                  {/* Expanded Sub-buildings */}
                  {isExpanded && campus.buildings && (
                    <div style={{ padding: '0 16px 16px 16px', background: "var(--bg-color)", borderTop: '1px solid #e2e8f0' }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '12px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                        Click a building to navigate directly to it via Google Maps:
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                        {campus.buildings.map((b, bIdx) => (
                          <div key={bIdx} style={{ background: 'var(--background)', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                               <div style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-main)' }}>{b.name}</div>
                               <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{b.desc}</div>
                            </div>
                            <button 
                              onClick={(e) => openGoogleMaps(b.query, e)}
                              style={{ background: '#f1f5f9', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', padding: '8px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              title="Directions to Building"
                            >
                              <Navigation size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="map-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Interactive Map</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#475569', background: '#f8fafc', padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <input 
                  type="checkbox" 
                  checked={showBuildingsFilter} 
                  onChange={(e) => setShowBuildingsFilter(e.target.checked)} 
                />
                <Layers size={16} /> Show Specific Buildings
              </label>
            </div>
            
            <div className="map-container-wrapper" style={{ height: '400px' }}>
              <MapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', borderRadius: '12px', zIndex: 0 }}
              >
                <MapUpdater center={mapCenter} zoom={mapZoom} />
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
                
                {/* Main Campus Markers */}
                {campuses.map((campus, idx) => {
                  const hideMainMarker = showBuildingsFilter && campus.buildings && campus.buildings.length > 0;
                  if (hideMainMarker) return null;
                  
                  return (
                    <Marker key={`campus-${idx}`} position={campus.coords}>
                      <Popup>
                        <b style={{ fontSize: '1.05rem' }}>{campus.name}</b><br />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted, #666)', display: 'block', margin: '4px 0' }}>{campus.desc}</span>
                        <div style={{ marginTop: '8px' }}>
                          <button 
                            style={{ padding: '6px 12px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
                            onClick={(e) => openGoogleMaps(campus.query, e)}
                          >
                            <Navigation size={14} /> Navigate
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}

                {/* Sub-Building Markers */}
                {showBuildingsFilter && campuses.map(campus => 
                  campus.buildings && campus.buildings.map((b, bIdx) => (
                    <Marker key={`building-${campus.name}-${bIdx}`} position={b.coords}>
                      <Popup>
                        <b style={{ fontSize: '0.95rem', color: 'var(--primary-color)' }}>{b.name}</b><br />
                        <span style={{ fontSize: '0.8rem', color: '#666', display: 'block', margin: '2px 0' }}>{b.desc}</span>
                        <div style={{ marginTop: '6px' }}>
                          <button 
                            style={{ padding: '4px 10px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
                            onClick={(e) => openGoogleMaps(b.query, e)}
                          >
                            <Navigation size={12} /> Directions
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))
                )}
              </MapContainer>
            </div>
          </div>
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
