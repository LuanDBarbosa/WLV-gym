import { Instagram, Twitter, Youtube, ExternalLink, Newspaper, Video, Globe } from 'lucide-react';

export default function NewsMediaPage({ onBack }) {
  const newsItems = [
    { title: "WLV Students win National Design Award for Architecture App", date: "April 5, 2026", category: "Achievement", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" },
    { title: "New Engineering Lab opens at Telford Innovation Campus", date: "April 2, 2026", category: "Campus Update", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" },
    { title: "Spring Sports Tournament Highlights at Walsall Campus", date: "March 28, 2026", category: "Sports", image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=600" },
    { title: "University announces new partnerships with global tech firms", date: "March 20, 2026", category: "Partnership", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">News & Media</h1>
      </div>

      <div className="section">
        <h2>Official Social Channels</h2>
        <p className="journey-text" style={{ marginBottom: '1.5rem' }}>Connect with the University of Wolverhampton on our official channels to stay up to date!</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '30px' }}>
          <a href="https://www.instagram.com/uniwolverhampton/" target="_blank" rel="noreferrer" className="action-btn outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px', textDecoration: 'none', color: 'inherit', padding: '16px', background: 'white' }}>
            <div style={{ background: '#fdf2f8', padding: '10px', borderRadius: '8px' }}>
              <Instagram color="#E1306C" size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: '600' }}>Instagram</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>@uniwolverhampton</span>
            </div>
          </a>
          
          <a href="https://twitter.com/wlvuni" target="_blank" rel="noreferrer" className="action-btn outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px', textDecoration: 'none', color: 'inherit', padding: '16px', background: 'white' }}>
            <div style={{ background: '#f0f9ff', padding: '10px', borderRadius: '8px' }}>
              <Twitter color="#1DA1F2" size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: '600' }}>X (Twitter)</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>@wlvuni</span>
            </div>
          </a>
          
          <a href="https://www.youtube.com/user/uniwolverhampton" target="_blank" rel="noreferrer" className="action-btn outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px', textDecoration: 'none', color: 'inherit', padding: '16px', background: 'white' }}>
            <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '8px' }}>
              <Youtube color="#FF0000" size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: '600' }}>YouTube</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>University Channel</span>
            </div>
          </a>
        </div>
      </div>

      <div className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Featured Media</h2>
          <Video size={20} color="#64748b" />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <iframe 
               width="100%" 
               height="200" 
               src="https://www.youtube.com/embed/Bb_B5HyywQ4" 
               title="Campus Tour Video" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
            ></iframe>
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '1.05rem', margin: '0', color: '#0f172a' }}>Campus Tour</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '8px 0 0 0' }}>Take a walk through the WLV facilities natively in the app.</p>
            </div>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <iframe 
               width="100%" 
               height="200" 
               src="https://www.youtube.com/embed/YuJ2ZLkoJqY" 
               title="Student Life Video" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
            ></iframe>
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '1.05rem', margin: '0', color: '#0f172a' }}>Student Life</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '8px 0 0 0' }}>Experience what it's like to be part of the pack.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Latest News</h2>
          <Newspaper size={20} color="#64748b" />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {newsItems.map((item, idx) => (
            <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', background: 'white', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ background: '#f1f5f9', color: 'var(--primary-color)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.date}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: '0 0 15px 0', lineHeight: '1.4', color: '#0f172a', flex: 1 }}>{item.title}</h3>
                <button className="text-btn" style={{ padding: 0, color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Read Full Article <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Spacer */}
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
