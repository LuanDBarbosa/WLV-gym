import { useState } from "react";
import { Book as BookIcon } from "lucide-react";

export default function LibraryPage({ onBack }) {
  const [activeGenre, setActiveGenre] = useState("All");

  const books = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", genre: "Computer Science", status: "Available" },
    { id: 2, title: "Introduction to Algorithms", author: "Thomas H. Cormen", genre: "Computer Science", status: "Available" },
    { id: 3, title: "Dune", author: "Frank Herbert", genre: "Fiction", status: "On Loan" },
    { id: 4, title: "The Martian", author: "Andy Weir", genre: "Fiction", status: "Available" },
    { id: 5, title: "1984", author: "George Orwell", genre: "Fiction", status: "Available" },
    { id: 6, title: "Calculus, 9th Edition", author: "James Stewart", genre: "Academic", status: "Reference" },
  ];

  const genres = ["All", "Computer Science", "Fiction", "Academic"];

  const filteredBooks = books.filter(book => activeGenre === "All" || book.genre === activeGenre);

  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">Harrison Library</h1>
        <span className="status-badge status-green">Open 24/7</span>
      </div>

      <div className="section">
        <div className="search-bar full-width">
          <span>🔍</span>
          <input type="text" className="search-input" placeholder="Search for books, journals, or articles..." />
        </div>
      </div>

      <div className="section">
        <h2>Live Availability</h2>
        <div className="availability-grid">
            <div className="avail-card">
                <h3>Silent Study (3rd Floor)</h3>
                <div className="progress-ring status-green">
                    <span>Low</span>
                    <small>Occupancy</small>
                </div>
            </div>
            <div className="avail-card">
                <h3>Group Rooms</h3>
                <div className="progress-ring status-red">
                    <span>Full</span>
                    <small>Occupancy</small>
                </div>
                <p className="avail-note">Next available: 14:00</p>
            </div>
            <div className="avail-card">
                <h3>PC Suites</h3>
                <div className="progress-ring status-amber">
                    <span>Busy</span>
                    <small>Occupancy</small>
                </div>
                <p className="avail-note">12 PCs available</p>
            </div>
        </div>
      </div>
      
      <div className="section mt-4">
        <h2>Book Catalogue</h2>
        <div className="filters">
          {genres.map(genre => (
            <button 
              key={genre}
              className={`filter-btn ${activeGenre === genre ? "active" : ""}`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        
        <div className="events-grid">
          {filteredBooks.map(book => (
            <div key={book.id} className="event-card">
               <div className="event-icon" style={{ height: "120px" }}>
                  <BookIcon size={48} color="var(--primary-color)" />
               </div>
               <div className="event-details" style={{ padding: "1.25rem" }}>
                  <span className="event-tag">{book.genre}</span>
                  <h3 style={{ margin: "0.5rem 0 0.25rem 0", fontSize: "1.1rem" }}>{book.title}</h3>
                  <p className="event-meta" style={{ marginBottom: "0.75rem" }}>{book.author}</p>
                  <span className={`status-badge ${book.status === 'Available' ? 'status-green' : book.status === 'Reference' ? 'status-amber' : 'status-red'}`}>
                    {book.status}
                  </span>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Quick Links</h2>
        <div className="quick-links">
            <button className="link-card">
                <span>💻</span>
                <span>Book a PC</span>
            </button>
            <button className="link-card">
                <span>📚</span>
                <span>My Loans</span>
            </button>
            <button className="link-card">
                <span>🖨️</span>
                <span>Print Credits</span>
            </button>
            <button className="link-card">
                <span>❓</span>
                <span>Ask a Librarian</span>
            </button>
        </div>
      </div>
    </div>
  );
}
