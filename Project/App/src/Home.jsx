import { useState, useEffect } from 'react'
import axios from "axios";
import { Dumbbell, Bus, Calendar, BookOpen, Search } from 'lucide-react'
import Feature from "./Feature.jsx"
import Header from "./Header.jsx"
import GymPage from "./GymPage.jsx"
import TravelPage from "./TravelPage.jsx"
import EventsPage from "./EventsPage.jsx"
import LibraryPage from "./LibraryPage.jsx"
import ProfilePage from "./ProfilePage.jsx"

function Home() {
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState([]);
  const [allUsers, setallUsers] = useState([]);


  useEffect(() => {
      axios.get("/api/get_users.php")
		.then(res => {
		  setallUsers(res.data);
          const storedUsername = localStorage.getItem("username");

          const target = allUsers.find(u => u.username === storedUsername);

          if (target) {
            setUser({ 
              username: target.username, 
              email: target.email 
            });
          }
      })
	  .catch(err => console.log(err));
  }, []);

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
        return <ProfilePage onBack={goBack} user={user} allUsers = {allUsers} />;
      default:
        // Main Home Dashboard
        return (
          <>
            <div className="hero-section">
              <h1 className="hero-title">Welcome back, {user.username}</h1>
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