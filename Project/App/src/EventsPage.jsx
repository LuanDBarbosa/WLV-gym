export default function EventsPage({ onBack }) {
  const events = [
    {
      id: 1,
      title: "Freshers' Fair",
      date: "Mon, 23 Sep",
      time: "10:00 - 16:00",
      location: "Sports Hall",
      image: "🎉", 
      tag: "Social"
    },
    {
      id: 2,
      title: "Academic Writing Workshop",
      date: "Wed, 25 Sep",
      time: "14:00 - 15:30",
      location: "Library Seminar Room",
      image: "📝",
      tag: "Academic"
    },
    {
      id: 3,
      title: "Comedy Night",
      date: "Fri, 27 Sep",
      time: "19:00 - 22:00",
      location: "Student Union Bar",
      image: "🎤",
      tag: "Social"
    },
    {
      id: 4,
      title: "Varsity Rugby Match",
      date: "Sat, 28 Sep",
      time: "13:00 - 15:00",
      location: "Main Pitch",
      image: "🏉",
      tag: "Sports"
    }
  ];

  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">SU Events</h1>
      </div>

      <div className="filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Social</button>
        <button className="filter-btn">Academic</button>
        <button className="filter-btn">Sports</button>
      </div>

      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-icon">{event.image}</div>
            <div className="event-details">
              <span className="event-tag">{event.tag}</span>
              <h3>{event.title}</h3>
              <p className="event-meta">📅 {event.date} • ⏰ {event.time}</p>
              <p className="event-meta">📍 {event.location}</p>
              <button className="action-btn outline">Get Tickets</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
