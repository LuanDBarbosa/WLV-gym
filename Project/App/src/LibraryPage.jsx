import { useState } from "react";
import { Book as BookIcon, Search, Users, Laptop, Coffee, HelpCircle, FileText, Printer, ChevronLeft } from "lucide-react";

export default function LibraryPage({ onBack }) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const books = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", genre: "Computer Science", status: "Available" },
    { id: 2, title: "Introduction to Algorithms", author: "Thomas H. Cormen", genre: "Computer Science", status: "Available" },
    { id: 3, title: "Dune", author: "Frank Herbert", genre: "Fiction", status: "On Loan" },
    { id: 4, title: "The Martian", author: "Andy Weir", genre: "Fiction", status: "Available" },
    { id: 5, title: "1984", author: "George Orwell", genre: "Fiction", status: "Available" },
    { id: 6, title: "Calculus, 9th Edition", author: "James Stewart", genre: "Academic", status: "Reference" },
  ];

  const genres = ["All", "Computer Science", "Fiction", "Academic"];

  const filteredBooks = books.filter(book => 
    (activeGenre === "All" || book.genre === activeGenre) && 
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     book.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="sub-page-container" style={{ maxWidth: '1000px' }}>
      <button className="back-btn" onClick={onBack} style={{ marginBottom: '1rem' }}>← Back to Hub</button>

      <div className="lib-hero">
        <div className="lib-hero-content">
          <div className="lib-title-row">
            <h1>Harrison Library</h1>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '600', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', gap: '6px' }}>
               <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span> Open 24/7
            </span>
          </div>
          <div className="lib-search-container">
            <Search size={20} color="rgba(255, 255, 255, 0.7)" />
            <input 
              type="text" 
              className="lib-search-input" 
              placeholder="Search for books, journals, or articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: '#0f172a' }}>Live Space Availability</h2>
      <div className="lib-avail-grid">
        <div className="lib-avail-card">
          <div className="lib-avail-icon"><Coffee size={24}/></div>
          <div className="lib-avail-info">
            <h3>Silent Study</h3>
            <p>3rd Floor • Quiet Zone</p>
            <div className="lib-avail-bar-bg"><div className="lib-avail-bar-fill" style={{ width: '25%', background: '#10b981' }}></div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: '#10b981', fontWeight: '600'}}>
               <span>Low Occupancy</span>
               <span>25%</span>
            </div>
          </div>
        </div>
        
        <div className="lib-avail-card">
          <div className="lib-avail-icon"><Users size={24}/></div>
          <div className="lib-avail-info">
            <h3>Group Rooms</h3>
            <p>Ground Floor</p>
            <div className="lib-avail-bar-bg"><div className="lib-avail-bar-fill" style={{ width: '95%', background: '#ef4444' }}></div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: '#ef4444', fontWeight: '600'}}>
               <span>Full</span>
               <span>Next: 14:00</span>
            </div>
          </div>
        </div>

        <div className="lib-avail-card">
          <div className="lib-avail-icon"><Laptop size={24}/></div>
          <div className="lib-avail-info">
            <h3>PC Suites</h3>
            <p>1st & 2nd Floor</p>
            <div className="lib-avail-bar-bg"><div className="lib-avail-bar-fill" style={{ width: '70%', background: '#f59e0b' }}></div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: '#d97706', fontWeight: '600'}}>
               <span>Busy</span>
               <span>12 available</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--text-main)' }}>Book Catalogue</h2>
        <div className="filters" style={{ margin: 0, padding: 0 }}>
          {genres.map(genre => (
            <button key={genre} className={`filter-btn ${activeGenre === genre ? "active" : ""}`} onClick={() => setActiveGenre(genre)}>
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="lib-book-grid" style={{ marginBottom: '4rem' }}>
        {filteredBooks.map(book => (
          <div key={book.id} className="lib-book-card">
             <div className="lib-book-cover">
                <BookIcon size={56} strokeWidth={1.5} />
             </div>
             <div className="lib-book-details">
                <span className="lib-book-tag">{book.genre}</span>
                <h3 className="lib-book-title">{book.title}</h3>
                <p className="lib-book-author">{book.author}</p>
                <div className={`lib-status ${book.status === 'Available' ? 'available' : book.status === 'Reference' ? 'ref' : 'loan'}`}>
                  <div className="lib-status-dot"></div>
                  {book.status}
                </div>
             </div>
          </div>
        ))}
        {filteredBooks.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b', background: '#f8fafc', borderRadius: '1rem', border: '1px dashed #cbd5e1' }}>
            <BookIcon size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
            <p style={{ fontSize: '1.1rem', margin: 0 }}>No books found matching your search.</p>
          </div>
        )}
      </div>

      <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: '#0f172a' }}>Quick Links</h2>
      <div className="lib-quick-grid">
         <button className="lib-quick-btn">
             <Laptop size={28}/>
             <span>Book a PC</span>
         </button>
         <button className="lib-quick-btn">
             <FileText size={28}/>
             <span>My Loans</span>
         </button>
         <button className="lib-quick-btn">
             <Printer size={28}/>
             <span>Print Credits</span>
         </button>
         <button className="lib-quick-btn">
             <HelpCircle size={28}/>
             <span>Ask a Librarian</span>
         </button>
      </div>
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
