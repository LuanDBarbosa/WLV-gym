import { useState, useEffect } from 'react'
import axios from "axios";
import { Dumbbell, Bus, Calendar, BookOpen, Search, Newspaper, PlayCircle, ChevronRight } from 'lucide-react'
import Feature from "./Feature.jsx"
import Header from "./Header.jsx"
import GymPage from "./GymPage.jsx"
import TravelPage from "./TravelPage.jsx"
import EventsPage from "./EventsPage.jsx"
import LibraryPage from "./LibraryPage.jsx"
import ProfilePage from "./ProfilePage.jsx"
import NewsMediaPage from "./NewsMediaPage.jsx"
import { useNavigate } from 'react-router-dom';
function Home() {
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const User = JSON.parse(sessionStorage.getItem('user'));
      if(!User){
        // navigate('/Login');
      }else {
        axios.get("/api/get_users.php")
        .then(res => {
             const storedUsername = localStorage.getItem("username");
             const target = res.data.find(u => u.username === storedUsername);
             setAllUsers(res.data);
             if (target) {
                   setUser({ 
                       username: target.username,
                       course: target.course,
                       email: target.email
                   })
             }
             setIsLoading(false);

        })
        .catch(err => {
            console.log(err);
        });

      }
  }, [navigate]);

  if(!isLoading){
    return null;
  } 

  const goBack = () => setActivePage("home");

  const renderContent = () => {
    switch (activePage) {
      case "Gym":
        return <GymPage onBack={goBack} />;
      case "Travel":
        return <TravelPage onBack={goBack} />;
      case "Events":
        return <EventsPage onBack={goBack} />;
      case "Library":
        return <LibraryPage onBack={goBack} />;
      case "Profile":
        return <ProfilePage onBack={goBack} user={user} allUsers = {allUsers}/>;
      case "News":
        return <NewsMediaPage onBack={goBack} />;
      default:
        // Main Home Dashboard
        return (
          <>
            <div className="hero-section">
              <h1 className="hero-title">Welcome back, {user.username || 'student'}</h1>
              <p className="hero-subtitle">What would you like to do today?</p>

              <div className="search-bar">
                <Search size={20} color="#64748b" />
                <input type="text" className="search-input" placeholder="Search for events, gym classes, or books..." />
              </div>
            </div>

            <main className="features-container">
              <div className="feature-wrapper" onClick={() => setActivePage("Gym")}>
                <Feature icon={Dumbbell} title="WLV Gym" info="Open Now • 25% Capacity" />
              </div>
              <div className="feature-wrapper" onClick={() => setActivePage("Travel")}>
                <Feature icon={Bus} title="Travel" info="Next Bus: 12 mins" />
              </div>
              <div className="feature-wrapper" onClick={() => setActivePage("Events")}>
                <Feature icon={Calendar} title="SU Events" info="3 Events Today" />
              </div>
              <div className="feature-wrapper" onClick={() => setActivePage("Library")}>
                <Feature icon={BookOpen} title="Library" info="Status: Quiet • 3rd Floor" />
              </div>
            </main>

            {/* Highlighted News Section */}
            <div className="highlighted-news" style={{ marginTop: '3rem', padding: '0 1.5rem', maxWidth: '1200px', margin: '3rem auto 0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.3rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                  <Newspaper size={22} color="var(--primary-color)" /> News & Media
                </h2>
                <button className="text-btn" onClick={() => setActivePage("News")} style={{ padding: 0, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                  See All <ChevronRight size={18} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* News Card 1 */}
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} onClick={() => setActivePage("News")}>
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" alt="News" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>Achievement</span>
                    <h3 style={{ margin: '12px 0 0 0', fontSize: '1.1rem', lineHeight: '1.4', color: '#0f172a' }}>WLV Students win National Design Award</h3>
                  </div>
                </div>

                {/* News Card 2 - Video Style */}
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} onClick={() => setActivePage("News")}>
                  <div style={{ height: '180px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Lab Opening" />
                    <PlayCircle size={48} color="white" style={{ position: 'absolute' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#e11d48', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', background: '#fff1f2', padding: '4px 8px', borderRadius: '4px' }}>Campus Update</span>
                    <h3 style={{ margin: '12px 0 0 0', fontSize: '1.1rem', lineHeight: '1.4', color: '#0f172a' }}>New Engineering Lab Grand Opening</h3>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ height: '60px' }}></div>
          </>
        );
    }
  };

  return (
    <>
      <Header setActivePage={setActivePage} activePage={activePage} user={user} />
      {renderContent()}
    </>
  )
}

export default Home