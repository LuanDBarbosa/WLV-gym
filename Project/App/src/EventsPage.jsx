import React, { useState } from 'react';

export default function EventsPage({ onBack }) {
  const allEvents = [
    {
      id: 1,
      title: "Freshers' Fair",
      date: "Mon, 23 Sep",
      time: "10:00 - 16:00",
      location: "Sports Hall",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      tag: "Social",
      description: "Join us for the biggest welcome event of the year. Discover societies, grab freebies, and meet new friends!"
    },
    {
      id: 2,
      title: "Academic Writing Workshop",
      date: "Wed, 25 Sep",
      time: "14:00 - 15:30",
      location: "Library Seminar Room",
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80",
      tag: "Academic",
      description: "Master the art of academic writing with our comprehensive workshop designed for all course levels."
    },
    {
      id: 3,
      title: "Comedy Night",
      date: "Fri, 27 Sep",
      time: "19:00 - 22:00",
      location: "Student Union Bar",
      image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
      tag: "Social",
      description: "Get ready to laugh out loud with our lineup of upcoming stand-up comedians. Drinks available at the bar."
    },
    {
      id: 4,
      title: "Varsity Rugby Match",
      date: "Sat, 28 Sep",
      time: "13:00 - 15:00",
      location: "Main Pitch",
      image: "https://images.unsplash.com/photo-1519315901367-f34f815049cf?w=800&q=80",
      tag: "Sports",
      description: "Support our university team in the biggest match of the term. Bring your colors and your voice!"
    },
    {
      id: 5,
      title: "Tech Networking Panel",
      date: "Thu, 3 Oct",
      time: "18:00 - 20:30",
      location: "Science Park Auditorium",
      image: "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=800&q=80",
      tag: "Career",
      description: "Meet industry leaders and alumni in tech. A great opportunity to secure placements and internships."
    },
    {
      id: 6,
      title: "Mindfulness Yoga",
      date: "Tue, 8 Oct",
      time: "08:00 - 09:00",
      location: "Dance Studio",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      tag: "Wellness",
      description: "Start your morning right with a guided yoga session. Mats provided, all levels welcome."
    }
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "Social", "Academic", "Sports", "Career", "Wellness"];

  const filteredEvents = activeFilter === "All" 
    ? allEvents 
    : allEvents.filter(event => event.tag === activeFilter);

  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">SU Events</h1>
      </div>

      <div className="filters">
        {filters.map(filter => (
          <button 
            key={filter} 
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {filteredEvents.map((event, index) => (
          <div key={event.id} className="event-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="event-image-container">
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-tag">{event.tag}</div>
            </div>
            
            <div className="event-details">
              <h3>{event.title}</h3>
              <p className="event-description">{event.description}</p>
              
              <div className="event-meta-group">
                <p className="event-meta">
                  <span>📅</span> {event.date} • {event.time}
                </p>
                <p className="event-meta">
                  <span>📍</span> {event.location}
                </p>
              </div>
              
              <button className="action-btn">Get Tickets</button>
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No events found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
