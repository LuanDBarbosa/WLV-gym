import { useState } from 'react'
import { Dumbbell, Bus, Calendar, BookOpen, Search } from 'lucide-react'
import Feature from "./Feature.jsx"
import Header from "./Header.jsx"
import GymPage from "./GymPage.jsx"
import TravelPage from "./TravelPage.jsx"
import EventsPage from "./EventsPage.jsx"
import LibraryPage from "./LibraryPage.jsx"

function App() {
  const [activePage, setActivePage] = useState("home");

  const goBack = () => setActivePage("home");

  // Conditional rendering for sub-pages
  if (activePage === "Gym") {
    return <GymPage onBack={goBack} />;
  }
  if (activePage === "Travel") {
    return <TravelPage onBack={goBack} />;
  }
  if (activePage === "Events") {
    return <EventsPage onBack={goBack} />;
  }
  if (activePage === "Library") {
    return <LibraryPage onBack={goBack} />;
  }

  return (
    <>
      <Header />
      
      <div className="hero-section">
        <h1 className="hero-title">Welcome back, John</h1>
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
  )
}

export default App