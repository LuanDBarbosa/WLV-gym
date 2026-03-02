import { User, Mail, Book, Lock, Edit2 } from "lucide-react";

export default function ProfilePage({ onBack, user }) {
  const displayUser = user?.username || "Guest";
  const initials = displayUser.charAt(0).toUpperCase();
  const dummyEmail = displayUser.toLowerCase() + "";

  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">Student Profile</h1>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="profile-avatar-large">
            <span>{initials}</span>
            <button className="edit-avatar-btn">
              <Edit2 size={16} />
            </button>
          </div>
          <h2 className="profile-name">{displayUser}</h2>
          <p className="profile-role">Computer Science BSc (Hons)</p>
          <span className="status-badge status-green">Enrolled</span>
        </div>

        <div className="profile-content">
          <div className="section">
            <div className="section-header-flex">
               <h2>Account Information</h2>
               <button className="text-btn flex-center gap-sm">
                 <Edit2 size={14} /> Edit
               </button>
            </div>
            
            <table className="info-table profile-table">
              <tbody>
                <tr>
                  <td className="icon-col"><User size={20} color="var(--primary-color)" /></td>
                  <td className="label-col">Student Number</td>
                  <td className="value-col">{displayUser}</td>
                </tr>
                <tr>
                  <td className="icon-col"><Mail size={20} color="var(--primary-color)" /></td>
                  <td className="label-col">Email</td>
                  <td className="value-col">{user?.email || dummyEmail}</td>
                </tr>
                <tr>
                  <td className="icon-col"><Book size={20} color="var(--primary-color)" /></td>
                  <td className="label-col">Course Name</td>
                  <td className="value-col">{user?.course || "Computer Science BSc"}</td>
                </tr>
                <tr>
                  <td className="icon-col"><Lock size={20} color="var(--primary-color)" /></td>
                  <td className="label-col">Password</td>
                  <td className="value-col">
                    <span className="obscured-password">••••••••••••</span>
                    <button className="action-btn outline small ml-auto">Change</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section">
            <h2>System Preferences</h2>
            <div className="preferences-grid">
               <div className="preference-item">
                  <div className="pref-info">
                     <h3>Email Notifications</h3>
                     <p>Receive weekly updates and alerts.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
               </div>
               <div className="preference-item">
                  <div className="pref-info">
                     <h3>Dark Mode</h3>
                     <p>Use dark theme for the interface.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
